import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./page/landing";
import ArticlePage from "./page/article";
import TheProcessPage from "./page/TheProcessPage";
import TheSciencePage from "./page/TheSciencePage";
import ProustMadeleineResearchPage from "./page/ProustMadeleineResearchPage";
import JournalPage from "./page/JournalPage";
import TermsPage from "./page/TermsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/the-process" element={<TheProcessPage />} />
        <Route path="/the-science" element={<TheSciencePage />} />
        <Route
          path="/science/what-is-your-proust-madeleine"
          element={<ProustMadeleineResearchPage />}
        />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/the-proust-project" element={<ArticlePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
}

export default App;
