import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import AccessibilityWidget from './components/AccessibilityWidget.jsx';

const Profil = lazy(() => import('./pages/Profil.jsx'));
const Methodes = lazy(() => import('./pages/Methodes.jsx'));
const Projets = lazy(() => import('./pages/Projets.jsx'));
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

// Simple loading fallback
const PageLoader = () => (
  <Layout>
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader" />
    </div>
  </Layout>
);

export default function App() {
  const location = useLocation();
  let backgroundLocation = location.state?.backgroundLocation;

  if (!backgroundLocation && location.pathname.startsWith('/projets/') && location.pathname !== '/projets') {
    backgroundLocation = { pathname: '/projets', search: '', hash: '', state: null, key: 'default' };
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes location={backgroundLocation || location}>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/profil"
          element={
            <Layout>
              <Profil />
            </Layout>
          }
        />
        <Route
          path="/methodes"
          element={
            <Layout>
              <Methodes />
            </Layout>
          }
        />
        <Route
          path="/projets"
          element={
            <Layout>
              <Projets />
            </Layout>
          }
        />
        <Route
          path="/projets/:slug"
          element={
            <Layout>
              <ProjectCaseStudy />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
        </Routes>

        {backgroundLocation && (
          <Routes>
            <Route path="/projets/:slug" element={<ProjectCaseStudy isModal />} />
          </Routes>
        )}
        
        <AccessibilityWidget />
    </Suspense>
  );
}
