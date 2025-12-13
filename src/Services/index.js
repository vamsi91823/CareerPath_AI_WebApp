// Service helpers for calling the backend AI recommendation endpoint.

async function getCareerRecommendations(profile) {
  // profile should be a plain object with user fields.
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Server error: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('getCareerRecommendations error:', err);
    throw err;
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
