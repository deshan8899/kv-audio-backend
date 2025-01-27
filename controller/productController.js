import Product from "../models/product.js"; 

export function addProduct(req, res){
    console.log(req.user);  //oneme function ekk athule user eke visthr gnn pullwn
    
    if(req.user==null){
        res.status(401).json(
            {
                message:"please loging and try again"
            }
        )
        return;
    }

    if(req.user.role!="admin"){
        res.status(403).json(
            {
                message:"You are not authorized to add products"
            }
        )
        return;
    }



    const data=req.body; 
    const newProduct=new Product(data); 

    newProduct.save().then(()=>{
        res.json("Product Added")
    }).catch((error)=>{
        res.status(500).json(error, "Error adding product")
    })
}