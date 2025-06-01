import { useState } from "react";
import SurveyForm from "../../components/surveys/SurveyForm";
import RegionSelector from "../../components/surveys/RegionSelector";
import { Box, Paper } from "@mui/material";

const SurveyPage = () => {
  const [regions, setRegions] = useState<string[]>([]);
  const [step, setStep] = useState<"region" | "survey">("region");

  const handleRegionSelect = (selected: string[]) => {
    setRegions(selected);
  };

  const handleNext = () => {
    setStep("survey");
  };

  const handleSurveySubmit = (answers: Record<string, number>) => {
    console.log("지역:", regions);
    console.log("특성:", answers);
    // 실제 제출 로직 (regions + answers)
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #e8d9c7 0%, #f0e6d8 100%)",
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
        {step === "region" ? (
          <RegionSelector
            value={regions}
            onChange={handleRegionSelect}
            onNext={handleNext}
          />
        ) : (
          <SurveyForm onSubmit={handleSurveySubmit} />
        )}
      </Paper>
    </Box>
  );
};

export default SurveyPage;
