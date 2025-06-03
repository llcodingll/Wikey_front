import { Box, Typography } from "@mui/material";

interface Keyword {
  label: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface SurveyResultKeywordsProps {
  keywords: Keyword[];
}

const SurveyResultKeywords = ({ keywords }: SurveyResultKeywordsProps) => (
  <Box sx={{ background: "#222", borderRadius: 3, p: 3, mb: 4 }}>
    {keywords.map((kw) => (
      <Box key={kw.label} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box sx={{ mr: 2, color: kw.color }}>{kw.icon}</Box>
        <Box>
          <Typography fontWeight={700} color={kw.color} sx={{ mb: 0.5 }}>
            {kw.label}
          </Typography>
          <Typography color="#fff" sx={{ fontSize: 15 }}>
            {kw.description}
          </Typography>
        </Box>
      </Box>
    ))}
  </Box>
);

export default SurveyResultKeywords;
