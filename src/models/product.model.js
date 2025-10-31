import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        min: [0, 'Price cannot be negative']  
    },
    currency: {
        type: String,
        default: '₼',
        enum: ['$', '€', '£', '₼', '¥']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stock cannot be negative']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    images: {
        type: [String],
        default: []
    },
    storeId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


 productSchema.index({ title: "text", description: "text" });

 export default mongoose.model('Product', productSchema);
