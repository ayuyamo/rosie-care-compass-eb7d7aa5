import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chapters from "./pages/Chapters";
import Topics from "./pages/Topics";
import Resources from "./pages/Resources";
import BookDetails from "./pages/BookDetails";
import NotFound from "./pages/NotFound";
import Stories from "./pages/Stories";
import ResourcesDetail from "./pages/ResourcesDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AcceptableUsePolicy from "./pages/AcceptableUsePolicy";
import FirstLaunchModal from "./components/FirstLaunchModal";
import Flashcards from "./pages/Flashcards";
import FlashcardsByChapter from "./pages/FlashcardsByChapter";
import { TextSettingsProvider, useTextSettings } from './context/TextSettingsContext';
import TextAdjuster from "./components/textAdjuster";
import Layout from "./Layout";

const queryClient = new QueryClient();
const App = () => (
  <TextSettingsProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <TextAdjuster />
            <FirstLaunchModal />
            <Routes>

              <Route path="/" element={<Index />} />
              <Route path="/chapters" element={<Chapters />} />
              <Route path="/chapters/:chapterId/topics" element={<Topics />} />
              <Route path="/chapters/:chapterId/resources/detail" element={<ResourcesDetail />} />
              <Route path="/chapters/:chapterId/topics/:topicId/stories" element={<Stories />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/book-details/:bookId" element={<BookDetails />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/acceptable-use-policy" element={<AcceptableUsePolicy />} />
              <Route path="/flashcards" element={<Flashcards />} />
              <Route path="/flashcards/:chapterId" element={<FlashcardsByChapter />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </TextSettingsProvider>
);

export default App;
