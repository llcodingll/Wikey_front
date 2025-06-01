import { Typography, Box, Button, Chip, Stack, Divider } from "@mui/material";
import { QUESTIONS } from "../../constants/surveyQuestions";
import React from "react";

interface SurveyPreviewProps {
  regions: string[];
  answers: Record<string, number>;
  onSubmit: () => void;
  onEdit: () => void;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  regions,
  answers,
  onSubmit,
  onEdit,
}) => {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 800,
          color: "#3b2d1f",
          letterSpacing: "-0.03em",
        }}
      >
        설문 결과 미리보기
      </Typography>

      {/* 선택한 지역 - 태그 스타일 */}
      <Typography
        sx={{
          mb: 1,
          fontWeight: 700,
          color: "#8b5a2b",
          fontSize: 16,
        }}
      >
        선택한 지역
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        {regions.length === 0 ? (
          <Typography sx={{ color: "#ccc" }}>선택한 지역 없음</Typography>
        ) : (
          regions.map((region) => (
            <Chip
              key={region}
              label={`#${region}`}
              sx={{
                background: "#f9e6c7",
                color: "#8b5a2b",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 1,
                boxShadow: "0 1px 4px 0 rgba(139,90,43,0.06)",
                border: "1px solid #e5c896",
              }}
            />
          ))
        )}
      </Stack>

      <Divider sx={{ mb: 3, background: "#e5c896" }} />

      {/* 선택한 특성 */}
      <Typography
        sx={{
          mb: 1,
          fontWeight: 700,
          color: "#8b5a2b",
          fontSize: 16,
        }}
      >
        선택한 특성
      </Typography>
      <Box sx={{ mb: 3, textAlign: "left" }}>
        {QUESTIONS.map((q) => (
          <Typography key={q.key} sx={{ mb: 1.2, fontSize: 15, color: "#3b2d1f" }}>
            <b>{q.label}</b> <span style={{ color: "#8b5a2b" }}>{q.options[answers[q.key]]}</span>
          </Typography>
        ))}
      </Box>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          onClick={onEdit}
          sx={{
            color: "#8b5a2b",
            borderColor: "#8b5a2b",
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            "&:hover": { borderColor: "#6b4226", background: "#f9e6c7" },
          }}
        >
          수정하기
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            background: "#8b5a2b",
            color: "#fff",
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            "&:hover": { background: "#6b4226" },
            boxShadow: "0 2px 8px 0 rgba(139,90,43,0.10)",
          }}
        >
          제출하기
        </Button>
      </Stack>
    </Box>
  );
};

export default SurveyPreview;
