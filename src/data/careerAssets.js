// src/data/careerAssets.js
// Curated demo URLs and learning paths for roles.
const careerAssets = {
  "Data Scientist": {
    demo: "https://www.youtube.com/embed/ua-CiDNNj30",
    learnPath: [
      { step: "Python & Data Libraries", resources: ["https://www.coursera.org/learn/python-data-analysis"] },
      { step: "SQL for Data Analysis", resources: ["https://www.udemy.com/course/sql-for-data-analysis/"] },
      { step: "Statistics & Probability", resources: ["https://www.khanacademy.org/math/statistics-probability"] },
      { step: "Intro to ML (scikit-learn)", resources: ["https://www.coursera.org/learn/machine-learning-with-python"] },
      { step: "Projects & Kaggle", resources: ["https://www.kaggle.com/competitions"] }
    ]
  },
  "ML Engineer": {
    demo: "https://www.youtube.com/embed/H1q7v1jAtw0",
    learnPath: [
      { step: "Deep Learning (fast.ai / Coursera)", resources: ["https://www.fast.ai/", "https://www.coursera.org/specializations/deep-learning"] },
      { step: "Deployment & Docker", resources: ["https://www.udemy.com/course/docker-mastery/"] },
      { step: "MLOps & Pipelines", resources: ["https://www.coursera.org/learn/machine-learning-engineering-for-production-mlops"] }
    ]
  }
};

export default careerAssets;
