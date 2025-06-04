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
  <Box sx={{ background: "#F6F4F3", borderRadius: 3, p: 3, mb: 4, boxShadow: 1 }}>
    <Typography variant="h6" fontWeight={800} sx={{ mb: 2, color: "#254034" }}>
      My Relationship Types
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
          {t.label} Type
        </Typography>
        <Typography sx={{ fontSize: 15, color: "#254034" }}>{t.description}</Typography>
      </Box>
    ))}
  </Box>
);

export default SurveyResultRelationType;
