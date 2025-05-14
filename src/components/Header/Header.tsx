import { type FC } from 'react';
import {
  SearchIcon,
  SupportIcon,
  BellIcon,
  ChatIcon,
  ArrowDownIcon,
} from '../Icons';

import './Header.scss';
import { Link } from 'react-router-dom';

export const Header: FC = () => (
  <header className="header">
    <div className="header__search">
      <span className="header__search-icon">
        <SearchIcon />
      </span>
      <input
        className="header__search-input"
        type="text"
        placeholder="Search transactions, invoices or help"
        aria-label="Search"
      />
    </div>
    <div className="header__right">
      <div className="header__icons">
        <Link to="" className="icon">
          <SupportIcon />
        </Link>
        <Link to="" className="icon">
          <ChatIcon />
        </Link>
        <Link to="" className="icon">
          <BellIcon />
        </Link>
        <span className="header__divider" />
      </div>
      <div className="header__user-info">
        <div>
          <span className="header__user">John Doe</span>
          <span className="icon">
            <ArrowDownIcon />
          </span>
        </div>
        <img
          className="header__avatar"
          src="/images/avatar.png"
          alt="User avatar"
        />
      </div>
    </div>
  </header>
);
