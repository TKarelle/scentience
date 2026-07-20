import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Landing = lazy(() => import("./page/landing"));
const ArticlePage = lazy(() => import("./page/article"));
const TheProcessPage = lazy(() => import("./page/TheProcessPage"));
const TheSciencePage = lazy(() => import("./page/TheSciencePage"));
const ProustMadeleineResearchPage = lazy(() =>
  import("./page/ProustMadeleineResearchPage"),
);
const JournalPage = lazy(() => import("./page/JournalPage"));
const TermsPage = lazy(() => import("./page/TermsPage"));
const ProductOriginePage = lazy(() => import("./page/ProductOriginePage"));
const OrderConfirmationPage = lazy(() => import("./page/OrderConfirmationPage"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage"));
const ContactPage = lazy(() => import("./page/ContactPage"));

function RouteFallback() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-paper pb-24 pt-28">
      <p className="text-mist font-light" aria-live="polite">
        Loading…
      </p>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/product/original-bespoke"
            element={<ProductOriginePage />}
          />
          <Route
            path="/product/origine"
            element={<Navigate to="/product/original-bespoke" replace />}
          />
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
          <Route
            path="/article/the-proust-project-how-scent-encodes-memory-forever"
            element={<Navigate to="/journal/the-proust-project" replace />}
          />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
