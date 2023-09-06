const router = require("express").Router();
const { authorizeRoles, isAuthenticatedUser } = require("../middleware/auth");
const {
  createProductionCenter,
  deleteProductionCenter,
  getAllProductionCenters,
  getProductionCenterDetails,
  updateProductuctionCenter,
} = require("../controller/centerController");

router
  .route("/admin/production-centers/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProductionCenter);

router.route("/production-centers").get(getAllProductionCenters);

router.route("/production-centers/:id").get(getProductionCenterDetails);

router
  .route("/admin/production-centers/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductuctionCenter);

router
  .route("/admin/production-centers/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProductionCenter);

module.exports = router;
