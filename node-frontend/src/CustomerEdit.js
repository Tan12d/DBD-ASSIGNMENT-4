import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
// import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from "./Customer.js";

function Edit() {
    const [id, setId] = useState("");
    const [Cust_no, setCust_no] = useState("");
    const [Name, setName] = useState("");
    const [Phone_no, setPhone_no] = useState("");
    const [City, setCity] = useState("");

    let history = useNavigate();

    var index= axios.get(`http://localhost:7010/customer`).map(function(e){
        return e.id;
    }).indexOf(id);

    const handleSubmit=(e)=>{
        e.preventDefault();

        let a = Customer[index];
        a.Cust_no = Cust_no;
        a.Name = Name;
        a.Phone_no= Phone_no;
        a.City = City;

        history("/");
    }

    useEffect(()=>{
        setCust_no(localStorage.getItem('Cust_no'))
        setName(localStorage.getItem('Name'))
        setPhone_no(localStorage.getItem("Phone_no"))
        setCity(localStorage.getItem("City"))
    },[])

    return(
            <div>
                <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Update Customers
                                    <Link to='/customer' className='btn btn-danger float-end'>Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form>
                                    <div className="mb-3">
                                        <label>CUST_NO</label>
                                        <input type="text" name="Cust_no" title="Cust_no" placeholder="Enter the customer no." value={Cust_no} onChange={(e)=>setCust_no(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label>NAME</label>
                                        <input type="text" name="Name" title="Name" placeholder="Enter the customer name" value={Name} onChange={(e)=>setName(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label>PHONE_NO</label>
                                        <input type="tel" name="Phone_no" title="Phone_no" placeholder="Enter the customer phone no." value={Phone_no} onChange={(e)=>setPhone_no(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label>CITY</label>
                                        <input type="text" name="City" title="City" placeholder="Enter the city" value={City} onChange={(e)=>setCity(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={(e)=>handleSubmit(e)} type="submit">Update Customer</button>
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

export default Edit;