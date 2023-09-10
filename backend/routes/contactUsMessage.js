const { createMessage, getContactUsMessages, getSingleContactUsMessage } = require("../controller/contactUsController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = require("express").Router();


router.route("/contact-us").post(isAuthenticatedUser, createMessage);
router.route("/admin/contact-us").get(isAuthenticatedUser, authorizeRoles("admin"), getContactUsMessages);
router.route("/admin/contact-us/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleContactUsMessage);

module.exports = router;
