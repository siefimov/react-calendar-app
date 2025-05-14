import { type FC } from 'react';
import { NavLink } from 'react-router-dom';
import { menuItems } from './menuItems';
import './Sidebar.scss';

export const Sidebar: FC = () => (
  <aside className="sidebar">
    <div className="sidebar__logo">IMPEKABLE</div>
    <div className="sidebar__logo-mobile">IM</div>
    <nav className="sidebar__nav">
      <ul className="sidebar__list">
        {menuItems.map(item => (
          <li key={item.label} className="sidebar__item">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'sidebar__link active' : 'sidebar__link'
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);
