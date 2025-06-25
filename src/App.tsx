
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Stories from "./pages/Stories";
import TopicSections from "./pages/TopicSections";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import BookDetails from "./pages/BookDetails";
import PoemsCollection from "./pages/PoemsCollection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/topic/:topicId/sections" element={<TopicSections />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/poems-collection" element={<PoemsCollection />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
