import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import whiskyData from "@assets/whisky.json";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Alert,
} from "@mui/material";
import SimilarUserRecommendation from "../../components/SimilarUserRecommendation";
import { submitSurvey } from "../../services/surveyApi";

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
  const regions: string[] = location.state?.regions || [];
  const [userEmail, setUserEmail] = useState<string>("");
  const [surveySubmitted, setSurveySubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 임시로 사용자 이메일 설정 (실제로는 로그인된 사용자 정보를 사용)
  useEffect(() => {
    // localStorage에서 사용자 이메일 가져오기 (실제 구현에서는 JWT 토큰에서 추출)
    const email = localStorage.getItem("userEmail") || "test@user.com";
    setUserEmail(email);
  }, []);

  // 설문 제출
  useEffect(() => {
    const submitSurveyData = async () => {
      if (!answers || !regions.length || surveySubmitted) return;

      try {
        const request = {
          email: userEmail,
          region: regions[0], // 첫 번째 선택된 지역 사용
          body: answers.body || 0,
          sweetness: answers.sweetness || 0,
          smoky: answers.smoky || 0,
          fruity: answers.fruity || 0,
          floral: answers.floral || 0,
        };

        await submitSurvey(request);
        setSurveySubmitted(true);
      } catch (error) {
        console.error("Survey submission error:", error);
        setSubmitError("설문 제출 중 오류가 발생했습니다.");
      }
    };

    if (userEmail) {
      submitSurveyData();
    }
  }, [answers, regions, userEmail, surveySubmitted]);

  if (!answers) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "#254034",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Alert severity="error">설문 결과를 찾을 수 없습니다.</Alert>
      </Box>
    );
  }

  const sorted = (whiskyData as Whisky[])
    .map((w) => ({ ...w, score: calcScore(w, answers) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#254034",
        fontFamily: "Pretendard, sans-serif",
        p: 2,
      }}
    >
      <Box sx={{ pt: 5, pb: 8, maxWidth: 800, width: "100%", mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          color="#6D4C2C"
          align="center"
        >
          Recommended Whiskies for You
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        {/* 기존 추천 결과 */}
        <Card
          sx={{
            background: "#fffdfa",
            border: "1px solid #D4C7B0",
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#6D4C2C"
              gutterBottom
            >
              취향 기반 추천
            </Typography>
            <Stack spacing={3}>
              {sorted.map((w) => (
                <Card
                  key={w.Distillery}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    background: "#F6F4F3",
                    border: "1px solid #E8E0D8",
                    borderRadius: 2,
                  }}
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
                      Body: {w.Body} / Sweetness: {w.Sweetness} / Smoky:{" "}
                      {w.Smoky} / Fruity: {w.Fruity} / Floral: {w.Floral}
                    </Typography>
                    <Typography sx={{ color: "#AAA", fontSize: 13 }}>
                      Recommendation Score: {w.score}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3, borderColor: "#D4C7B0" }} />

        {/* 유사한 사용자 기반 추천 */}
        {userEmail && (
          <SimilarUserRecommendation
            userEmail={userEmail}
            maxRecommendations={5}
          />
        )}
      </Box>
    </Box>
  );
};

export default SurveyResultPage;
