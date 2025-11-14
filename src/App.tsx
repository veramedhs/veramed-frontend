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
import LeaveReviewPage from "./pages/LeaveReviewPage";
import TreatmentAndPlaning from "./pages/TreatmentAndPlaning";
import VisaAndTravel from "./pages/VisaAndTravel";
import CultureAndLanguage from "./pages/CultureAndLanguage";
import PostTreatment from "./pages/PostTreatment";
import ContactUsNow from "./pages/ContactUsNow";

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
          <Route path="/leave-review" element={<LeaveReviewPage />} />
          <Route path="/treatment-planning" element={<TreatmentAndPlaning />} />
          <Route path="/visa-travel" element={<VisaAndTravel />} />
          <Route path="/culture-language-support" element={<CultureAndLanguage />} />
          <Route path="/post-treatment" element={<PostTreatment />} />
          <Route path="/contact-us" element={<ContactUsNow />} />




        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
