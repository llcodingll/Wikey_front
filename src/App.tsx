import "./styles/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@views/mainPage/MainPage";
import SurveyPage from "@views/surveyPage/SurveyPage";
import SurveyResultPage from "@views/surveyPage/SurveyResultPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/survey-result" element={<SurveyResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
