const express = require("express")
const mongoose = require("mongoose");
const Quote = require('inspirational-quotes');

const cors = require('cors');
const customerRouter = require("./routes/customerRouter")

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Include PUT method
    optionsSuccessStatus: 204, // Some legacy browsers (IE) choke on 204
  };
  
  app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    next();
});

app.get("/", function (req, res) {
    res.send(Quote.getQuote());
});



app.use("/customer", customerRouter)

 // Enable CORS with specific options
  
  // Rest of your code...
  

app.use(cors({ origin: 'http://localhost:3000' }));

// app.listen(7010, () => {
//     console.log('Server is running on port 7010');
//   });
const mongoUrL = "mongodb://0.0.0.0:27017/db_test1"

const connectDB = async () => {

    try {
        const conn = await mongoose.connect(mongoUrL, {
            useNewUrlParser: true,
        });

        console.log(`connected correctly to database`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

connectDB();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 7010;
}
app.listen(port, function () {
    console.log("Server started successfully");
})