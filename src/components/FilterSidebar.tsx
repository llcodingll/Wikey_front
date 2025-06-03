import { Box, Typography, Slider } from '@mui/material';

interface FilterSidebarProps {
  filters: any;
  onChange: (key: string, value: number) => void;
}

const FilterSidebar = ({ filters, onChange }: FilterSidebarProps) => (
  <Box sx={{ width: 250, p: 2, background: '#e7d6c5', borderRadius: 2 }}>
    <Typography variant="h6" color="#704214" mb={2}>
      필터
    </Typography>
    {['body', 'sweetness', 'smoky', 'fruity', 'floral'].map((key) => (
      <Box key={key} mb={2}>
        <Typography variant="body2" color="#704214">{key.toUpperCase()}</Typography>
        <Slider
          value={filters[key]}
          min={0}
          max={4}
          step={1}
          onChange={(_, value) => onChange(key, value as number)}
          sx={{ color: '#a47149' }}
        />
      </Box>
    ))}
  </Box>
);

export default FilterSidebar;
