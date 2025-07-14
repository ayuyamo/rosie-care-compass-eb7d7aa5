import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chapters from "./pages/Chapters";
import Topics from "./pages/Topics";
import Chat from "./pages/Chat";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import BookDetails from "./pages/BookDetails";
import PoemsCollection from "./pages/PoemsCollection";
import NotFound from "./pages/NotFound";
import Stories from "./pages/Stories";
import ResourcesDetail from "./pages/ResourcesDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/chapters/:chapterId/topics" element={<Topics />} />
          <Route path="/chapters/:chapterId/resources/detail" element={<ResourcesDetail />} />
          <Route path="/chapters/:chapterId/topics/:topicId/stories" element={<Stories />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/book-details/:bookId" element={<BookDetails />} />
          {/* <Route path="/poems-collection" element={<PoemsCollection />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
