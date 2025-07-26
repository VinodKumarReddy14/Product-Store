import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: "string", required: true },
    price: { type: "number", required: true },
    image: { type: "string", required: true },
  },
  { timestamps: true } //createdAt , UpdatedAt
);

const Product = mongoose.model("Product", productSchema); //mongoose.model returns a constructor function

export default Product;
