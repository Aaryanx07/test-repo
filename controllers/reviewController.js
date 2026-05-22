const reviewProcessor = require(
  "../services/reviewAI/reviewProcessor"
);

const analyzeReviews = async (req, res) => {

  const { url } = req.body;

  const results = await reviewProcessor(url);

  res.json(results);

};

module.exports = {
  analyzeReviews
};
