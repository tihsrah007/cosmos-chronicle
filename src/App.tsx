import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PinGate from "./components/PinGate";
import Index from "./pages/Index";
import GeopoliticsMap from "./pages/GeopoliticsMap";
import GeologyMap from "./pages/GeologyMap";
import HistoryMap from "./pages/HistoryMap";
import CosmologyMap from "./pages/CosmologyMap";
import ExplorePage from "./pages/ExplorePage";
import StudyBoardPage from "./pages/StudyBoardPage";
import NotFound from "./pages/NotFound";

const UniverseMap = lazy(() => import("./pages/UniverseMap"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PinGate>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/geopolitics" element={<GeopoliticsMap />} />
            <Route path="/geology" element={<GeologyMap />} />
            <Route path="/history" element={<HistoryMap />} />
            <Route path="/cosmology" element={<CosmologyMap />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/study-board" element={<StudyBoardPage />} />
            <Route path="/universe" element={<Suspense fallback={<div className="fixed inset-0 bg-background flex items-center justify-center"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}><UniverseMap /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PinGate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
