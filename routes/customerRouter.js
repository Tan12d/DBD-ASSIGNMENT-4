const express = require("express")
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const contactRouter = express.Router();
const customerRouter = express.Router();

// const contactSchema = new Schema({
//     email: String,
//     query: String,
// });


const customerSchema = new Schema({
    Cust_no: String,
    Name: String,
    Phone_no: Number,
    City: String
});

// const Contact = mongoose.model("contact",contactSchema);

const Customer = mongoose.model("customer",customerSchema);

customerRouter.route('/')
.get((req,res,next) => {
    Customer.find({})
    .then((mod)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(mod)
    },(err) => next(err));
})
.post((req,res,next) => {
    console.log('In nodejs')
    console.log(req.body)

    const cont ={
        Cust_no : req.body.Cust_no,
        Name  : req.body.Name,
        Phone_no : req.body.Phone_no,
        City : req.body.City
    }

    Customer.create(cont)
    .then((con) => {
        console.log("New contact created",con)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(con)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

customerRouter.route('/update/:id')
.get((req,res,next) => {
    console.log(req.params.id)
    Customer.findById({"_id":req.params.id}) 
    .then((mod)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(mod)
    },(err) => next(err));
})
.put((req,res,next) => {
    console.log('In nodejs')
    console.log(req.body)
    const id = req.params.id;
    const update = req.body;

    Customer.findByIdAndUpdate(id, {$set: update}, {new:true})
    .then((cus) => {
        console.log("Customer details updated",cus)
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(cus)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

customerRouter.route('/delete/:id')
.delete((req, res, next) => {
    const id = req.params.id; // Capture the customer ID from the URL parameter

    Customer.findByIdAndDelete(id) // Use findByIdAndDelete to delete the customer document
    .then((cus) => {
        if (cus) {
            console.log("Customer deleted", cus);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(cus);
        } else {
            const err = new Error(`Customer with ID ${id} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch((err) => next(err));
});


// instructorRouter.listen(5004, () => {
//     console.log(`Server is running on port 5004`);
//   });


// .post((req,res,next) => {
//     console.log('In nodejs')
//     console.log(req.body)
//     const cont ={
//         email : req.body.email,
//         query : req.body.query
//     }

//     Contact.create(cont)
//     .then((con) => {
//         console.log("New contact created",con)
//         res.statusCode=200;
//         res.setHeader('Content-Type','application/json');
//         res.json(con)
//     },(err)=>next(err))
//     .catch((err)=>next(err))
// })

module.exports = customerRouter