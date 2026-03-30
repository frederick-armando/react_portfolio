import { NavLink } from 'react-router-dom';

import { uiContent } from '../i18n/content/ui.js';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { 
  IconHome, 
  IconProfile, 
  IconChartArea, 
  IconArchive, 
  IconMessagesSquare 
} from './icons.jsx';

const navIcons = {
  home: IconHome,
  profile: IconProfile,
  methods: IconChartArea,
  projects: IconArchive,
  contact: IconMessagesSquare,
};

const navItems = [
  { key: 'home', to: '/' },
  { key: 'profile', to: '/profil' },
  { key: 'methods', to: '/methodes' },
  { key: 'projects', to: '/projets' },
  { key: 'contact', to: '/contact' },
];

export default function BottomNav() {
  const { language } = useLanguage();
  const content = uiContent[language].bottomNav;

  return (
    <nav className="bottom-nav" aria-label={content.ariaLabel}>
      <div className="bottom-nav__inner container">
        {navItems.map((item) => {
          const Icon = navIcons[item.key];
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              <div className="nav-item__icon-wrapper" style={{ display: 'contents' }}>
                <span className="nav-item__icon">
                  <Icon />
                </span>
                {item.badge && <span className="nav-item__badge">{item.badge}</span>}
                <span className="nav-item__label">{content.items[item.key]}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
