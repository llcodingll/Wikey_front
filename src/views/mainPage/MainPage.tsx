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
    <Box sx={{ background: "#f2ede3", minHeight: "100vh", p: 4 }}>
      <MainBanner onSurveyClick={handleSurveyClick} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mt: 4,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            flex: "0 0 300px",
            width: { xs: "100%", md: "300px" },
            mb: { xs: 4, md: 0 },
          }}
        >
          <FilterSidebar filters={filters} onChange={handleFilterChange} />
        </Box>
        {/* Whisky Cards */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
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
