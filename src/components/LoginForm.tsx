import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { TextField, Button, Stack, Typography } from '@mui/material';

const schema = yup.object().shape({
  email: yup.string().email('이메일 형식이 아닙니다').required('이메일을 입력하세요'),
  password: yup.string().min(6, '6자 이상 입력').required('비밀번호를 입력하세요'),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/login', {
        email: data.email,
        password: data.password,
      });
      // accessToken은 localStorage에 저장
      localStorage.setItem('accessToken', res.data.accessToken);
      // refreshToken은 HttpOnly 쿠키로 서버에서 세팅됨 (JS에서 접근 불가)
      alert('로그인 성공! 메인 페이지로 이동합니다.');
      window.location.href = '/';
    } catch (e: any) {
      setError('password', {
        message: e.response?.data?.message || '로그인 실패',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="이메일"
          variant="outlined"
          size="small"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message as string}
          sx={{ background: '#fff', borderRadius: 1 }}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message as string}
          sx={{ background: '#fff', borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isSubmitting}
          sx={{ fontWeight: 700, mt: 1 }}
        >
          로그인
        </Button>
        {errors.password?.message && (
          <Typography color="error" fontSize={14} textAlign="center">
            {errors.password.message as string}
          </Typography>
        )}
      </Stack>
    </form>
  );
}
