import { useState, useMemo } from "react";
import { Box, Button, Stack, Chip, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import whiskyData from "@assets/whisky.json";

import MainBanner from "@components/MainBanner";
import FilterSidebar from "@components/FilterSidebar";
import WhiskyCard from "@components/WhiskyCard";
import RegisterForm from "@components/RegisterForm";
import WhiskyRadarChart, {
  WhiskyCharacteristic,
} from "@components/WhiskyRadarChart";

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
  const [comparedWhiskies, setComparedWhiskies] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const navigate = useNavigate();

  const handleFilterChange = (key: string, value: number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSurveyClick = () => {
    navigate("/survey");
  };

  const handleCompareChange = (distillery: string, checked: boolean) => {
    setComparedWhiskies((prev) => {
      if (checked) {
        if (prev.length >= 4) return prev;
        return [...prev, distillery];
      } else {
        return prev.filter((d) => d !== distillery);
      }
    });
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

  // Get full whisky info for compared whiskies
  const comparedWhiskyInfos = useMemo(
    () =>
      comparedWhiskies
        .map((name) => (whiskyData as any[]).find((w) => w.Distillery === name))
        .filter(Boolean),
    [comparedWhiskies]
  );

  // Prepare radar chart data for all compared whiskies
  const radarChartData = comparedWhiskyInfos.map((w) => [
    { characteristic: "Body", value: w.Body },
    { characteristic: "Sweetness", value: w.Sweetness },
    { characteristic: "Smoky", value: w.Smoky },
    { characteristic: "Fruity", value: w.Fruity },
    { characteristic: "Floral", value: w.Floral },
  ]);

  return (
    <Box
      sx={{
        background: "#254034",
        minHeight: "100vh",
        p: { xs: 2, md: 6 },
      }}
    >
      {/* Compare Bar */}
      {comparedWhiskies.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            mb: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "#fffdfa",
            border: "1px solid #D4C7B0",
            borderRadius: 3,
          }}
        >
          <span style={{ fontWeight: 600, color: "#6D4C2C" }}>Compare:</span>
          {comparedWhiskies.map((name) => (
            <Chip key={name} label={name} color="primary" />
          ))}
          <Button
            variant="contained"
            color="primary"
            disabled={comparedWhiskies.length < 2}
            onClick={() => setCompareOpen(true)}
          >
            Compare
          </Button>
        </Paper>
      )}
      {/* Compare Modal/Section */}
      <Dialog
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Whisky Comparison
          <IconButton
            aria-label="close"
            onClick={() => setCompareOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Table Comparison */}
          <Table size="small" sx={{ mb: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell>Characteristic</TableCell>
                {comparedWhiskyInfos.map((w) => (
                  <TableCell key={w.Distillery} align="center">
                    {w.Distillery}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {["Body", "Sweetness", "Smoky", "Fruity", "Floral"].map(
                (charKey) => (
                  <TableRow key={charKey}>
                    <TableCell>{charKey}</TableCell>
                    {comparedWhiskyInfos.map((w) => (
                      <TableCell key={w.Distillery + charKey} align="center">
                        {w[charKey]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
          {/* Radar Chart Comparison */}
          <Box sx={{ width: "100%", height: 350 }}>
            <WhiskyRadarChart
              data={[]}
              // @ts-ignore
              multiData={radarChartData}
              // We'll update WhiskyRadarChart to support multiData below
              comparedNames={comparedWhiskyInfos.map((w) => w.Distillery)}
            />
          </Box>
        </DialogContent>
      </Dialog>
      <MainBanner onSurveyClick={handleSurveyClick} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-end"
        sx={{ maxWidth: 1400, mx: "auto", mt: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
        >
          로그인
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/register")}
        >
          회원가입
        </Button>
      </Stack>
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
              isCompared={comparedWhiskies.includes(w.Distillery)}
              onCompareChange={(checked) =>
                handleCompareChange(w.Distillery, checked)
              }
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
