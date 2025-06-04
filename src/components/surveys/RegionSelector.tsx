import React from "react";
import { Typography, FormGroup, FormControlLabel, Checkbox, Box, Button } from "@mui/material";

const REGIONS = [
  {
    name: "Highland",
    desc: "Diverse styles, rich and complex. Notes of fruit, honey, flowers, and a hint of spice.",
  },
  {
    name: "Islay",
    desc: "Strong smoky, peat, sea breeze, salt, seaweed, and intense flavors.",
  },
  {
    name: "Speyside",
    desc: "Sweet and fruity, smooth and clean. Recommended for beginners.",
  },
  {
    name: "Lowland",
    desc: "Light and soft with floral notes, refreshing. Suitable for beginners.",
  },
  {
    name: "Campbeltown",
    desc: "Complex and salty, with hints of smoky, fruit, vanilla, and rich body.",
  },
];

interface RegionSelectorProps {
  value: string[];
  onChange: (regions: string[]) => void;
  onNext: () => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ value, onChange, onNext }) => {
  const handleChange = (region: string) => {
    if (value.includes(region)) {
      onChange(value.filter((r) => r !== region));
    } else {
      onChange([...value, region]);
    }
  };

  const handleNext = () => {
    if (value.length === 0) return;
    onNext();
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: "#254034" }}>
        Select your preferred whisky regions
      </Typography>
      <FormGroup>
        {REGIONS.map((region) => (
          <Box
            key={region.name}
            sx={{
              mb: 2,
              p: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              border: "1px solid #E6D9C3",
              background: value.includes(region.name) ? "#F6F4F3" : "#fff",
              transition: "all 0.15s",
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={value.includes(region.name)}
                  onChange={() => handleChange(region.name)}
                  sx={{ color: "#A8B6A0", "&.Mui-checked": { color: "#889982" } }}
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600, color: "#889982" }}>{region.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: "#6D4C2C" }}>{region.desc}</Typography>
                </Box>
              }
              sx={{ alignItems: "flex-start", m: 0 }}
            />
          </Box>
        ))}
      </FormGroup>
      <Button
        onClick={handleNext}
        variant="contained"
        disabled={value.length === 0}
        sx={{
          mt: 3,
          background: "#889982",
          color: "#fff",
          "&:hover": { background: "#6D4C2C" },
          width: "100%",
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default RegionSelector;
