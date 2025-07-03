import { Typography, Box, Button, Chip, Stack, Divider } from '@mui/material';
import { QUESTIONS } from '../../constants/surveyQuestions';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SurveyPreviewProps {
  regions: string[];
  answers: Record<string, number>;
  onSubmit: () => void;
  onEdit: () => void;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ regions, answers, onEdit }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/survey-result', { state: { answers, regions } });
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 800,
          color: '#254034',
          letterSpacing: '-0.03em',
        }}
      >
        Survey Preview
      </Typography>
      <Typography
        sx={{
          mb: 1,
          fontWeight: 700,
          color: '#889982',
          fontSize: 16,
        }}
      >
        Selected Regions
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {regions.length === 0 ? (
          <Typography sx={{ color: '#ccc' }}>No regions selected</Typography>
        ) : (
          regions.map((region) => (
            <Chip
              key={region}
              label={`#${region}`}
              sx={{
                background: '#F6F4F3',
                color: '#889982',
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 1,
                boxShadow: '0 1px 4px 0 rgba(136,153,130,0.06)',
                border: '1px solid #E6D9C3',
              }}
            />
          ))
        )}
      </Stack>
      <Divider sx={{ mb: 3, background: '#E6D9C3' }} />
      <Typography
        sx={{
          mb: 1,
          fontWeight: 700,
          color: '#889982',
          fontSize: 16,
        }}
      >
        Selected Characteristics
      </Typography>
      <Box sx={{ mb: 3, textAlign: 'left' }}>
        {QUESTIONS.map((q) => (
          <Typography key={q.key} sx={{ mb: 1.2, fontSize: 15, color: '#254034' }}>
            <b>{q.label}</b> <span style={{ color: '#889982' }}>{q.options[answers[q.key]]}</span>
          </Typography>
        ))}
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          onClick={onEdit}
          sx={{
            color: '#889982',
            borderColor: '#889982',
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            '&:hover': { borderColor: '#6D4C2C', background: '#F6F4F3' },
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: '#889982',
            color: '#fff',
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            '&:hover': { background: '#6D4C2C' },
            boxShadow: '0 2px 8px 0 rgba(136,153,130,0.10)',
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default SurveyPreview;
