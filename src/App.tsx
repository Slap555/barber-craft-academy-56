import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CoursePhase1 from "./pages/CoursePhase1";
import CoursePhase2 from "./pages/CoursePhase2";
import CoursePhase3 from "./pages/CoursePhase3";
import CoursePhase4 from "./pages/CoursePhase4";
import CoursePhase5 from "./pages/CoursePhase5";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/curso/fase-1" element={<CoursePhase1 />} />
          <Route path="/curso/fase-2" element={<CoursePhase2 />} />
          <Route path="/curso/fase-3" element={<CoursePhase3 />} />
          <Route path="/curso/fase-4" element={<CoursePhase4 />} />
          <Route path="/curso/fase-5" element={<CoursePhase5 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
