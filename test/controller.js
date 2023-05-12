// test for controllers at location: src/controllers/products.js
// testing through mocha and chai

import { getProducts, getProduct, updateProductPrice } from "../src/controller/products.js";


import chai from "chai";

describe("getProducts", () => {
    it("should return an array of products", async () => {
        const products = await getProducts();
        chai.expect(products).to.be.an("array");
    });
});

describe("getProduct", () => {
    it("should return a product", async () => {
        const product = await getProduct(1);
        chai.expect(product).to.be.an("object");
    });

    it("should return null if product is not found", async () => {
        const product = await getProduct(100);
        chai.expect(product).to.be.null;
    });
});

describe("updateProductPrice", () => {
    it("should update the price of a product", async () => {
        const product = await updateProductPrice(1, 100);
        chai.expect(product).to.be.an("object");
    });
});
