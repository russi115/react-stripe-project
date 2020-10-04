require('dotenv').config()
const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()

const stripe = new Stripe(process.env.stripePrivateKey)


app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout', async (req, res) =>{

    try{
        const { id, amount} = req.body

    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Gaming Keyboard",
        payment_method: id,
        confirm: false
    });

    console.log(payment)

    res.send({message: 'succesfull payment'})
    } catch(error){
        console.log(error);
        req.json({message:error.raw.message})
    }
})

app.listen(3001, () => {
    console.log('server on port', 3001)
})