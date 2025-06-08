import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { TextField, Button, Stack, Typography } from "@mui/material";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식이 아닙니다")
    .required("이메일을 입력하세요"),
  password: yup
    .string()
    .min(6, "6자 이상 입력")
    .required("비밀번호를 입력하세요"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 확인을 입력하세요"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      await axios.post("/register", {
        email: data.email,
        password: data.password,
      });
      alert("회원가입 성공! 로그인 해주세요.");
      window.location.href = "/";
    } catch (e: any) {
      alert(e.response?.data?.message || "회원가입 실패");
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
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message as string}
          sx={{ background: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="비밀번호"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message as string}
          sx={{ background: "#fff", borderRadius: 1 }}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          variant="outlined"
          size="small"
          fullWidth
          {...register("confirm")}
          error={!!errors.confirm}
          helperText={errors.confirm?.message as string}
          sx={{ background: "#fff", borderRadius: 1 }}
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
          회원가입
        </Button>
      </Stack>
    </form>
  );
}
