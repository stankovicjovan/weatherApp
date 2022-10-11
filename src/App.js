import "./App.css";
import MainPage from "./components/MainPage";
import DetailPage from "./components/DetailPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/detail-page/:dateId" element={<DetailPage />} />
        <Route path="*" element={<div>not-found</div>} />
      </Routes>
    </>
  );
}

export default App;
