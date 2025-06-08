import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@views/mainPage/MainPage";
import SurveyPage from "@views/surveyPage/SurveyPage";
import SurveyResultPage from "@views/surveyPage/SurveyResultPage";
import RegisterPage from "@views/mainPage/RegisterPage";
import LoginPage from "@views/mainPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/survey-result" element={<SurveyResultPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
