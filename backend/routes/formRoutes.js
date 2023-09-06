const router = require("express").Router();
const {
  submitForm,
  getAllForms,
  getOneFrom,
} = require("../controller/formController");
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");

router.route("/submit-form").post(isAuthenticatedUser, submitForm);

router
  .route("/admin/forms")
  .get(isAuthenticatedUser,authorizeRoles("admin"), getAllForms);

router
  .route("/admin/forms/:id")
  .get(isAuthenticatedUser,authorizeRoles("admin"),getOneFrom);

module.exports = router;
