import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import whiskyData from "@assets/whisky.json";

import MainBanner from "@components/MainBanner";
import FilterSidebar from "@components/FilterSidebar";
import WhiskyCard from "@components/WhiskyCard";

type Whisky = {
  Distillery: string;
  Body: number;
  Sweetness: number;
  Smoky: number;
  Fruity: number;
  Floral: number;
};

const defaultFilters = {
  body: 0,
  sweetness: 0,
  smoky: 0,
  fruity: 0,
  floral: 0,
};

const MainPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const navigate = useNavigate();

  const handleFilterChange = (key: string, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSurveyClick = () => {
    navigate("/survey");
  };

  const filteredWhiskies = useMemo(
    () =>
      (whiskyData as Whisky[]).filter((w) =>
        Object.entries(filters).every(([key, value]) => {
          const whiskyKey = key.charAt(0).toUpperCase() + key.slice(1);
          // @ts-ignore
          return value === 0 || w[whiskyKey] >= value;
        })
      ),
    [filters]
  );

  return (
    <Box
      sx={{
        background: "#254034",
        minHeight: "100vh",
        p: { xs: 2, md: 6 },
      }}
    >
      <MainBanner onSurveyClick={handleSurveyClick} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 6,
          mt: 2,
          maxWidth: 1400,
          mx: "auto",
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            flex: "0 0 260px",
            width: { xs: "100%", md: "260px" },
            mb: { xs: 4, md: 0 },
          }}
        >
          <FilterSidebar filters={filters} onChange={handleFilterChange} />
        </Box>
        {/* Whisky Cards Section */}
        <Box
          sx={{
            flex: 1,
            background: "#A8B6A0",
            borderRadius: 10,
            p: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
          }}
        >
          {filteredWhiskies.map((w) => (
            <WhiskyCard
              key={w.Distillery}
              distillery={w.Distillery}
              body={w.Body}
              sweetness={w.Sweetness}
              smoky={w.Smoky}
              fruity={w.Fruity}
              floral={w.Floral}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
