import { Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import AboutPage from "../pages/AboutPage";
import AdminPage from "../pages/AdminPage";
import BharatXLabsPage from "../pages/BharatXLabsPage";
import CareersPage from "../pages/CareersPage";
import CompanyDetailsPage from "../pages/CompanyDetailsPage";
import CompaniesPage from "../pages/CompaniesPage";
import ContactPage from "../pages/ContactPage";
import EcosystemPage from "../pages/EcosystemPage";
import HomePage from "../pages/HomePage";
import ImpactPage from "../pages/ImpactPage";
import IndustriesPage from "../pages/IndustriesPage";
import InnovationPage from "../pages/InnovationPage";
import LeadershipPage from "../pages/LeadershipPage";
import NotFoundPage from "../pages/NotFoundPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout renders <Outlet> via children — see Layout usage in App.tsx */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="companies/:slug" element={<CompanyDetailsPage />} />
        <Route path="bharatx-labs" element={<BharatXLabsPage />} />
        <Route path="ecosystem" element={<EcosystemPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="innovation" element={<InnovationPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="leadership" element={<LeadershipPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
