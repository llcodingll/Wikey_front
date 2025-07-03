import { Box, Typography, LinearProgress, Stack } from '@mui/material';

interface Stat {
  labelLeft: string;
  labelRight: string;
  leftShort: string;
  rightShort: string;
  leftValue: number;
  rightValue: number;
  activeSide: 'left' | 'right';
}

interface SurveyResultStatsProps {
  stats: Stat[];
}

const SurveyResultStats = ({ stats }: SurveyResultStatsProps) => (
  <Box sx={{ background: '#F6F4F3', borderRadius: 3, p: 3, mb: 4, boxShadow: 1 }}>
    {stats.map((stat) => (
      <Box key={stat.labelLeft} sx={{ mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={700} color="#6D4C2C">
            {stat.labelLeft}
          </Typography>
          <Typography fontWeight={700} color="#6D4C2C">
            {stat.labelRight}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
          <Typography fontWeight={700} color="#B48A78" sx={{ minWidth: 36 }}>
            {stat.leftShort}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={stat.rightValue}
            sx={{
              flex: 1,
              height: 12,
              borderRadius: 6,
              background: '#f9e6c7',
              '& .MuiLinearProgress-bar': {
                background: '#B48A78',
              },
            }}
          />
          <Typography fontWeight={700} color="#B48A78" sx={{ minWidth: 36 }}>
            {stat.rightShort}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
          <Typography color="#6D4C2C">{stat.leftValue}</Typography>
          <Typography color="#6D4C2C">{stat.rightValue}</Typography>
        </Stack>
      </Box>
    ))}
  </Box>
);

export default SurveyResultStats;
