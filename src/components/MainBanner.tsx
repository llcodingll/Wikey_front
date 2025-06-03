import { Box, Typography, Button } from "@mui/material";

type MainBannerProps = {
  onSurveyClick: () => void;
};

const MainBanner = ({ onSurveyClick }: MainBannerProps) => (
  <Box
    sx={{
      background: "linear-gradient(90deg, #a47149 0%, #6b3e26 100%)",
      color: "#fff",
      borderRadius: 3,
      p: 5,
      textAlign: "center",
      mb: 4,
      boxShadow: 3,
    }}
  >
    <Typography variant="h3" fontWeight="bold" mb={2}>
      당신만을 위한 위스키 추천
    </Typography>
    <Typography variant="h6" mb={3}>
      위스키 입문자를 위한 쉽고 감각적인 추천
    </Typography>
    <Button
      variant="contained"
      sx={{ background: "#704214", fontWeight: "bold" }}
      onClick={onSurveyClick}
    >
      내 취향 찾기
    </Button>
  </Box>
);

export default MainBanner;
