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

// 설문 응답 타입
type Answers = {
  body: number;
  sweetness: number;
  smoky: number;
  fruity: number;
  floral: number;
};

// whisky.json 타입
type Whisky = {
  Distillery: string;
  Body: number;
  Sweetness: number;
  Smoky: number;
  Fruity: number;
  Floral: number;
  ImageUrl?: string; // 이미지가 있다면
};

// 두 vector의 유사도(차이의 합) 계산 함수
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
  // location.state로 설문 답변 전달 받기 (혹은 쿼리스트링 등)
  const location = useLocation();
  const answers: Answers = location.state?.answers;

  // 추천 위스키 계산 (TOP 3)
  const sorted = (whiskyData as Whisky[])
    .map((w) => ({ ...w, score: calcScore(w, answers) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <Box sx={{ pt: 5, pb: 8, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="#8b5a2b">
        당신을 위한 추천 위스키
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
              <Typography variant="h6" fontWeight="bold" color="#6b3e26">
                {w.Distillery}
              </Typography>
              <Typography sx={{ fontSize: 15, color: "#8b5a2b" }}>
                바디: {w.Body} / 스위트: {w.Sweetness} / 스모키: {w.Smoky} /
                프루티: {w.Fruity} / 플로럴: {w.Floral}
              </Typography>
              <Typography sx={{ color: "#aaa", fontSize: 13 }}>
                추천 점수: {w.score}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SurveyResultPage;
