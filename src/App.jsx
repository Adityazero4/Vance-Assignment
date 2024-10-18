import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import LandingPage from "./components/landingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
