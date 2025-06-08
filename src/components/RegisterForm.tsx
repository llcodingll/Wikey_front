import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

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
      <div>
        <label>이메일</label>
        <input {...register("email")} />
        <p>
          {typeof errors.email?.message === "string"
            ? errors.email.message
            : ""}
        </p>
      </div>
      <div>
        <label>비밀번호</label>
        <input type="password" {...register("password")} />
        <p>
          {typeof errors.password?.message === "string"
            ? errors.password.message
            : ""}
        </p>
      </div>
      <div>
        <label>비밀번호 확인</label>
        <input type="password" {...register("confirm")} />
        <p>
          {typeof errors.confirm?.message === "string"
            ? errors.confirm.message
            : ""}
        </p>
      </div>
      <button type="submit" disabled={isSubmitting}>
        회원가입
      </button>
    </form>
  );
}
