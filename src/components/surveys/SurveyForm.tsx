import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Box,
  LinearProgress,
  // useTheme,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// 실제 위스키 데이터셋 기반 질문/선택지
const QUESTIONS = [
  {
    question: "선호하는 위스키의 바디감은?",
    options: ["매우 가벼움", "가벼움", "중간", "무거움", "매우 무거움"],
    key: "Body",
  },
  {
    question: "선호하는 단맛 수준은?",
    options: ["매우 약함", "약함", "중간", "강함", "매우 강함"],
    key: "Sweetness",
  },
  {
    question: "선호하는 스모키함 수준은?",
    options: ["매우 약함", "약함", "중간", "강함", "매우 강함"],
    key: "Smoky",
  },
  {
    question: "선호하는 스파이시함 수준은?",
    options: ["매우 약함", "약함", "중간", "강함", "매우 강함"],
    key: "Spicy",
  },
  {
    question: "선호하는 과일향 수준은?",
    options: ["매우 약함", "약함", "중간", "강함", "매우 강함"],
    key: "Fruity",
  },
  {
    question: "선호하는 꽃향 수준은?",
    options: ["매우 약함", "약함", "중간", "강함", "매우 강함"],
    key: "Floral",
  },
  {
    question: "선호하는 와인향 수준은?",
    options: ["매우 약함", "약함", "중간", "강함", "매우 강함"],
    key: "Winey",
  },
];

interface SurveyFormProps {
  onSubmit: (answers: Record<string, number>) => void;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  // const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (optionIdx: number) => {
    const updated = { ...answers };
    updated[QUESTIONS[currentStep].key] = optionIdx;
    setAnswers(updated);
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) setCurrentStep((s) => s + 1);
      else onSubmit(updated);
    }, 200);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(180deg, #e8d9c5 0%, #f0e6d8 100%)",
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
            {currentStep + 1} / {QUESTIONS.length}
          </Typography>
        </Box>
        {/* 질문 카드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: "#3b2d1f",
                fontFamily: "Pretendard, sans-serif",
                fontSize: 22,
                lineHeight: 1.4,
              }}
            >
              {QUESTIONS[currentStep].question}
            </Typography>
            <Box>
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <Button
                  key={opt}
                  onClick={() => handleSelect(idx)}
                  fullWidth
                  sx={{
                    mb: 2,
                    py: 2.2,
                    borderRadius: 99,
                    border: "2px solid #b8860b",
                    fontWeight: 600,
                    fontSize: 17,
                    color: answers[QUESTIONS[currentStep].key] === idx ? "#fff" : "#5a3e36",
                    background:
                      answers[QUESTIONS[currentStep].key] === idx ? "#8b5a2b" : "rgba(255, 253, 250, 0.9)",
                    boxShadow:
                      answers[QUESTIONS[currentStep].key] === idx
                        ? "0 2px 12px 0 rgba(139, 90, 43, 0.2)"
                        : "none",
                    transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                    "&:hover": {
                      background:
                        answers[QUESTIONS[currentStep].key] === idx ? "#6b4226" : "#e8d9c5",
                      color: answers[QUESTIONS[currentStep].key] === idx ? "#fff" : "#3b2d1f",
                      borderColor:
                        answers[QUESTIONS[currentStep].key] === idx ? "#6b4226" : "#8b5a2b",
                    },
                  }}
                >
                  {opt}
                </Button>
              ))}
            </Box>
          </motion.div>
        </AnimatePresence>
        {/* 하단 네비게이션 */}
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            sx={{
              fontSize: 15,
              fontWeight: 500,
              color: "#8b5a2b",
              minWidth: 80,
              boxShadow: "none",
              background: "none",
              "&:hover": { background: "#f5f6fa" },
            }}
          >
            이전
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SurveyForm;
