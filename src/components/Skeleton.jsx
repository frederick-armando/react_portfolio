import { useEffect, useState } from 'react';

export function SkeletonBlock({ className = '', style, ...props }) {
  return (
    <span
      className={`skeleton${className ? ` ${className}` : ''}`}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonImage({
  alt = '',
  className = '',
  wrapperClassName = '',
  wrapperStyle,
  skeletonClassName = '',
  imgStyle,
  onLoad,
  src,
  srcSet,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src, srcSet]);

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  return (
    <span
      className={`skeleton-image${isLoaded ? ' skeleton-image--loaded' : ''}${
        wrapperClassName ? ` ${wrapperClassName}` : ''
      }`}
      style={wrapperStyle}
      aria-busy={isLoaded ? undefined : 'true'}
    >
      <SkeletonBlock className={`skeleton-image__placeholder${skeletonClassName ? ` ${skeletonClassName}` : ''}`} />
      <img
        {...props}
        src={src}
        srcSet={srcSet}
        alt={alt}
        className={className}
        style={imgStyle}
        onLoad={handleLoad}
      />
    </span>
  );
}

function SkeletonLines({ count = 3, compact = false }) {
  return (
    <div className={`page-skeleton__lines${compact ? ' page-skeleton__lines--compact' : ''}`}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonBlock
          className="page-skeleton__line"
          key={index}
          style={{ '--skeleton-line-scale': index === count - 1 ? '0.72' : '1' }}
        />
      ))}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <section className="section page-skeleton page-skeleton--profile" aria-hidden="true">
      <div className="section__header page-skeleton__header">
        <SkeletonBlock className="page-skeleton__icon" />
        <SkeletonBlock className="page-skeleton__title" />
      </div>
      <div className="profile">
        <div className="profile__text page-skeleton__panel">
          <SkeletonBlock className="page-skeleton__subtitle" />
          <SkeletonLines count={4} />
        </div>
        <div className="profile__skills page-skeleton__panel">
          <SkeletonBlock className="page-skeleton__subtitle" />
          <div className="page-skeleton__chips">
            {Array.from({ length: 12 }, (_, index) => (
              <SkeletonBlock className="page-skeleton__chip" key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodsSkeleton() {
  return (
    <section className="section page-skeleton page-skeleton--methods" aria-hidden="true">
      <div className="section__header page-skeleton__header">
        <SkeletonBlock className="page-skeleton__icon" />
        <SkeletonBlock className="page-skeleton__title" />
      </div>
      <SkeletonBlock className="page-skeleton__wave" />
      <div className="methods-grid">
        {Array.from({ length: 5 }, (_, index) => (
          <div className="methods-card page-skeleton__panel" key={index}>
            <SkeletonBlock className="page-skeleton__subtitle" />
            <SkeletonLines count={3} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSkeleton() {
  return (
    <section className="project-showcase page-skeleton page-skeleton--projects" aria-hidden="true">
      <div className="project-showcase__content">
        <div className="project-shell project-shell--copy">
          <div className="project-showcase__copy">
            <div className="project-showcase__tags">
              <SkeletonBlock className="page-skeleton__tag" />
              <SkeletonBlock className="page-skeleton__tag" />
            </div>
            <div className="project-showcase__body">
              <SkeletonBlock className="page-skeleton__headline" />
              <SkeletonLines count={3} />
            </div>
            <div className="project-showcase__controls">
              <div className="project-pager">
                <SkeletonBlock className="page-skeleton__button-circle" />
                <SkeletonBlock className="page-skeleton__button-circle" />
                <SkeletonBlock className="page-skeleton__button-circle" />
              </div>
              <SkeletonBlock className="page-skeleton__button" />
            </div>
          </div>
        </div>
        <div className="project-shell project-shell--stage">
          <div className="project-stage page-skeleton__stage">
            <SkeletonBlock className="page-skeleton__project-card" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudySkeleton() {
  return (
    <section className="case-study-page page-skeleton page-skeleton--case-study" aria-hidden="true">
      <div className="case-study-shell">
        <div className="case-study-hero">
          <div className="case-study-hero__copy">
            <div className="case-study-hero__eyebrow">
              <SkeletonBlock className="page-skeleton__tag" />
              <SkeletonBlock className="page-skeleton__tag" />
            </div>
            <SkeletonBlock className="page-skeleton__headline" />
            <SkeletonLines count={3} />
          </div>
          <div className="case-study-hero__stage">
            <SkeletonBlock className="case-study-hero__frame page-skeleton__media" />
          </div>
        </div>
        <SkeletonBlock className="page-skeleton__summary" />
        <div className="case-study-metrics">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonBlock className="case-study-metric page-skeleton__metric" key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSkeleton() {
  return (
    <section className="section contact-page page-skeleton page-skeleton--contact" aria-hidden="true">
      <div className="section__header page-skeleton__header">
        <SkeletonBlock className="page-skeleton__icon" />
        <SkeletonBlock className="page-skeleton__title" />
      </div>
      <div className="contact-layout">
        <div className="contact-layout__intro page-skeleton__panel">
          <SkeletonBlock className="page-skeleton__subtitle" />
          <SkeletonLines count={3} />
          <div className="contact-socials">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonBlock className="page-skeleton__button-circle" key={index} />
            ))}
          </div>
        </div>
        <div className="contact-layout__details">
          <div className="contact-detail page-skeleton__panel">
            <SkeletonBlock className="page-skeleton__subtitle" />
            <SkeletonLines count={2} compact />
            <div className="contact-actions">
              <SkeletonBlock className="page-skeleton__button" />
              <SkeletonBlock className="page-skeleton__button" />
            </div>
          </div>
          <div className="contact-detail page-skeleton__panel">
            <SkeletonBlock className="page-skeleton__subtitle" />
            <SkeletonLines count={1} compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageSkeleton({ route = '' }) {
  if (route.startsWith('/profil')) return <ProfileSkeleton />;
  if (route.startsWith('/methodes')) return <MethodsSkeleton />;
  if (route === '/projets') return <ProjectsSkeleton />;
  if (route.startsWith('/projets/')) return <CaseStudySkeleton />;
  if (route.startsWith('/contact')) return <ContactSkeleton />;
  return <ProjectsSkeleton />;
}
