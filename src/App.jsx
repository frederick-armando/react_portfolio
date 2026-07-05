import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Button from './components/Button.jsx';
import Layout from './components/Layout.jsx';
import RouteErrorBoundary from './components/RouteErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import { CaseStudyModalSkeleton, PageSkeleton } from './components/Skeleton.jsx';
import { useLanguage } from './i18n/LanguageContext.jsx';

const Profil = lazy(() => import('./pages/Profil.jsx'));
const Methodes = lazy(() => import('./pages/Methodes.jsx'));
const Projets = lazy(() => import('./pages/Projets.jsx'));
const ProjectCaseStudy = lazy(() => import('./pages/ProjectCaseStudy.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const loadingContent = {
  fr: {
    caseStudy: "Chargement de l'étude de cas",
    errorTitle: 'Chargement interrompu',
    errorText: 'Une erreur est survenue pendant le chargement de cette section.',
    retry: 'Réessayer',
    close: 'Fermer',
  },
  en: {
    caseStudy: 'Loading case study',
    errorTitle: 'Loading interrupted',
    errorText: 'Something went wrong while loading this section.',
    retry: 'Try again',
    close: 'Close',
  },
};

function RouteLoadError({ isModal = false, onRetry }) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const content = loadingContent[language] ?? loadingContent.fr;
  const titleId = isModal ? 'route-load-error-title-modal' : 'route-load-error-title';

  const panel = (
    <section className="route-load-error" role="alert">
      <div className="route-load-error__panel">
        <h1 id={titleId}>{content.errorTitle}</h1>
        <p>{content.errorText}</p>
        <div className="route-load-error__actions">
          {isModal && (
            <Button variant="tertiary" onClick={() => navigate(-1)}>
              {content.close}
            </Button>
          )}
          <Button variant="primary" onClick={onRetry ?? (() => window.location.reload())}>
            {content.retry}
          </Button>
        </div>
      </div>
    </section>
  );

  if (!isModal) {
    return panel;
  }

  return (
    <div className="page-skeleton-modal-backdrop">
      <div
        className="page-skeleton-modal page-skeleton-modal--error"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {panel}
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const { language } = useLanguage();
  const content = loadingContent[language] ?? loadingContent.fr;
  let backgroundLocation = location.state?.backgroundLocation;

  if (!backgroundLocation && location.pathname.startsWith('/projets/') && location.pathname !== '/projets') {
    backgroundLocation = { pathname: '/projets', search: '', hash: '', state: null, key: 'default' };
  }

  return (
    <>
      <Layout>
        <RouteErrorBoundary
          resetKey={(backgroundLocation || location).key ?? (backgroundLocation || location).pathname}
          fallback={({ onRetry }) => <RouteLoadError onRetry={onRetry} />}
        >
          <Suspense fallback={<PageSkeleton route={(backgroundLocation || location).pathname} />}>
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
        </RouteErrorBoundary>
      </Layout>

      {backgroundLocation && (
        <RouteErrorBoundary
          resetKey={`modal-${location.key ?? location.pathname}`}
          fallback={({ onRetry }) => <RouteLoadError isModal onRetry={onRetry} />}
        >
          <Suspense fallback={<CaseStudyModalSkeleton label={content.caseStudy} />}>
            <Routes>
              <Route path="/projets/:slug" element={<ProjectCaseStudy isModal />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      )}
    </>
  );
}
