import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req, res) {
  console.log(req.user); //oneme function ekk athule user eke visthr gnn pullwn

  if (req.user == null) {
    res.status(401).json({
      message: "please loging and try again",
    });
    return;
  }

  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You are not authorized to add products",
    });
    return;
  }

  const data = req.body;
  const newProduct = new Product(data);

  newProduct
    .save()
    .then(() => {
      res.json("Product Added");
    })
    .catch((error) => {
      res.status(500).json(error, "Error adding product");
    });
}

export async function getProduct(req, res) {
  try {
    if (isItAdmin(req)) {
      const products = await Product.find();
      res.json(products);
      return;
    } else {
      const products = await Product.find({ avalability: true });
      res.json(products);
    }
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
}

export async function updateProduct(req, res) {
  try {
    if (isItAdmin(req)) {
      console.log(req);
      const key = req.params.id;

      const data = req.body;

      await Product.updateOne({ key: key }, data);

      res.json({
        message: "Product updated Successfully",
      });
      return;
    } else {
      res.status(403).json({
        message: "You are not authorized to update products",
      });
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e,
    });
  }
}


export async function deleteProduct(req, res) {

  try{

   if (isItAdmin(req)){
    const key = req.params.key;
    await Product.deleteOne({ key: key });
    res.json({
      message: "Product deleted Successfully",
    });
   }else{
    res.status(403).json({
      message: "You are not authorized to delete products",
    });
    return;
   }

  }catch(e){
    res.status(500).json(
      {
        message:"Failed delete product", 
      }
    )
    
  }
}