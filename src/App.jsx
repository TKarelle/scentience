import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./page/landing";
import ArticlePage from "./page/article";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
