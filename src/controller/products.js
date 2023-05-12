import col from "./db.js";

export const getProducts = async () => {
    const products = await col
        .find({})
        .toArray()
        .catch((err) => {
            throw err;
        });
    return products.map((product) => {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
        };
    });
};

export const getProduct = async (id) => {
    const product = await col.findOne({ id: id }).catch((err) => {
        throw err;
    });

    if (!product) {
        return null;
    }
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
    };
};

export const updateProductPrice = async (id, price) => {
    const product = await col
        .updateOne({ id: id }, { $set: { price } })
        .catch((err) => {
            throw err;
        });
    //  return new data;
    return await getProduct(id);
};
