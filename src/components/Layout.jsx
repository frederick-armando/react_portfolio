import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';

export default function Layout({ children }) {
  return (
    <div className="app">
      <div className="mesh-gradient" aria-hidden="true">
        <span className="mesh-gradient__blob mesh-gradient__blob--one" />
        <span className="mesh-gradient__blob mesh-gradient__blob--two" />
        <span className="mesh-gradient__blob mesh-gradient__blob--three" />
      </div>
      <TopBar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
