import React from "react";
import SurveyForm from "./components/SurveyForm";
import "./styles/global.css";

function App() {
  const handleSurveySubmit = (answers: Record<string, number>) => {
    console.log("Survey submitted with answers:", answers);
  };

  return (
    <div>
      <SurveyForm onSubmit={handleSurveySubmit} />
    </div>
  );
}

export default App;
