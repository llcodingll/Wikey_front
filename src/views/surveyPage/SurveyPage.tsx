import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SurveyForm from "../../components/surveys/SurveyForm";
import RegionSelector from "../../components/surveys/RegionSelector";
import SurveyPreview from "../../components/surveys/SurveyPreview";
import { QUESTIONS } from "../../constants/surveyQuestions";
import { Box, Paper, LinearProgress, Typography } from "@mui/material";

const SurveyPage = () => {
  const [regions, setRegions] = useState<string[]>([]);
  const [step, setStep] = useState<"region" | "survey" | "preview">("region");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [surveyStep, setSurveyStep] = useState(0);

  const navigate = useNavigate();

  const handleRegionSelect = (selected: string[]) => {
    setRegions(selected);
  };

  const handleNext = () => {
    setStep("survey");
    setSurveyStep(0);
    setAnswers({});
  };

  const handleSurveySubmit = (surveyAnswers: Record<string, number>) => {
    setAnswers((prev) => ({ ...prev, ...surveyAnswers }));
    if (surveyStep < QUESTIONS.length - 1) {
      setSurveyStep(surveyStep + 1);
    } else {
      setStep("preview");
    }
  };

  const handlePrev = () => {
    if (surveyStep > 0) setSurveyStep(surveyStep - 1);
  };

  // 여기서 결과 페이지로 이동 + state로 데이터 전달
  const handleSubmit = () => {
    navigate("/survey-result", { state: { regions, answers } });
  };

  const handleEdit = () => {
    setStep("survey");
  };

  const progress =
    step === "region"
      ? 0
      : step === "survey"
        ? ((surveyStep + 1) / QUESTIONS.length) * 100
        : 100;

  const stepText =
    step === "region"
      ? "1"
      : step === "survey"
        ? surveyStep + 1
        : QUESTIONS.length;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #e8d9c7 0%, #f3e5c8 100%)",
        fontFamily: "Pretendard, sans-serif",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 5,
          boxShadow: "0 6px 24px 0 rgba(80, 60, 30, 0.12)",
          overflow: "hidden",
          background: "rgba(255, 253, 250, 0.95)",
          border: "1px solid #d4c7b0",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 5 },
          textAlign: "center",
        }}
      >
        {/* 로고 예시 (이미지 파일 필요) */}
        {/* <img src="/logo.png" alt="Whisky Survey" style={{ width: 120, marginBottom: 16 }} /> */}
        {/* 상단 진행도/단계 */}
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 3,
              background: "#d4c7b0",
              "& .MuiLinearProgress-bar": {
                background: "#8b5a2b",
              },
            }}
          />
          <Typography
            sx={{
              mt: 1,
              fontSize: 14,
              color: "#8b5a2b",
              letterSpacing: "0.05em",
              fontWeight: 600,
            }}
          >
            {stepText} / {QUESTIONS.length}
          </Typography>
        </Box>
        {step === "region" ? (
          <RegionSelector
            value={regions}
            onChange={handleRegionSelect}
            onNext={handleNext}
          />
        ) : step === "survey" ? (
          <SurveyForm
            onSubmit={handleSurveySubmit}
            progress={progress}
            currentStep={surveyStep}
            onPrev={handlePrev}
          />
        ) : (
          <SurveyPreview
            regions={regions}
            answers={answers}
            onSubmit={handleSubmit} // 여기서 handleSubmit을 넘김
            onEdit={handleEdit}
          />
        )}
      </Paper>
    </Box>
  );
};

export default SurveyPage;
