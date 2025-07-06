import "reflect-metadata"
import { Request, Response } from "express";

import express from "express"
import { datasource } from "./config/datasource"
import ProductRoute from "./routes/product.route"
import { upload } from "./middleware/multer";

const app = express()

app.use(express.json())

const port = 3000




app.post("/upload", upload.array("image", 5 ), (req: Request, res: Response) => {
    
  console.log("Body:", req.body); // text fields
  console.log("File:", req.files); // uploaded file info

  res.send("Image uploaded");
});


app.use("/product", ProductRoute)


datasource.initialize().then(() => {
    console.log("DB CONNECTED");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);

    })

}).catch((err) => {
    console.log("Error connecting DB: ", err);

})