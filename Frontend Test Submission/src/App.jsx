import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import URLShortenerPage from "./pages/URLShortenerPage";
import URLStatisticsPage from "./pages/URLStatisticsPage";
import Redirect from "./pages/Redirect";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortenerPage />} />
        <Route path="/stats" element={<URLStatisticsPage />} />
        <Route path="/:shortcode" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
