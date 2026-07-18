import crypto from 'crypto';
import { razorpay } from '../razorpay.js';

export const createOrder=async(req,res)=>{

    try {
        console.log('get ur req!')
       
        const {amount}=req.body;
        console.log(amount)
        const options={
            amount:amount*100,
            currency:'INR',
            receipt:"receipt_"+Date.now()
        }

        const order=await razorpay.orders.create(options);
        console.log(order)

        res.json({
            success:true,
            order
        })
    } catch (err) {
         res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

export const verifyPayment = async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    const generated = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (generated === razorpay_signature) {

        return res.json({
            success: true,
        });

    }

    res.status(400).json({
        success: false,
    });
};