const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const Message = require("../models/contactMessageModel")

// create message
exports.createMessage = catchAsyncErrors(async (req, res, next)=>{

    const {name, email, phone, message} = req.body;

    const contactMessage = await Message.create({
        name,email,phone, message
    });

    res.status(201).json({
        success: true,
        contactMessage,
    });
});

// Get All ContactUs Message (Admin)
exports.getContactUsMessages = catchAsyncErrors(async(req,res,next)=>{
    const contactMessages = await Message.find();

    res.status(201).json({
        success: true,
        contactMessages,
    })
});

// Get Single Message (Admin)
exports.getSingleContactUsMessage = catchAsyncErrors( async (req, res, next)=>{
    const message = await Message.findById(req.params.id)

    if(!message) {
        return next(new ErrorHander("message not found", 404));
    }

    res.status(200).json({
        success: true,
        message,
    })
})
