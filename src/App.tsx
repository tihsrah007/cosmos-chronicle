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
import PulsePage from "./pages/PulsePage";
import NotFound from "./pages/NotFound";

const UniverseMap = lazy(() => import("./pages/UniverseMap"));
const TopicHubPage = lazy(() => import("./pages/TopicHubPage"));
const TopicsIndexPage = lazy(() => import("./pages/TopicsIndexPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const TrailsPage = lazy(() => import("./pages/TrailsPage"));

const queryClient = new QueryClient();

const LazyFallback = () => (
  <div className="fixed inset-0 bg-background flex items-center justify-center">
    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
            <Route path="/pulse" element={<PulsePage />} />
            <Route path="/topics" element={<Suspense fallback={<LazyFallback />}><TopicsIndexPage /></Suspense>} />
            <Route path="/topics/:slug" element={<Suspense fallback={<LazyFallback />}><TopicHubPage /></Suspense>} />
            <Route path="/compare" element={<Suspense fallback={<LazyFallback />}><ComparePage /></Suspense>} />
            <Route path="/notes" element={<Suspense fallback={<LazyFallback />}><NotesPage /></Suspense>} />
            <Route path="/trails" element={<Suspense fallback={<LazyFallback />}><TrailsPage /></Suspense>} />
            <Route path="/universe" element={<Suspense fallback={<LazyFallback />}><UniverseMap /></Suspense>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PinGate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
