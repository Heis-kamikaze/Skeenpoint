import Product from "../models/products.model.js"
import { redisClient } from "../lib/redis.js";
import cloudinary from './../lib/cloudinary.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ error: "Server error", error: error.message });
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redisClient.get("featured_products");
        if (featuredProducts) {
            return res.json({ products: JSON.parse(featuredProducts) });
        }

        featuredProducts = await Product.find({ isFeatured: true }).lean();

        if (!featuredProducts) {
            return res.status(404).json({ message: "Featured products not found" });
        }

        await redisClient.set("featured_products", JSON.stringify(featuredProducts));
        res.json({ products: featuredProducts });

    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
        
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name, description, image, ingredients, usage, price, category} = req.body;

        let cloudinaryResponse = null

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image,{folder:"products"})
        }

        const product = await Product.create({
            name,
            description,
            ingredients,
            price,
            usage,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
        })

        res.status(201).json({ product, message: "Product created successfully" });

    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];

            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
            } catch (error) {
                console.log("Error in deleteProduct controller while deleting image from cloudinary", error.message);
                return res.status(500).json({ message: "Server error", error: error.message });
            }

        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {
                    size: 5
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1
                }
            }
        ])

        res.json({ products });
    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ product });
    }
    catch (error) {
        console.log("Error in getProductById controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.isFeatured = !product.isFeatured;
        const updatedProduct = await product.save();

        await updateFeaturedProductsCache();

        res.status(200).json({ isFeatured: updatedProduct.isFeatured, message: updatedProduct.isFeatured ? "Product is now featured" : "Product is no longer featured" });
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateFeaturedProductsCache = async () => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        await redisClient.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in updateFeaturedProductsCache", error.message);
    }
}

// export const getRecommendedProducts = async (req, res) => {
//     try {
//         let recommendedProducts = await redisClient.get("recommended_products");
//         if (recommendedProducts) {
//             return res.json({ products: JSON.parse(recommendedProducts) });
//         }

//         recommendedProducts = await Product.find({ isRecommended: true }).lean();

//         if (!recommendedProducts) {
//             return res.status(404).json({ message: "Recommended products not found" });
//         }

//         await redisClient.set("recommended_products", JSON.stringify(recommendedProducts));
//         res.json({ products: recommendedProducts });

//     } catch (error) {
//         console.log("Error in getRecommendedProducts controller", error.message);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// }