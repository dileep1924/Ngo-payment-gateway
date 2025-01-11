const express = require("express");
const cors = require("cors");
const razorpay = require("razorpay");

const app = express();

// Port Define 
const Port = 4000;

// use 
app.use(cors());
app.use(express.json());

const Razorpay = new razorpay({
    key_id: "rzp_test_1HahEtpmlYCRNc",
    key_secret: "YnKsRNgKEuHH2vCoHgzoIGqQ"
})

app.get("/", async (req,res)=>{
    res.send("<h1>Server Is Running</h1>")
})

app.post("/razorpay-payment", async (req, res) => {
    try {
        const { amount } = req.body;

        const option = {
            amount: amount*100,
            currency: "INR",
            receipt: `receipt#`
        }

        const razorpayData = await Razorpay.orders.create(option);

        res.status(200).json({

            id: razorpayData.id,
            amount: razorpayData.amount,
            currency: razorpayData.currency,
            message: "Payment Order Create is Successfull"
        })

    }
    catch (err) {
        res.status(400).json({
            message: "Something is Wrong",
            error: err.message || err
        })
    }
})

app.listen(Port,()=>{
    console.log(`Server is running on localhost:${Port}`)
})