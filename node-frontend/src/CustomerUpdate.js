import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

function CustomerUpdate() {

    const { id } = useParams();

    const history = useNavigate();

    const [inputs, setInputs] = useState({
        Cust_no: '',
        Name: '',
        Phone_no: '',
        City: '',
    });

    useEffect(() => {
        
        axios.get(`http://localhost:7010/customer/update/${id}`)
            .then(res => {
                console.log(res.data)
                setInputs(res.data)
            })
            .catch(function (error) {
                console.error(error)
            });        
    }, [id]);


    // useEffect(()=>{
    //     if(id){
    //         getSingleUser(id);
    //     }
    // },[id]);

    // const getSingleUser = async (id) => {
    //     const response = await axios.get(`http://localhost:6012/customer/${id}/update`);
    //     if(response.status===200){
    //         setInputs({...response.data[0]});
    //     }
    // }




    // useEffect(() => {

    //     if(id==="new") return;

    //     const fetchPost = async () => {
    //         const { data } = await axios.get(`http://localhost:6011/customer/${id}/update`);
    //         setInputs(data);
    //     };
    //     fetchPost();
    // }, [id]);

    const handleInput = (event) => {
        event.persist();
        setInputs({...inputs, [event.target.name]:event.target.value});
    }

    const updateCustomer = (event) => {
        event.preventDefault();

        const data = {
            Cust_no: inputs.Cust_no,
            Name: inputs.Name,
            Phone_no: inputs.Phone_no,
            City: inputs.City
        }

       console.log(data)
        axios.put(`http://localhost:7010/customer/update/${id}`,data)
            .then(res => {
                // alert(res.data)
                alert("Updated Customer details")
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
                            <h4>Update Customers
                                <Link to='/customer' className='btn btn-danger float-end'>Back</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={updateCustomer}>
                                <div className="mb-3">
                                    <label>CUST_NO</label>
                                    <input type="text" name="Cust_no" title="Cust_no" placeholder="Enter the customer no." value={inputs.Cust_no} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label>NAME</label>
                                    <input type="text" name="Name" title="Name" placeholder="Enter the customer name" value={inputs.Name} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label>PHONE_NO</label>
                                    <input type="tel" name="Phone_no" title="Phone_no" placeholder="Enter the customer phone no." value={inputs.Phone_no} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <label>CITY</label>
                                    <input type="text" name="City" title="City" placeholder="Enter the city" value={inputs.City} onChange={handleInput} className="form-control"></input>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Update Customer</button>
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

export default CustomerUpdate;