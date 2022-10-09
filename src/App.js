import "./App.css";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/main-page" />} />
        <Route path="/main-page" element={<MainPage />} />
        <Route path="/detail-page/:dateId" element={<DetailPage />} />
        <Route path="*" element={<div>not-found</div>} />
      </Routes>
    </>
  );
}

export default App;
