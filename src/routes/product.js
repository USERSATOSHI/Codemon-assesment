import { Router } from "express";
import {
    getProduct,
    getProducts,
    updateProductPrice,
} from "../controller/products.js";
import verifyToken from "../middleware/verifyToken.js";
const router = Router();

router.get("/", async (req, res) => {
    const products = await getProducts().catch((err) => {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err,
        });
    });
    res.json({
        products,
    });
});

router.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const product = await getProduct(id).catch((err) => {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err,
        });
    });
    if (!product) {
        return res.status(404).json({
            message: "Not Found",
            error: `Product ${id} was not found`,
        });
    }
    res.json({
        product,
    });
});

router.put("/:id", verifyToken, async (req, res) => {
    const id = Number(req.params.id);
    const price = req.body.price;

    if (!(await getProduct(id))) {
        return res.status(404).json({
            message: "Not Found",
            error: `Product ${id} was not found`,
        });
    }

    if (!price) {
        return res.status(400).json({
            message: "Bad Request",
            error: "Price is required",
        });
    }

    if (typeof price !== "number") {
        return res.status(400).json({
            message: "Bad Request",
            error: "Price should be a number",
        });
    }

    if (price < 0) {
        return res.status(400).json({
            message: "Bad Request",
            error: "Price should be a positive number",
        });
    }

    if (isNaN(price) || price === Infinity) {
        return res.status(400).json({
            message: "Bad Request",
            error: "Price should be a finite number",
        });
    }
    const product = await updateProductPrice(id, price).catch((err) => {
        return res.status(500).json({
            message: "Internal Server Error",
            error: err,
        });
    });
    return res.json({
        product,
    });
});

export default router;
