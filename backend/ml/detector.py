import pickle

class FakeReviewDetector:

    def __init__(self, model_path):

        with open(model_path, "rb") as f:

            self.bundle = pickle.load(f)

        self.model = self.bundle["model"]

        self.vectorizer = self.bundle["vectorizer"]

    def predict(self, review):

        X = self.vectorizer.transform([review])

        probability = self.model.predict_proba(X)[0][1]

        return {

            "review": review,

            "fake_probability":
            float(probability)
        }