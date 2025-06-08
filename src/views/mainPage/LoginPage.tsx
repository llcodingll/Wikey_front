import React from "react";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
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
      <h2>로그인</h2>
      <LoginForm />
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <a href="/register">회원가입</a> | <a href="#">비밀번호 찾기</a>
      </div>
    </div>
  );
}
