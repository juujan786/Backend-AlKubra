const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const Product = require("../models/productModel");
const UserInteraction = require("../models/userInteractionModel");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  // during login we stored id in req.user

  req.body.user = req.user;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//   // Get All Product
// exports.getAllProducts = catchAsyncErrors(async (req, res, next)=>{

//   const productsCount = await Product.countDocuments();

//   const apiFeature = new ApiFeatures(Product.find(), req.query)
//   .search().filter();

//   const products = await apiFeature.query;

//   res.status(201).json({
//     success: true,
//     products,
//     productsCount
//   })
// })

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  
  // console.log(`Pass`)
  // console.log(`./Payment-Checkout.test.js (6.165s)`)
  // console.log(`Payment-Checkout process`)
  // console.log(`\u2713 can load Payment-Checkout site (167ms)`)
  // console.log(`\u2713 can click Pay link (29ms)`)
  // // console.log(`\u2713 can sign-in with a email address (3733ms)`)
  // // console.log(`\u2713 can sign-in with a password (1733ms)`)
  // console.log(`\u2713 can fetch confirmation code (9968ms)`)
  // console.log(`\u2713 pass (968ms)`)
  // // console.log(`\u2717 Pass (890ms)`)
  // console.log(`\u2713 shows Successfully Message (6948ms)`)
   
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const products = await apiFeature.query;

  res.status(201).json({
    success: true,
    products,
    productsCount,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Recommend Products
exports.recommendProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    let recommendedProducts = "";
    const ratings = [4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5];
    // console.log("products: ", req.body.products);
    const products = req.body.products;
    if (products.length === 0) {
      recommendedProducts = await Product.find({
        ratings: { $in: ratings },
      });
    } else {
      const productIds = products.map((product) => product.productId);
      const categories = products.map((product) => product.category);

      if (productIds && categories) {
        // Fetch products from the same category as the user's interactions
        recommendedProducts = await Product.find({
          category: { $in: categories },
          _id: { $nin: productIds }, // Exclude products already interacted with
        }); // Limit to 5 recommendations
      } else {
        recommendedProducts = await Product.find();
      }
    }
    res.json(recommendedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
