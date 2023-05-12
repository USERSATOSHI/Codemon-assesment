import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config as envConfig } from "dotenv";
import productRouter from "./src/routes/product.js";

// configuring environment variables
envConfig();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/products", productRouter);

app.get("/", (req, res) => {
    res.json({
        message: "Api is working",
        author: "Tushar Bharti ( USERSATOSHI )",
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

export default app;