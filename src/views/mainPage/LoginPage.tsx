import React from 'react';
import LoginForm from '../../components/LoginForm';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#254034',
        fontFamily: 'Pretendard, sans-serif',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 5,
          boxShadow: '0 6px 24px 0 rgba(80, 60, 30, 0.12)',
          overflow: 'hidden',
          background: 'rgba(255, 253, 250, 0.95)',
          border: '1px solid #D4C7B0',
          px: { xs: 2, sm: 3 },
          py: { xs: 4, sm: 5 },
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2} color="#254034">
          로그인
        </Typography>
        <LoginForm />
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button variant="text" onClick={() => navigate('/register')}>
            회원가입
          </Button>
          <Button variant="text" onClick={() => alert('준비 중입니다')}>
            비밀번호 찾기
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
