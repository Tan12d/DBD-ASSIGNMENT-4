    import React, { useEffect, useState } from 'react';
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.min.css';
    // import { Button } from "react-bootstrap";

    function Customer() {
        const [inputs, setInputs] = useState([]);

        // const navigate= useNavigate();

        // const handleChange = (event) =>{
        //     const name = event.target.name;
        //     const value = event.target.value;
        //     setInputs( values => ({...values,[name]:value}))
        // }

        // const handleSubmit = (event) =>{
        //     event.preventDefault();
        //     alert(inputs.email);

        //     const details= {
        //         email:inputs.email,
        //         query:inputs.query
        //     }

        // const handleEdit = (id, Cust_no, Name, Phone_no, City) => {
        //     localStorage.setItem('id',id);
        //     localStorage.setItem('Cust_no',Cust_no);
        //     localStorage.setItem('Name',Name);
        //     localStorage.setItem('Phone_no',Phone_no);
        //     localStorage.setItem('City',City);

        // }


        useEffect(() => {
            axios.get('http://localhost:7010/customer')
                .then(res => {
                    setInputs(res.data);
                })
                .catch(errors => console.log(errors))

        }, []);

        const deleteCustomer = (e,id) => {
            e.preventDefault();

            const thisClicked = e.currentTarget;
            const confirmation = window.confirm("Are you sure you want to delete?")

            if(confirmation)
            {
                thisClicked.innerText = "Deleting...";

                axios.delete(`http://localhost:7010/customer/delete/${id}`)
                .then((res)=>{
                    alert("Customer deleted successfully")
                    thisClicked.closest("tr").remove();
                    
                })
                .catch(function (err) {
                    console.log(err)
                })
            }        
        }

        // return(
        //     <div>
        //         <center>
        //         <h1>Customer List</h1>
        //         <br></br>
        //         <table border="3">
        //             <thead>
        //                 <tr>
        //                     <th>CUST_NO</th>
        //                     <th>NAME</th>
        //                     <th>PHONE_NO</th>
        //                     <th>CITY</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {inputs.map((input) => (
        //                     <tr key={input._id}>
        //                         <td>{input.Cust_no}</td>
        //                         <td>{input.Name}</td>
        //                         <td>{input.Phone_no}</td>
        //                         <td>{input.City}</td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //         </center>
        //     </div>
        // );

        var customerDetails = "";

        customerDetails = inputs.map((input) => {
            return (
                <tr key={input._id}>
                    <td>{input.Cust_no}</td>
                    <td>{input.Name}</td>
                    <td>{input.Phone_no}</td>
                    <td>{input.City}</td>
                    <td>
                        <Link to={`/customer/${input._id}/update`} className="btn btn-success">Update</Link>
                        {/* <Link to={`/customer/edit`}>
                            <button onClick={() => handleEdit(input._id,input.Cust_no,input.Name,input.Phone_no,input.City)}>Update</button>
                        </Link> */}
                    </td>
                    <td>
                        <button type='button' onClick={(e) => deleteCustomer(e,input._id)} className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
            )
        });


        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Customers List
                                    <Link to='/customer/insert' className='btn btn-primary float-end'>Insert</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>CUST_NO</th>
                                            <th>NAME</th>
                                            <th>PHONE_NO</th>
                                            <th>CITY</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default Customer;