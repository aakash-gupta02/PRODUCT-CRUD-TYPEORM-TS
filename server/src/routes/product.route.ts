import express, { Router } from "express";
import { add, deleteProduct, getProducts, getProductsByID, updateProduct } from "../controller/product.controller";

const router: Router = express.Router();
// const router = Router()


router.put("/update/:id" , updateProduct )
router.delete("/delete/:id", deleteProduct )

router.get("/get", getProducts)
router.post("/add", add)

router.get("/getproduct/:id", getProductsByID)


export default router;
