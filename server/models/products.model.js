import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 2000
    },
    image: {
        type: String,
        required: [true, 'Please upload an image']
    },
    ingredients: {
        type: String,
        required: true,
        trim: true,
    },
    usage: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        maxLength: 32
    },
    category: {
        type: String,
        ref: "Category",
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
},
{
    timestamps: true
})

const Product = mongoose.model("Product", productSchema);

export default Product;