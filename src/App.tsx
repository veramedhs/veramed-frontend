import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from "./components/Services";
import ServiceDetail from "./pages/ServiceDetail";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./components/Header";
import StartYourJourney from "./pages/StartYourJourney";
import Team from "./pages/TeamPage";
import TermsAndConditionPage from "./pages/TermsAndConditionPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import MedicalDisclaimerPage from "./pages/MedicalDisclaimer";
import PatientGalleryPage from "./pages/PetientsGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/services" element={<Services />} />
          <Route path="/servicedetails/:serviceId" element={<ServiceDetail />} />
          <Route path="/start-your-journey" element={<StartYourJourney />} />
          <Route path="/meet-out-team" element={<Team />} />
          <Route path="/terms-and-condition" element={<TermsAndConditionPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/medical-desclaimar" element={<MedicalDisclaimerPage />} />
          <Route path="/patients-gallery" element={<PatientGalleryPage />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
