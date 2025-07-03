import { Box, Typography, Button } from '@mui/material';

type MainBannerProps = {
  onSurveyClick: () => void;
};

const MainBanner = ({ onSurveyClick }: MainBannerProps) => (
  <Box
    sx={{
      background: '#F6F4F3',
      color: '#254034',
      borderRadius: 13,
      p: { xs: 3, md: 7 },
      textAlign: 'center',
      mb: 6,
      boxShadow: '0 4px 32px 0 rgba(37,64,52,0.08)',
      maxWidth: 1100,
      mx: 'auto',
    }}
  >
    <Typography
      variant="h2"
      fontWeight="bold"
      mb={2}
      sx={{ letterSpacing: '-1px', color: '#254034' }}
    >
      Find Your Perfect Whisky
    </Typography>
    <Typography variant="h5" mb={4} sx={{ color: '#B48A78' }}>
      A modern, intuitive guide for whisky beginners and enthusiasts
    </Typography>
    <Button
      variant="contained"
      sx={{
        background: '#A8B6A0',
        color: '#254034',
        fontWeight: 'bold',
        borderRadius: 8,
        px: 5,
        py: 1.7,
        fontSize: 18,
        boxShadow: '0 2px 8px 0 rgba(168,182,160,0.10)',
        '&:hover': {
          background: '#889982',
          color: '#F6F4F3',
        },
      }}
      onClick={onSurveyClick}
    >
      Start Your Taste Survey
    </Button>
  </Box>
);

export default MainBanner;
