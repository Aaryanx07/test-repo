import sys
import json

from detector import FakeReviewDetector

MODEL_PATH = "backend/ml/fake_review_model.pkl"

detector = FakeReviewDetector(MODEL_PATH)

reviews = json.loads(sys.argv[1])

results = []

scores = []

for review in reviews:

    prediction = detector.predict(review)

    score = prediction["fake_probability"]

    scores.append(score)

    results.append({

        "review": review,

        "fake_probability":
        round(score * 100, 2)
    })

overall_score = (sum(scores) / len(scores)) * 100

print(json.dumps({

    "overall_fake_percentage":
    round(overall_score,2),

    "reviews": results
}))