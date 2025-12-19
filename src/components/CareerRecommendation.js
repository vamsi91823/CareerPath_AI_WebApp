import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography, Stack, Button, CircularProgress, Chip, Box } from "@mui/material";
import { getCareerRecommendations } from "../Services";

export default function CareerRecommendation({ profile }) {
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState(null);
  const [error, setError] = useState(null);

  const fetchRecs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCareerRecommendations(profile || {});
      // Support both `recommendations` and a top-level array
      const recommendations = data?.recommendations || data?.results || data || [];
      setRecs(recommendations);
    } catch (err) {
      setError(err.message || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) fetchRecs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="AI Career Recommendations" />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">Personalized career paths suggested by AI.</Typography>

          <Box>
            <Button variant="contained" size="small" onClick={fetchRecs} disabled={loading}>
              Generate Recommendations
            </Button>
            {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
          </Box>

          {error && <Typography color="error">{error}</Typography>}

          {!loading && recs && recs.length === 0 && (
            <Typography color="text.secondary">No recommendations returned.</Typography>
          )}

          {recs && recs.map((r, idx) => (
            <Box key={r.title || idx} sx={{ p: 2, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography fontWeight={700}>{r.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{r.explanation}</Typography>
                </Box>

            
              </Stack>

              <Stack spacing={1} sx={{ mt: 1 }}>
                <Typography variant="subtitle2">Required Skills</Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {(r.requiredSkills || []).map((s) => (
                    <Chip key={s} label={s} size="small" />
                  ))}
                </Stack>

                <Typography variant="subtitle2" sx={{ mt: 1 }}>Learning Path</Typography>
                <ol>
                  {(r.learningPath || []).map((step, i) => (
                    <li key={i}>
                      <Typography variant="body2">{step.step || step}</Typography>
                    </li>
                  ))}
                </ol>
              </Stack>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
