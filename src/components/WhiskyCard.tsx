import { Card, Typography, Box } from "@mui/material";

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
      background: "#F6F4F3",
      borderRadius: 16,
      boxShadow: "0 2px 12px 0 rgba(37,64,52,0.07)",
      border: "1px solid #E6D9C3",
      color: "#254034",
      p: 3,
      minWidth: 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      transition: "box-shadow 0.2s, transform 0.2s",
      "&:hover": {
        boxShadow: "0 8px 32px 0 rgba(37,64,52,0.13)",
        transform: "translateY(-2px) scale(1.01)",
      },
    }}
  >
    <Typography
      variant="h6"
      fontWeight="bold"
      color="#B48A78"
      sx={{ mb: 1, letterSpacing: "-0.5px" }}
    >
      {distillery}
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        color: "#56473A",
        fontSize: 15,
        fontWeight: 500,
      }}
    >
      <Typography variant="body2">Body: {body}</Typography>
      <Typography variant="body2">Sweetness: {sweetness}</Typography>
      <Typography variant="body2">Smoky: {smoky}</Typography>
      <Typography variant="body2">Fruity: {fruity}</Typography>
      <Typography variant="body2">Floral: {floral}</Typography>
    </Box>
  </Card>
);

export default WhiskyCard;
