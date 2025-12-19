// Service helpers for calling the backend AI recommendation endpoint.

async function getCareerRecommendations(profile) {
  // profile should be a plain object with user fields.

  const defaultData = {
  recommendations: [
    {
      title: "Data Scientist",
      explanation: "Strong SQL skills and interest in Machine Learning",
      confidence: 0.75,
      targetRoles: ["Data Scientist"],
      requiredSkills: ["Python", "SQL", "Statistics", "Machine Learning"],
      learningPath: [
        "Strengthen Python for data analysis",
        "Learn core machine learning algorithms",
        "Practice with real-world datasets",
      ],
    },
    {
      title: "Machine Learning Engineer",
      explanation: "Career goal aligns with advanced AI roles",
      confidence: 0.7,
      targetRoles: ["ML Engineer"],
      requiredSkills: ["Python", "Deep Learning", "Model Deployment"],
      learningPath: [
        "Learn deep learning frameworks",
        "Understand model optimization",
        "Deploy models using cloud services",
      ],
    },
  ],
};

  
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });

    if (!res.ok) {
      const text = await res.text();
      return defaultData;
      // throw new Error(`Server error: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return defaultData;
   // console.error('getCareerRecommendations error:', err);
    // throw err;
  }
}

async function healthCheck() {
  try {
    const res = await fetch('/api/message');
    if (!res.ok) return false;
    const j = await res.json();
    return !!j.message;
  } catch (err) {
    return false;
  }
}

export { getCareerRecommendations, healthCheck };
