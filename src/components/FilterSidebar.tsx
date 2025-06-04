import { useEffect, useRef, useState } from "react";
import { Box, Typography, Slider } from "@mui/material";
import { motion, useMotionValue, animate } from "framer-motion";

interface FilterSidebarProps {
  filters: any;
  onChange: (key: string, value: number) => void;
}

const FILTER_LABELS: Record<string, string> = {
  body: "Body",
  sweetness: "Sweetness",
  smoky: "Smoky",
  fruity: "Fruity",
  floral: "Floral",
};

const SIDEBAR_TOP = 32;

const FilterSidebar = ({ filters, onChange }: FilterSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [initialTop, setInitialTop] = useState<number | null>(null);
  const y = useMotionValue(0);

  useEffect(() => {
    if (sidebarRef.current && initialTop === null) {
      const rect = sidebarRef.current.getBoundingClientRect();
      setInitialTop(rect.top + window.scrollY);
    }
  }, [initialTop]);

  useEffect(() => {
    const handleScroll = () => {
      if (initialTop === null) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const offset = Math.max(0, scrollY - (initialTop - SIDEBAR_TOP));
      animate(y, offset, { type: "spring", stiffness: 120, damping: 20 });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialTop, y]);

  return (
    <motion.div
      ref={sidebarRef}
      style={{
        position: "relative",
        y,
        zIndex: 2,
        width: 260,
      }}
    >
      <Box
        sx={{
          width: 260,
          p: 3,
          background: "#F4F3EE",
          borderRadius: 10,
          color: "#27312C",
          boxShadow: "0 1px 8px 0 rgba(39,49,44,0.07)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          border: "1px solid #E0DED7",
          minHeight: "fit-content",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
          color="#27312C"
          letterSpacing={0.5}
          sx={{ textAlign: "left" }}
        >
          Filters
        </Typography>
        {Object.keys(FILTER_LABELS).map((key) => (
          <Box key={key} mb={2}>
            <Typography
              variant="body2"
              color="#7A9D54"
              fontWeight={700}
              mb={0.5}
              letterSpacing={0.5}
              sx={{
                textTransform: "uppercase",
                opacity: 0.92,
              }}
            >
              {FILTER_LABELS[key]}
            </Typography>
            <Slider
              value={filters[key]}
              min={0}
              max={4}
              step={1}
              onChange={(_, value) => onChange(key, value as number)}
              sx={{
                color: "#7A9D54",
                "& .MuiSlider-thumb": {
                  backgroundColor: "#fff",
                  border: "2px solid #7A9D54",
                  boxShadow: "0 1px 4px 0 rgba(39,49,44,0.10)",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                },
                "& .MuiSlider-thumb:hover": {
                  borderColor: "#A8B6A0",
                  boxShadow: "0 2px 8px 0 rgba(39,49,44,0.18)",
                },
                "& .MuiSlider-track": {
                  background: "linear-gradient(90deg, #7A9D54 60%, #A8B6A0 100%)",
                  height: 6,
                  borderRadius: 3,
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#E0DED7",
                  opacity: 1,
                  height: 6,
                  borderRadius: 3,
                },
                "& .MuiSlider-markLabel": {
                  color: "#27312C",
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </motion.div>
  );
};

export default FilterSidebar;
