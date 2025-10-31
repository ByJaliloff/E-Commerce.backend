import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    adresss: {
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    postcode: {
        type: String,
        required: true
    },
    orderedProducts: {
            type: mongoose.Schema.ObjectId, 
            ref: 'Cart',
            required: true
    },
    paymentID: {
        type: String,
        required: true  
    }
            
}, {
    timestamps: true
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
