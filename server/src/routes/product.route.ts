import express, { Router } from "express";
import { add, deleteProduct, getProducts, getProductsByID, updateProduct } from "../controller/product.controller";

import { upload } from "../middleware/multer";

const router: Router = express.Router();
// const router = Router()


router.put("/update/:sku" , updateProduct )
router.delete("/delete/:sku", deleteProduct )

router.get("/get", getProducts)
router.post("/add", upload.array("image", 5),add)

router.get("/getproduct/:sku", getProductsByID)


export default router;
