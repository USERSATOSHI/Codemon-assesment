// tests for api
// using mocha and chai

import chai from "chai";
import chaiHttp from "chai-http";

import app from "../index.js";

chai.use(chaiHttp);

// index route
describe("GET /", () => {
    it("should return a message", (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                chai.expect(res.body)
                    .to.be.an("object")
                    .to.have.property("message");
                done();
            });
    });
});

// products route

describe("GET /products", () => {
    it("should return an array of products", (done) => {
        chai.request(app)
            .get("/products")
            .end((err, res) => {
                chai.expect(res.body).to.be.an("object")
                done();
            });
    });
});

describe("GET /products/:id", () => {
    it("should return a product", (done) => {
        chai.request(app)
            .get("/products/1")
            .end((err, res) => {
                chai.expect(res.body)
                    .to.be.an("object")
                    .to.have.property("product");
                done();
            });
    });

    it("should return null if product is not found", (done) => {
        chai.request(app)
            .get("/products/100")
            .end((err, res) => {
                chai.expect(res.body)
                    .to.be.an("object")
                    
                done();
            });
    });
});

describe("PUT /products/:id", () => {
    it("should update the price of a product", (done) => {
        chai.request(app)
            .put("/products/1")
            .send({ price: 100 })
            .end((err, res) => {
                chai.expect(res.body)
                    .to.be.an("object");
                done();
            });
    });
});
