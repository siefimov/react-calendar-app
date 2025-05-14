import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { Header } from '../Header';
import './Layout.scss';

const pageTitles: Record<string, string> = {
  '/': 'Home',
  '/dashboard': 'Dashboard',
  '/inbox': 'Inbox',
  '/products': 'Products',
  '/invoices': 'Invoices',
  '/customers': 'Customers',
  '/chat': 'Chat Room',
  '/calendar': 'Calendar',
  '/help': 'Help Center',
  '/settings': 'Settings',
};

export const Layout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || '';

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Header />
        <main className="layout__content">
          <h2 className="layout__title">{title}</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
