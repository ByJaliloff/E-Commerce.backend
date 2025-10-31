import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    cartProducts: [{
            type: mongoose.Schema.ObjectId,
            ref: 'cartItem'
        }],
    currency: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

 const Cart = mongoose.model('Cart', cartSchema);

    export default Cart;
    