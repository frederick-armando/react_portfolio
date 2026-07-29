const baseProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
  tabIndex: -1,
};

function IconBase({ children, className, size, width, height, ...props }) {
  const iconWidth = width ?? size ?? baseProps.width;
  const iconHeight = height ?? size ?? baseProps.height;

  return (
    <svg
      {...baseProps}
      width={iconWidth}
      height={iconHeight}
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconHome(props) {
  return (
    <IconBase {...props}>
      <path d="M3 10a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 21v-8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8" />
    </IconBase>
  );
}

export function IconProfile(props) {
  return (
    <IconBase {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <circle cx="12" cy="11" r="3" />
    </IconBase>
  );
}

export function IconChartArea(props) {
  return (
    <IconBase {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 17V9" />
      <path d="M12 17V5" />
      <path d="M17 17v-6" />
    </IconBase>
  );
}

export function IconFolderOpen(props) {
  return (
    <IconBase {...props}>
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </IconBase>
  );
}

export function IconMessagesSquare(props) {
  return (
    <IconBase {...props}>
      <path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      <path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1" />
    </IconBase>
  );
}

export function IconDownload(props) {
  return (
    <IconBase {...props}>
      <path d="M12 15V3" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
    </IconBase>
  );
}

export function IconLanguages(props) {
  return (
    <IconBase {...props}>
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </IconBase>
  );
}

export function IconClose(props) {
  return (
    <IconBase {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </IconBase>
  );
}

export function IconPersonStanding(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="5" r="1" />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </IconBase>
  );
}

export function IconZoomIn(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </IconBase>
  );
}

export function IconZoomOut(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M8 11h6" />
    </IconBase>
  );
}

export function IconText(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7V4h16v3" />
      <path d="M9 20h6" />
      <path d="M12 4v16" />
    </IconBase>
  );
}

export function IconContrast(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a10 10 0 0 0 0 20z" />
    </IconBase>
  );
}

export function IconSun(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </IconBase>
  );
}

export function IconLink(props) {
  return (
    <IconBase {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </IconBase>
  );
}

export function IconRotateCcw(props) {
  return (
    <IconBase {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </IconBase>
  );
}

export function IconMousePointer2(props) {
  return (
    <IconBase {...props}>
      <path d="M4 4 12 20l2.1-6.1L20 12z" />
    </IconBase>
  );
}

export function IconKeyboard(props) {
  return (
    <IconBase {...props}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M6 9h.01" />
      <path d="M10 9h.01" />
      <path d="M14 9h.01" />
      <path d="M18 9h.01" />
      <path d="M8 13h8" />
      <path d="M6 13h.01" />
      <path d="M18 13h.01" />
    </IconBase>
  );
}

export function IconMousePointerClick(props) {
  return (
    <IconBase {...props}>
      <path d="M14 4.1 12 6" />
      <path d="m5.1 8-2.9-.8" />
      <path d="m6 12-1.9 2" />
      <path d="M7.2 2.2 8 5.1" />
      <path d="M9.04 9.04 15 21l1.74-4.94L22 14.3z" />
    </IconBase>
  );
}

export function IconPlay(props) {
  return (
    <IconBase {...props}>
      <polygon points="6 3 20 12 6 21 6 3" />
    </IconBase>
  );
}

export function IconChevronDown(props) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function IconChevronUp(props) {
  return (
    <IconBase {...props}>
      <path d="m18 15-6-6-6 6" />
    </IconBase>
  );
}
