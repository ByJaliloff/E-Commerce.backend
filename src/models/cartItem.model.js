import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    count: {
        type: Number,
        default: 1,
        min: [1, 'Count must be at least 1']
    }
}, {
    timestamps: true
});

export default mongoose.model('CartItem', cartItemSchema);