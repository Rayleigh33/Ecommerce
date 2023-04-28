const express = require("express");
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, getAllProductReview, deleteProductReview, getAdminProducts} = require("../controller/productControl");
const { isAunthenticatedUser , authorizeRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/product/new").post(isAunthenticatedUser, authorizeRoles("admin") ,createProduct);
router.route("/admin/product/:id").put(isAunthenticatedUser, authorizeRoles("admin") ,updateProduct).delete(isAunthenticatedUser, authorizeRoles("admin") ,deleteProduct);
router.route("/product/:id").get(getProductDetail);
router.route("/review").put(isAunthenticatedUser,createProductReview);
router.route("/reviews").get(getAllProductReview).delete(isAunthenticatedUser,deleteProductReview);
router.route("/admin/products").get(isAunthenticatedUser,authorizeRoles("admin"),getAdminProducts);

module.exports = router;