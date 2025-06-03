import { Card, CardContent, Typography, Box } from "@mui/material";

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
  <Card
    sx={{
      mb: 2,
      background: "#f5eee6",
      borderRadius: 2,
      boxShadow: 2,
      minWidth: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <CardContent>
      <Typography
        variant="h5"
        fontWeight="bold"
        color="#704214"
        sx={{
          wordBreak: "break-word",
          whiteSpace: "normal",
          mb: 1,
        }}
      >
        {distillery}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
          rowGap: 0.5,
        }}
      >
        <Typography variant="body2">BODY: {body}</Typography>
        <Typography variant="body2">SWEETNESS: {sweetness}</Typography>
        <Typography variant="body2">SMOKY: {smoky}</Typography>
        <Typography variant="body2">FRUITY: {fruity}</Typography>
        <Typography variant="body2">FLORAL: {floral}</Typography>
      </Box>
    </CardContent>
  </Card>
);

export default WhiskyCard;
