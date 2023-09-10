const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const Form = require("../models/formModel");

//Submit Form
exports.submitForm = catchAsyncErrors(async (req, res, next) => {

  const { name, email, phone, cnic, district, productionCenter } = req.body;


  const form = await Form.create({
    name,
    email,
    phone,
    cnic,
    district,
    productionCenter,
    image: {
      public_id: "sample id",
      url: "sample url",
    },
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    form,
  });
});

//Get All Production Centers --admin
exports.getAllForms = catchAsyncErrors(async (req, res, next) => {
  const forms = await Form.find();

  res.status(201).json({
    success: true,
    forms,
  });
});

//Get one Form --admin
exports.getOneFrom = catchAsyncErrors(async (req, res, next) => {
  const form = await Form.findById(req.params.id);

  if (!form) {
    return next(new ErrorHander("Form not found", 404));
  }

  res.status(200).json({
    success: true,
    form,
  });
});
