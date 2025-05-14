import {
  HomeIcon,
  CalendarIcon,
  HelpIcon,
  InvoiceIcon,
  EnvelopeIcon,
  SettingsIcon,
} from '../Icons';

type MenuItem = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

export const menuItems: MenuItem[] = [
  { icon: <HomeIcon />, label: 'Home', to: '/' },
  { icon: '📊', label: 'Dashboard', to: '/dashboard' },
  { icon: <EnvelopeIcon />, label: 'Inbox', to: '/inbox' },
  { icon: '🛒', label: 'Products', to: '/products' },
  { icon: <InvoiceIcon />, label: 'Invoices', to: '/invoices' },
  { icon: '👥', label: 'Customers', to: '/customers' },
  { icon: '💬', label: 'Chat Room', to: '/chat' },
  { icon: <CalendarIcon />, label: 'Calendar', to: '/calendar' },
  { icon: <HelpIcon />, label: 'Help Center', to: '/help' },
  { icon: <SettingsIcon />, label: 'Settings', to: '/settings' },
];
