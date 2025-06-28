import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  getRecommendationBySimilarUsers,
  getSimilarUserCount,
} from "../services/surveyApi";

interface SimilarUserRecommendationProps {
  userEmail: string;
  maxRecommendations?: number;
}

const SimilarUserRecommendation: React.FC<SimilarUserRecommendationProps> = ({
  userEmail,
  maxRecommendations = 5,
}) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [similarUserCount, setSimilarUserCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    if (!userEmail) return;

    setLoading(true);
    setError(null);

    try {
      // 유사한 사용자 수 조회
      const countResponse = await getSimilarUserCount(userEmail);
      setSimilarUserCount(countResponse.similarUserCount);

      // 유사한 사용자가 있으면 추천 받기
      if (countResponse.similarUserCount > 0) {
        const recommendResponse = await getRecommendationBySimilarUsers(
          userEmail,
          maxRecommendations
        );
        setRecommendations(recommendResponse.recommendedWhiskies);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      setError("추천을 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [userEmail, maxRecommendations]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (similarUserCount === 0) {
    return (
      <Card
        sx={{
          background: "#fffdfa",
          border: "1px solid #D4C7B0",
          borderRadius: 3,
          mb: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#6D4C2C"
            gutterBottom
          >
            유사한 사용자 기반 추천
          </Typography>
          <Typography color="#889982">
            아직 유사한 취향을 가진 다른 사용자가 없습니다. 더 많은 사용자가
            설문을 완료하면 개인화된 추천을 받을 수 있습니다.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        background: "#fffdfa",
        border: "1px solid #D4C7B0",
        borderRadius: 3,
        mb: 3,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold" color="#6D4C2C">
            유사한 사용자들이 선호하는 위스키
          </Typography>
          <Chip
            label={`${similarUserCount}명의 유사한 사용자`}
            color="primary"
            size="small"
            sx={{ background: "#A8B6A0", color: "#254034" }}
          />
        </Box>

        {recommendations.length > 0 ? (
          <Stack spacing={2}>
            {recommendations.map((whisky, index) => (
              <Box
                key={whisky}
                sx={{
                  p: 2,
                  background: "#F6F4F3",
                  borderRadius: 2,
                  border: "1px solid #E8E0D8",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="#6D4C2C"
                  >
                    {index + 1}. {whisky}
                  </Typography>
                  <Chip
                    label="추천"
                    size="small"
                    sx={{
                      background: "#889982",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography color="#889982">
            유사한 사용자들이 선호하는 위스키를 찾을 수 없습니다.
          </Typography>
        )}

        <Box mt={2}>
          <Button
            variant="outlined"
            onClick={fetchRecommendations}
            sx={{
              borderColor: "#A8B6A0",
              color: "#6D4C2C",
              "&:hover": {
                borderColor: "#889982",
                background: "#F6F4F3",
              },
            }}
          >
            추천 새로고침
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SimilarUserRecommendation;
