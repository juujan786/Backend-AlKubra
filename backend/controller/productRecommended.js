const brain = require('brain.js');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// Load real user activity and product data
const userData = JSON.parse(fs.readFileSync(userDataFront));
const productData = JSON.parse(fs.readFileSync(productDataFront));



const getUserData = userData.map((user) => {
  const input = Array.from({ length: productData.length }, (_, i) =>
    user.viewedProducts.includes(i + 1) ? 1 : 0
  );
  const output = Array.from({ length: productData.length }, (_, i) =>
    user.interactedProducts.includes(i + 1) ? 1 : 0
  );
  return { input, output };
});

net.train(getUserData, {
  iterations: 2000,
  errorThresh: 0.005,
});

// Handle user interactions and update recommendations
app.post('/RecommendedProducts', (req, res) => {
  const { userId, productId } = req.body;

  // Update the user's interaction data
  const user = userData.find((user) => user.id === userId);
  if (user) {
    user.interactedProducts.push(productId);
  }

  // Recalculate recommendations
  const recommendations = userData.map((user) => {
    const input = Array.from({ length: productData.length }, (_, i) =>
      user.viewedProducts.includes(i + 1) ? 1 : 0
    );
    const output = net.run(input);
    return { userId: user.id, recommendations: output };
  });

  res.json(recommendations);
});

// Serve recommendations for a specific user
app.get('/recommendations/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = userData.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  const input = Array.from({ length: productData.length }, (_, i) =>
    user.viewedProducts.includes(i + 1) ? 1 : 0
  );
  const recommendations = net.run(input);

  const recommendedProductIds = recommendations
    .map((output, index) => ({ id: index + 1, score: output }))
    .sort((a, b) => b.score - a.score)
    .filter((product) => !user.interactedProducts.includes(product.id))
    .slice(0, 5) // Get the top 5 recommended products

  const recommendedProducts = recommendedProductIds.map((product) =>
    productData.find((p) => p.id === product.id)
  );

  res.json(recommendedProducts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});