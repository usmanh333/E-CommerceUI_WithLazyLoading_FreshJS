import { ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";
import { Products, Reviews } from "./schema.ts";
import { db } from "../connection.ts";

const productCollection = db?.collection<Products>("products");

export async function createProduct(params: Products) {
  try {
    const createUser = await productCollection.insertOne(params);
    return createUser.toString();
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchProducts() {
  try {
    const users = await productCollection.find();
    return users.toArray();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProduct(id: string) {
  try {
    const user = await productCollection.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProduct(id: string, params: Products) {
  try {
    const updateUser = await productCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: params },
    );
    return updateUser;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProductReview(id: string, params: Reviews) {
  try {
    const product: Products | undefined = await productCollection.findOne({
      _id: new ObjectId(id),
    });
    if (!product) {
      return { error: "Product not found" };
    }
    if (!product.reviews) {
      product.reviews = [];
    }
    product.reviews.push(params);
    const updateResult = await productCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: { reviews: product.reviews },
      },
    );
    if (updateResult.modifiedCount === 1) {
      return { success: "Review added successfully" };
    } else {
      return { error: "Failed to update the product" };
    }
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating the product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const deleteUser = await productCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return deleteUser;
  } catch (error) {
    console.error(error);
  }
}
