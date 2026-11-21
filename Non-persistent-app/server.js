
import express from 'express';

const app = express();

// Middleware to parse JSON request body
app.use(express.json());

const products = [];

// POST - Create a new product
// URL: /products
app.post("/products", (req, res) => {
    const newProduct = req.body;

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    });
});

// GET - Read all products
app.get("/products", (req, res) => {
    res.status(200).json({
        message: "Products fetched successfully",
        data: products
    });
});

// GET - Read product by ID
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);

    const product = products.find(
        (p) => p.id === productId
    );

    if (product) {
        res.status(200).json({
            message: "Product details fetched successfully",
            data: product
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// PUT - Update product by ID
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updateProduct = req.body;

    const productIndex = products.findIndex(
        (prod) => prod.id === productId
    );

    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            ...updateProduct
        };

        res.status(200).json({
            message: "Product updated successfully",
            data: products[productIndex]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// DELETE - Delete product by ID
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);

    const productIndex = products.findIndex(
        (prod) => prod.id === productId
    );

    if (productIndex !== -1) {
        const deleteProduct =
            products.splice(productIndex, 1)[0];

        res.status(200).json({
            message: "Product deleted successfully",
            data: deleteProduct
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});

// Render-compatible server configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
Sample API requests:

POST /products
{"id":1,"name":"Laptop","price":55000}

POST /products
{"id":2,"name":"Mobile","price":25000}

POST /products
{"id":3,"name":"Headphones","price":2000}

GET /products
GET /products/1

PUT /products/1
{"name":"Gaming Laptop","price":65000}

DELETE /products/3
*/
