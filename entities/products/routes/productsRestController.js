const express = require("express");

const router = express.Router();
const { handleError } = require("../../../utils/handleErrors");
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, updateInStock, updateStockAfterOrder } = require("../models/productsAccessDataService");
const auth = require("../../../auth/authService");


router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;

        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can create new products"
            );
        }

        let product = await createProduct(req.body)
        res.send(product)

    } catch (err) {
        req.errorMessage = err.message || "Failed to create new product";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/", async (req, res) => {
    try {
        let allProducts = await getAllProducts()
        res.send(allProducts)

    } catch (err) {
        req.errorMessage = err.message || "Failed to get products";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params
        let singleProduct = await getProductById(id)
        res.send(singleProduct)

    } catch (err) {
        req.errorMessage = err.message || "Failed to get product";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})

router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        let changes = req.body
        const userInfo = req.user;

        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can update products"
            );
        }


        let product = await updateProduct(id, changes)
        res.send(product)
    } catch (err) {
        req.errorMessage = err.message || "Something is wrong with the data or server connection";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;

        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can delete products"
            );
        }

        let product = await deleteProduct(id)
        res.send(product)
    } catch (err) {
        req.errorMessage = err.message || "Something is wrong with the data or server connection";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.patch("/updateInStock", auth, async (req, res) => {
    try {
        const { id } = req.body;
        const { newStock } = req.body
        const userInfo = req.user;


        if (!userInfo.isBusiness) {
            return handleError(
                res,
                403,
                "Authorization Error: Only business customers can update products stock"
            );
        }

        let product = await updateInStock(id, newStock)
        res.send(product)
    } catch (err) {
        req.errorMessage = err.message || "Something is wrong with updating the stock";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})
router.patch("/updateStockAfterOrder", async (req, res) => {
    try {
        const { id } = req.body;
        const { subFromStock } = req.body
        let product = await updateStockAfterOrder(id, subFromStock)
        res.send(product)
    } catch (err) {
        req.errorMessage = err.message || "Something is wrong with updating the stock";
        return handleError(res, err.status || 400, req.errorMessage);

    }
})


module.exports = router;
