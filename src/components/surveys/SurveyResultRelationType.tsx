import { Box, Typography } from "@mui/material";

interface RelationType {
  label: string;
  percent: number;
  color: string;
  description: string;
}

interface SurveyResultRelationTypeProps {
  types: RelationType[];
}

const SurveyResultRelationType = ({ types }: SurveyResultRelationTypeProps) => (
  <Box sx={{ background: "#fff", borderRadius: 3, p: 3, mb: 4, boxShadow: 1 }}>
    <Typography variant="h6" fontWeight={800} sx={{ mb: 2, color: "#3b2d1f" }}>
      나의 관계 유형
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      {/* 파이차트는 라이브러리로 대체 가능, 여기선 색상박스와 수치로 대체 */}
      {types.map((t) => (
        <Box key={t.label} sx={{ mr: 2, textAlign: "center" }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: t.color,
              display: "inline-block",
              mb: 0.5,
            }}
          />
          <Typography fontWeight={700} color={t.color}>
            {t.label}
          </Typography>
          <Typography fontWeight={700}>{t.percent}%</Typography>
        </Box>
      ))}
    </Box>
    {types.map((t) => (
      <Box key={t.label} sx={{ mb: 1.5 }}>
        <Typography fontWeight={700} color={t.color}>
          {t.label}형
        </Typography>
        <Typography sx={{ fontSize: 15 }}>{t.description}</Typography>
      </Box>
    ))}
  </Box>
);

export default SurveyResultRelationType;
