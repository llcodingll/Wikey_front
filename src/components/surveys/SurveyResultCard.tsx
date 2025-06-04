import { Box, Typography } from "@mui/material";

interface SurveyResultCardProps {
  type: string;
  title: string;
  description: string;
  imageUrl: string;
}

const SurveyResultCard = ({
  type,
  title,
  description,
  imageUrl,
}: SurveyResultCardProps) => (
  <Box
    sx={{
      background: "#B48A78",
      color: "#fff",
      borderRadius: 5,
      p: 4,
      textAlign: "center",
      mb: 4,
      boxShadow: 3,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Typography
      variant="h4"
      fontWeight={900}
      sx={{ mb: 1, letterSpacing: "0.05em" }}
    >
      {type}
    </Typography>
    <img
      src={imageUrl}
      alt={type}
      style={{ width: 170, margin: "0 auto 20px", display: "block" }}
    />
    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
      {title}
    </Typography>
    <Typography sx={{ fontSize: 16, lineHeight: 1.7 }}>
      {description}
    </Typography>
  </Box>
);

export default SurveyResultCard;
