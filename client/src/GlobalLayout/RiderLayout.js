//src/GlobalLayout/RiderLayout.js
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { FaUserPlus, FaUser, FaWallet, FaMotorcycle, FaChartBar } from 'react-icons/fa';
import styles from '../css/VendorLayout.module.css'; // Using the same CSS module

const navigation = [
  {
    name: 'Signup',
    to: '/rider/signup',
    icon: FaUserPlus,
  },
  {
    name: 'Profile',
    to: '/rider/profile',
    icon: FaUser,
  },
  {
    name: 'Payout',
    to: '/rider/payout',
    icon: FaWallet,
  },
  {
    name: 'Deliveries',
    to: '/rider/delivery',
    icon: FaMotorcycle,
  },
  {
    name: 'Insights',
    to: '/rider/insight',
    icon: FaChartBar,
  },
];

const RiderLayout = () => {
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

export default RiderLayout;