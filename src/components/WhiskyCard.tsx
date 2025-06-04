import { Card, Typography, Box } from "@mui/material";

const LEVEL_EMOJI = '🟤';

interface WhiskyCardProps {
  distillery: string;
  body: number;
  sweetness: number;
  smoky: number;
  fruity: number;
  floral: number;
}

const renderEmojis = (value: number) => {
  const count = Math.max(0, Math.min(value, 5));
  return <span>{LEVEL_EMOJI.repeat(count)}</span>;
};

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
      <Typography variant="body2">Body: {renderEmojis(body)}</Typography>
      <Typography variant="body2">Sweetness: {renderEmojis(sweetness)}</Typography>
      <Typography variant="body2">Smoky: {renderEmojis(smoky)}</Typography>
      <Typography variant="body2">Fruity: {renderEmojis(fruity)}</Typography>
      <Typography variant="body2">Floral: {renderEmojis(floral)}</Typography>
    </Box>
  </Card>
);

export default WhiskyCard;
