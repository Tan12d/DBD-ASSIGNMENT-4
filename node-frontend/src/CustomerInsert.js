import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function CustomerInsert() {

    const [inputs, setInputs] = useState({
        Cust_no: '',
        Name: '',
        Phone_no: '',
        City: ''
    });

    const history = useNavigate();

    const handleInput = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]:event.target.value});
    }

    const saveCustomer = (event) => {
        event.preventDefault();

        const data = {
            Cust_no: inputs.Cust_no,
            Name: inputs.Name,
            Phone_no: inputs.Phone_no,
            City: inputs.City
        }

        axios.post('http://localhost:7010/customer',data)
            .then(res => {
                // alert(res.data)
                alert("New customer inserted")
                history("/customer");
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    return(
        <div>
            <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Insert Customers
                                <Link to='/customer' className='btn btn-danger float-end'>Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveCustomer}>
                                <div className="mb-3">
                                    <label>CUST_NO</label>
                                    <input type="text" name="Cust_no" value={inputs.Cust_no} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label>NAME</label>
                                    <input type="text" name="Name" value={inputs.Name} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label>PHONE_NO</label>
                                    <input type="tel" name="Phone_no" value={inputs.Phone_no} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label>CITY</label>
                                    <input type="text" name="City" value={inputs.City} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Save Customer</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInsert;