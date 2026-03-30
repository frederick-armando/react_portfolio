import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';

export default function Layout({ children }) {
  return (
    <div className="app">
      <TopBar />
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}
