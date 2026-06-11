import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./page/landing";
import ArticlePage from "./page/article";
import TheProcessPage from "./page/TheProcessPage";
import TheSciencePage from "./page/TheSciencePage";
import ProustMadeleineResearchPage from "./page/ProustMadeleineResearchPage";
import JournalPage from "./page/JournalPage";
import TermsPage from "./page/TermsPage";
import ProductOriginePage from "./page/ProductOriginePage";
import OrderConfirmationPage from "./page/OrderConfirmationPage";
import NotFoundPage from "./page/NotFoundPage";
import ContactPage from "./page/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/product/original-bespoke" element={<ProductOriginePage />} />
        <Route path="/product/origine" element={<Navigate to="/product/original-bespoke" replace />} />
        <Route path="/order/confirmation" element={<OrderConfirmationPage />} />
        <Route path="/the-process" element={<TheProcessPage />} />
        <Route path="/the-science" element={<TheSciencePage />} />
        <Route
          path="/science/what-is-your-proust-madeleine"
          element={<ProustMadeleineResearchPage />}
        />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/the-proust-project" element={<ArticlePage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
