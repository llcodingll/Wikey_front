import { Card, CardContent, Typography, Box } from '@mui/material';

interface WhiskyCardProps {
  distillery: string;
  body: number;
  sweetness: number;
  smoky: number;
  fruity: number;
  floral: number;
}

const WhiskyCard = ({
  distillery,
  body,
  sweetness,
  smoky,
  fruity,
  floral,
}: WhiskyCardProps) => (
  <Card sx={{ mb: 2, background: '#f5eee6', borderRadius: 2, boxShadow: 2 }}>
    <CardContent>
      <Typography variant="h5" fontWeight="bold" color="#704214">
        {distillery}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Typography variant="body2">바디: {body}</Typography>
        <Typography variant="body2">단맛: {sweetness}</Typography>
        <Typography variant="body2">스모키: {smoky}</Typography>
        <Typography variant="body2">과일향: {fruity}</Typography>
        <Typography variant="body2">플로럴: {floral}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default WhiskyCard;
