import { Box, Typography, LinearProgress, Stack } from "@mui/material";

interface Stat {
  labelLeft: string;
  labelRight: string;
  leftShort: string;
  rightShort: string;
  leftValue: number;
  rightValue: number;
  activeSide: "left" | "right";
}

interface SurveyResultStatsProps {
  stats: Stat[];
}

const SurveyResultStats = ({ stats }: SurveyResultStatsProps) => (
  <Box sx={{ background: "#fff", borderRadius: 3, p: 3, mb: 4, boxShadow: 1 }}>
    {stats.map((stat) => (
      <Box key={stat.labelLeft} sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} color="#8b5a2b">
            {stat.labelLeft}
          </Typography>
          <Typography fontWeight={700} color="#8b5a2b">
            {stat.labelRight}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
          <Typography fontWeight={700} color="#c0392b" sx={{ minWidth: 36 }}>
            {stat.leftShort}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={stat.rightValue}
            sx={{
              flex: 1,
              height: 12,
              borderRadius: 6,
              background: "#f9e6c7",
              "& .MuiLinearProgress-bar": {
                background: "#c0392b",
              },
            }}
          />
          <Typography fontWeight={700} color="#c0392b" sx={{ minWidth: 36 }}>
            {stat.rightShort}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
          <Typography color="#8b5a2b">{stat.leftValue}</Typography>
          <Typography color="#8b5a2b">{stat.rightValue}</Typography>
        </Stack>
      </Box>
    ))}
  </Box>
);

export default SurveyResultStats;
