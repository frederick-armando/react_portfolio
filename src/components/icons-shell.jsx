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
};

function IconBase({ children, className, ...props }) {
  return (
    <svg {...baseProps} className={className} {...props}>
      {children}
    </svg>
  );
}

export function IconHome(props) {
  return (
    <IconBase {...props}>
      <path d="m3 10 9-7 9 7" />
      <path d="M5 10v11h14V10" />
    </IconBase>
  );
}

export function IconUserSquare(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 18c.9-2 2.7-3 5-3s4.1 1 5 3" />
    </IconBase>
  );
}

export function IconBarChartBig(props) {
  return (
    <IconBase {...props}>
      <path d="M3 3v18h18" />
      <rect x="7" y="13" width="3" height="5" rx="1" />
      <rect x="12" y="9" width="3" height="9" rx="1" />
      <rect x="17" y="5" width="3" height="13" rx="1" />
    </IconBase>
  );
}

export function IconArchive(props) {
  return (
    <IconBase {...props}>
      <rect x="2" y="3" width="20" height="5" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 13h4" />
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

export function IconFlagUk(props) {
  return (
    <IconBase {...props}>
      <path d="M5 4v16" />
      <path d="m5 5 8 3-8 3" />
      <path d="m13 8 6-3v6l-6-3Z" />
      <path d="m5 14 8 3-8 3" />
      <path d="m13 17 6-3v6l-6-3Z" />
    </IconBase>
  );
}

export function IconBookmark(props) {
  return (
    <IconBase {...props}>
      <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
    </IconBase>
  );
}
