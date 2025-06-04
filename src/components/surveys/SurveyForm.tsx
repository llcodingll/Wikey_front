import React, { useState } from "react";
import { Typography, Button, Box, Stack } from "@mui/material";
import { QUESTIONS } from "../../constants/surveyQuestions";
import { motion, AnimatePresence } from "framer-motion";

interface SurveyFormProps {
  onSubmit: (answers: Record<string, number>) => void;
  progress: number;
  currentStep: number;
  onPrev?: () => void;
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
    onSubmit(updated);
  };

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
            color: "#254034",
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
                border: "2px solid #A8B6A0",
                fontWeight: 600,
                fontSize: 17,
                color: answers[QUESTIONS[currentStep].key] === idx ? "#fff" : "#556B4A",
                background:
                  answers[QUESTIONS[currentStep].key] === idx ? "#889982" : "rgba(255, 253, 250, 0.9)",
                boxShadow:
                  answers[QUESTIONS[currentStep].key] === idx
                    ? "0 2px 12px 0 rgba(136, 153, 130, 0.3)"
                    : "none",
                transition: "all 0.18s cubic-bezier(.4,0,.2,1)",
                "&:hover": {
                  background:
                    answers[QUESTIONS[currentStep].key] === idx ? "#6D4C2C" : "#E8D9C5",
                  color: answers[QUESTIONS[currentStep].key] === idx ? "#fff" : "#254034",
                  borderColor:
                    answers[QUESTIONS[currentStep].key] === idx ? "#6D4C2C" : "#A8B6A0",
                },
              }}
            >
              {opt}
            </Button>
          ))}
        </Stack>
        {onPrev && (
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button
              onClick={handlePrev}
              disabled={currentStep === 0}
              sx={{
                fontSize: 15,
                fontWeight: 500,
                color: "#6D4C2C",
                minWidth: 80,
                boxShadow: "none",
                background: "none",
                "&:hover": { background: "#F4F3EE" },
              }}
            >
              Previous
            </Button>
          </Box>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SurveyForm;
