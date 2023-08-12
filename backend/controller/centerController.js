const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const Center = require("../models/canterModel");

//Create Production Center(admin)
exports.createProductionCenter = catchAsyncErrors(async (req, res, next) => {
  const { name, location, description, numberOfWorkers } = req.body;

  const center = await Center.create({
    name,
    location,
    description,
    numberOfWorkers,
    profileImage: {
      public_id: "sample id",
      url: "sample url",
    },
    cardImage: {
      public_id: "sample id",
      url: "sample url",
    },
    displayImage: {
      public_id: "sample id",
      url: "sample url",
    },
  });

  res.status(201).json({
    success: true,
    center,
  });
});

//Get All Production Centers
exports.getAllProductionCenters = catchAsyncErrors(async (req, res, next) => {
  const centers = await Center.find();

  res.status(201).json({
    success: true,
    centers,
  });
});

//Get Center details
exports.getProductionCenterDetails = catchAsyncErrors(
  async (req, res, next) => {
    const center = await Center.findById(req.params.id);

    if (!center) {
      return next(new ErrorHander("production Center not found", 404));
    }

    res.status(200).json({
      success: true,
      center,
    });
  }
);

// Update Productuction Center -- Admin
exports.updateProductuctionCenter = catchAsyncErrors(async (req, res, next) => {
  let center = await Center.findById(req.params.id);

  if (!center) {
    return next(new ErrorHander("Production Center not found", 404));
  }

  center = await Center.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    center,
  });
});

// Delete Product --admin
exports.deleteProductionCenter = catchAsyncErrors(async (req, res, next) => {
  const center = await Center.findById(req.params.id);

  if (!center) {
    return next(new ErrorHander("Production Center not found", 404));
  }

  await center.deleteOne();

  res.status(200).json({
    success: true,
    message: "Production Center Deleted Successfully",
  });
});
