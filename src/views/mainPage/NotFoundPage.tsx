import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</p>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => navigate("/")}>메인으로</button>{" "}
        <button onClick={() => navigate("/login")}>로그인</button>{" "}
        <button onClick={() => navigate("/register")}>회원가입</button>
      </div>
    </div>
  );
}
