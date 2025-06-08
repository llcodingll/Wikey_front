import React from "react";
import RegisterForm from "../../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2>회원가입</h2>
      <RegisterForm />
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <a href="/login">로그인</a> | <a href="#">비밀번호 찾기</a>
      </div>
    </div>
  );
}
