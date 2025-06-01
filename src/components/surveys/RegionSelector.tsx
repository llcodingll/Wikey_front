import React from "react";
import { Typography, FormGroup, FormControlLabel, Checkbox, Box, Button } from "@mui/material";

const REGIONS = [
  { name: "Highland", desc: "다양한 스타일, 진하고 복합적. 과일, 꿀, 꽃, 약간의 스파이스." },
  { name: "Islay", desc: "강한 스모키, 피트, 바닷바람, 소금, 해조류, 강렬한 풍미." },
  { name: "Speyside", desc: "달콤하고 과일향, 부드럽고 깔끔. 초보자에게 추천." },
  { name: "Lowland", desc: "가볍고 부드럽고 꽃향, 상쾌함. 입문자에게 적합." },
  { name: "Campbeltown", desc: "복합적이고 짭짤함, 약간의 스모키, 과일, 바닐라, 풍부한 바디감." },
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
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: "#3b2d1f" }}>
        선호하는 위스키 생산 지역을 선택해주세요.
      </Typography>
      <FormGroup>
        {REGIONS.map((region) => (
          <Box
            key={region.name}
            sx={{
              mb: 2,
              p: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              border: "1px solid #e5c896",
              background: value.includes(region.name) ? "#f9e6c7" : "#fff",
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
                  sx={{ color: "#b8860b", "&.Mui-checked": { color: "#8b5a2b" } }}
                />
              }
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600, color: "#8b5a2b" }}>{region.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: "#6b4226" }}>{region.desc}</Typography>
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
          background: "#8b5a2b",
          color: "#fff",
          "&:hover": { background: "#6b4226" },
          width: "100%",
        }}
      >
        다음
      </Button>
    </Box>
  );
};

export default RegionSelector;
