import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaUserPlus, FaUser, FaWallet, FaHamburger, FaChartBar } from 'react-icons/fa';
import styles from '../css/VendorLayout.module.css';

const navigation = [
  {
    name: 'Signup',
    to: '/vendor/signup',
    icon: FaUserPlus,
  },
  {
    name: 'Profile',
    to: '/vendor/profile',
    icon: FaUser,
  },
  {
    name: 'Payout',
    to: '/vendor/payout',
    icon: FaWallet,
  },
  {
    name: 'Menu',
    to: '/vendor/addmenu',
    icon: FaHamburger,
  },
  {
    name: 'Insights',
    to: '/vendor/insight',
    icon: FaChartBar,
  },
];

const VendorLayout = () => {
   // eslint-disable-next-line
  const location = useLocation();

  return (
    <div className={styles.layoutContainer}>
      <main className={styles.content}>
        <Outlet />
      </main>

      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name} className={styles.navItem}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  <Icon className={styles.icon} size={20} />
                  <span className={styles.label}>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default VendorLayout;
