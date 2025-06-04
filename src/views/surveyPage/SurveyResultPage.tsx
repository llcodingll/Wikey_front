import { useLocation } from "react-router-dom";
import whiskyData from "@assets/whisky.json";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

type Answers = {
  body: number;
  sweetness: number;
  smoky: number;
  fruity: number;
  floral: number;
};

type Whisky = {
  Distillery: string;
  Body: number;
  Sweetness: number;
  Smoky: number;
  Fruity: number;
  Floral: number;
  ImageUrl?: string;
};

function calcScore(w: Whisky, a: Answers) {
  return (
    Math.abs(w.Body - a.body) +
    Math.abs(w.Sweetness - a.sweetness) +
    Math.abs(w.Smoky - a.smoky) +
    Math.abs(w.Fruity - a.fruity) +
    Math.abs(w.Floral - a.floral)
  );
}

const SurveyResultPage = () => {
  const location = useLocation();
  const answers: Answers = location.state?.answers;

  const sorted = (whiskyData as Whisky[])
    .map((w) => ({ ...w, score: calcScore(w, answers) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <Box sx={{ pt: 5, pb: 8, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="#6D4C2C">
        Recommended Whiskies for You
      </Typography>
      <Stack spacing={3}>
        {sorted.map((w) => (
          <Card
            key={w.Distillery}
            sx={{ display: "flex", alignItems: "center", p: 2 }}
          >
            {w.ImageUrl && (
              <CardMedia
                component="img"
                image={w.ImageUrl}
                alt={w.Distillery}
                sx={{ width: 90, height: 90, borderRadius: 2, mr: 2 }}
              />
            )}
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="#6D4C2C">
                {w.Distillery}
              </Typography>
              <Typography sx={{ fontSize: 15, color: "#889982" }}>
                Body: {w.Body} / Sweetness: {w.Sweetness} / Smoky: {w.Smoky} /
                Fruity: {w.Fruity} / Floral: {w.Floral}
              </Typography>
              <Typography sx={{ color: "#AAA", fontSize: 13 }}>
                Recommendation Score: {w.score}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SurveyResultPage;
