const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const router = express.Router();
const { isAunthenticatedUser} = require("../middleware/auth");

router.route("/payment/process").post(isAunthenticatedUser,processPayment);
router.route("/stripeapikey").get(isAunthenticatedUser,sendStripeApiKey);

module.exports = router;
