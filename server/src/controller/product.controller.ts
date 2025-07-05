import { Request, Response } from "express";
import { datasource } from "../config/datasource";
import { Product } from "../entity/product";

const repo = datasource.getRepository(Product)

export const getProducts = async (_: Request, res: Response) => {
    const products = await repo.find();
    res.json(products);
};

export const getProductsByID = async (req: Request, res: Response) => {

    const { id } = req.params

    const products = await repo.findOneBy({ id: parseInt(id) })
    res.json(products);
};

export const add = async (req: Request, res: Response) => {

    try {

        const { name, price, description } = req.body;

        const addProduct = repo.create({ name, price, description })

        const Result = await repo.save(addProduct)

        res.status(200).json({ message: "Product added scussesfully", Result })

    } catch (error) {
        res.status(400).json("Internal Server Error")
        console.log("Error creating product", error);

    }




}

export const updateProduct = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;
        const { name, price, description } = req.body;

        const existingProduct = await repo.findOneBy({ id: parseInt(id) })

        if (!existingProduct) {
            return res.status(400).json({ message: "Product Does not exist!" })
        }

        const addProduct = repo.update({ id: parseInt(id) }, { name, price, description })

        res.status(200).json({ message: "Product updated scussesfully", addProduct })

    } catch (error) {
        res.status(400).json("Internal Server Error")
        console.log("Error creating product", error);

    }




}

export const deleteProduct = async (req: Request, res: Response) => {

    try {

        const { id } = req.params

        const existingProduct = await repo.findOneBy({ id: parseInt(id) })

        if (!existingProduct) {
            return res.status(400).json({ message: "Product Does not exist!" })
        }

        const deleteProduct = repo.delete({ id: parseInt(id) })

        res.status(200).json({ message: "Product deleted scussesfully", deleteProduct })


    } catch (error) {
        res.status(400).json("Internal Server Error")
        console.log("Error creating product", error);

    }




}
