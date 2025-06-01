import React, { useState } from "react";
import { Typography, Button, Box, Stack } from "@mui/material";
import { QUESTIONS } from "../../constants/surveyQuestions";
import { motion, AnimatePresence } from "framer-motion";

interface SurveyFormProps {
  onSubmit: (answers: Record<string, number>) => void;
  progress: number;
  currentStep: number;
  onPrev?: () => void; // 이전 버튼 클릭 시 부모에 이벤트 전달 (선택)
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  onSubmit,
  currentStep,
  onPrev,
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelect = (optionIdx: number) => {
    const updated = { ...answers };
    updated[QUESTIONS[currentStep].key] = optionIdx;
    setAnswers(updated);
    onSubmit(updated); // 답변만 부모에 전달, 단계 변경은 부모에서 처리
  };

  // 이전 버튼은 부모에서 currentStep을 관리하는 것이 일반적
  // onPrev props가 있으면 부모에 이벤트 전달
  const handlePrev = () => {
    if (onPrev) onPrev();
  };

  return (
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
          {QUESTIONS[currentStep].label}
        </Typography>
        <Stack spacing={2}>
          {QUESTIONS[currentStep].options.map((opt, idx) => (
            <Button
              key={opt}
              onClick={() => handleSelect(idx)}
              fullWidth
              sx={{
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
        </Stack>
        {/* 이전 버튼은 부모에서 currentStep을 관리할 때만 사용 */}
        {onPrev && (
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
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SurveyForm;
