import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import { PageSkeleton } from './components/Skeleton.jsx';

const Profil = lazy(() => import('./pages/Profil.jsx'));
const Methodes = lazy(() => import('./pages/Methodes.jsx'));
const Projets = lazy(() => import('./pages/Projets.jsx'));
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  const location = useLocation();
  let backgroundLocation = location.state?.backgroundLocation;

  if (!backgroundLocation && location.pathname.startsWith('/projets/') && location.pathname !== '/projets') {
    backgroundLocation = { pathname: '/projets', search: '', hash: '', state: null, key: 'default' };
  }

  return (
    <>
      <Layout>
        <Suspense fallback={<PageSkeleton route={location.pathname} />}>
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/methodes" element={<Methodes />} />
            <Route path="/projets" element={<Projets />} />
            <Route path="/projets/:slug" element={<ProjectCaseStudy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>

      {backgroundLocation && (
        <Suspense fallback={null}>
          <Routes>
            <Route path="/projets/:slug" element={<ProjectCaseStudy isModal />} />
          </Routes>
        </Suspense>
      )}
    </>
  );
}
