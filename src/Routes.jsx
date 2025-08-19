import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectGallery from './pages/project-gallery-case-studies';
import ServicesPortfolioShowcase from './pages/services-portfolio-showcase';
import ContactQuoteRequest from './pages/contact-quote-request';
import HomepageWith3DConstructionExperience from './pages/homepage-with-3d-construction-experience';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ContactQuoteRequest />} />
        <Route path="/project-gallery-case-studies" element={<ProjectGallery />} />
        <Route path="/services-portfolio-showcase" element={<ServicesPortfolioShowcase />} />
        <Route path="/contact-quote-request" element={<ContactQuoteRequest />} />
        <Route path="/homepage-with-3d-construction-experience" element={<HomepageWith3DConstructionExperience />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
