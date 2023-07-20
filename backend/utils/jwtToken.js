// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    //calling getJWTToken method to generate token
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  // sending response and saving in token cookies
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  };

module.exports = sendToken;
  