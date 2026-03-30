import { m } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CarFront,
  ChartArea,
  ChartColumn,
  CircleDot,
  Cloud,
  Cog,
  ClipboardType,
  CodeXml,
  LibraryBig,
  Database,
  Download,
  ExternalLink,
  Figma,
  FolderKanban,
  Hammer,
  House,
  IdCard,
  KeySquare,
  Languages,
  LayoutGrid,
  Linkedin,
  Github,
  Mail,
  Menu,
  MessageSquare,
  MessageSquareMore,
  Mic,
  NotebookText,
  PencilRuler,
  Pause,
  Play,
  Settings,
  Search,
  Smartphone,
  SquareDashedKanban,
  SquareKanban,
  StickyNote,
  Ticket,
  Twitter,
  User,
  Users,
  Phone,
  Webcam,
  Youtube,
  Archive,
  SquareUser,
  ChartBarBig,
  MessagesSquare,
  BotMessageSquare,
  Truck,
  Bookmark,
  Waypoints,
  X,
} from 'lucide-react';

const baseProps = {
  size: 20,
  strokeWidth: 2,
  'aria-hidden': true,
};

const transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // Cubic bezier for smooth motion
};

const pathVariants = {
  initial: { pathLength: 1, opacity: 1 },
  animate: { pathLength: [0, 1], opacity: [0, 1] },
};

const interactiveIconProps = {
  initial: 'initial',
  whileHover: 'animate',
  whileTap: 'animate',
  whileFocus: 'animate',
};

// Specific implementations for high-impact icons using the lucide-animated pattern
export const IconHome = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <m.path
      d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconProfile = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <m.path
      d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
      variants={pathVariants}
      transition={transition}
    />
    <m.circle
      cx="12"
      cy="11"
      r="3"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconMethod = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <m.path
      d="M13 17V9"
      variants={pathVariants}
      transition={transition}
    />
    <m.path
      d="M18 17V5"
      variants={pathVariants}
      transition={transition}
    />
    <m.path
      d="M3 17v-3"
      variants={pathVariants}
      transition={transition}
    />
    <m.path
      d="M8 17V11"
      variants={pathVariants}
      transition={transition}
    />
    <path d="M18 21H3" />
  </m.svg>
);

export const IconPlay = withLucideScale(Play);

export const IconPause = withLucideScale(Pause);

export const IconYouTube = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <m.path
      d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"
      variants={pathVariants}
      transition={transition}
    />
    <m.polygon
      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconFigmaBrand = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <m.path
      d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"
      variants={pathVariants}
      transition={transition}
    />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <m.path
      d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"
      variants={pathVariants}
      transition={transition}
    />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <m.path
      d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);


export const IconArchive = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect width="20" height="5" x="2" y="3" rx="1" />
    <m.path
      d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"
      variants={pathVariants}
      transition={transition}
    />
    <m.path
      d="M10 12h4"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconMessagesSquare = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    <m.path
      d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconMail = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <m.path
      d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconPhone = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <m.path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconLinkedIn = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <m.circle
      cx="4"
      cy="4"
      r="2"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconTwitter = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <m.path
      d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconGithub = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <m.path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      variants={pathVariants}
      transition={transition}
    />
    <m.path d="M9 18c-4.51 2-5-2-7-2" variants={pathVariants} transition={transition} />
  </m.svg>
);

export const IconArrowLeft = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="m12 19-7-7 7-7" />
    <m.path
      d="M19 12H5"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconArrowRight = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="m12 5 7 7-7 7" />
    <m.path
      d="M5 12h14"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconLinkOut = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <m.path d="m15 3 6 6" variants={pathVariants} transition={transition} />
    <m.path d="M21 3v6" variants={pathVariants} transition={transition} />
    <m.path d="M15 3h6" variants={pathVariants} transition={transition} />
  </m.svg>
);

export const IconDownload = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <m.polyline
      points="7 10 12 15 17 10"
      variants={pathVariants}
      transition={transition}
    />
    <m.line
      x1="12"
      x2="12"
      y1="15"
      y2="3"
      variants={pathVariants}
      transition={transition}
    />
  </m.svg>
);

export const IconGrid = ({ ...props }) => (
  <m.svg {...baseProps} {...interactiveIconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </m.svg>
);

// Fallbacks using standard withLucide with a simple scale-up on hover for others
function withLucideScale(Component) {
  return function Icon({ ...props }) {
    return (
      <m.span
        whileHover={{ scale: 1.12, y: -1 }}
        whileTap={{ scale: 0.96, y: 0 }}
        whileFocus={{ scale: 1.12, y: -1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        style={{ display: 'inline-flex', lineHeight: 0 }}
      >
        <Component {...baseProps} {...props} />
      </m.span>
    );
  };
}

export const IconHammer = withLucideScale(Hammer);
export const IconKeySquare = withLucideScale(KeySquare);
export const IconCog = withLucideScale(Cog);
export const IconFlagUk = withLucideScale(Languages);
export const IconUser = withLucideScale(User);
export const IconChart = withLucideScale(ChartColumn);
export const IconProjects = withLucideScale(FolderKanban);
export const IconChat = withLucideScale(MessageSquareMore);
export const IconBuilding = withLucideScale(Building2);
export const IconUsers = withLucideScale(Users);
export const IconCloud = withLucideScale(Cloud);
export const IconCar = withLucideScale(CarFront);
export const IconSettings = withLucideScale(Settings);
export const IconCalendar = withLucideScale(CalendarDays);
export const IconBriefcase = withLucideScale(BriefcaseBusiness);
export const IconTicket = withLucideScale(Ticket);
export const IconMic = withLucideScale(Mic);
export const IconNote = withLucideScale(NotebookText);
export const IconCode = withLucideScale(CodeXml);
export const IconMobile = withLucideScale(Smartphone);
export const IconSection = withLucideScale(Menu);
export const IconTag = withLucideScale(CircleDot);
export const IconMessage = withLucideScale(MessageSquare);
export const IconClose = withLucideScale(X);
export const IconBookmark = withLucideScale(Bookmark);

export const IconChartArea = withLucideScale(ChartArea);
export const IconPencilRuler = withLucideScale(PencilRuler);
export const IconKanban = withLucideScale(SquareDashedKanban);
export const IconSquareKanban = withLucideScale(SquareKanban);
export const IconStickyNote = withLucideScale(StickyNote);
export const IconDatabase = withLucideScale(Database);
export const IconSearch = withLucideScale(Search);
export const IconBookCheck = withLucideScale(BookOpenCheck);
export const IconWaypoints = withLucideScale(Waypoints);
export const IconClipboardType = withLucideScale(ClipboardType);
export const IconWebcam = withLucideScale(Webcam);
export const IconFigma = withLucideScale(Figma);
export const IconLibraryBig = withLucideScale(LibraryBig);
export const IconBotMessageSquare = withLucideScale(BotMessageSquare);
export const IconTruck = withLucideScale(Truck);

// Aliases
export const IconBarChartBig = IconChartArea; // Alias for the Methods icon
export const IconUserSquare = IconProfile;
