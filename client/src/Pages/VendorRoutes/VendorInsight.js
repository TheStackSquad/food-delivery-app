//src/Pages/VendorRoutes/VendorPayout.js
import React, { useState } from 'react';
import { LuFilter, LuExternalLink, LuChevronDown, LuStar } from 'react-icons/lu';
import styles from '../../css/VendorInsight.module.css';

const VendorInsight = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isPopularItemsExpanded, setIsPopularItemsExpanded] = useState(false);

  const stats = [
    { label: 'Total Orders', value: '0' },
    { label: 'Total Amount', value: '₦0' },
    { label: 'Average Order Amount', value: '₦0' },
  ];

  const ratings = ['All', '5 Star', '4 Star', '3 Star', '2 Star', '1 Star'];

  const StatCard = ({ label, value }) => (
    <div className={styles.card}>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardValue}>{value}</div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.insightContainer}>
      <h1 className={styles.header}>Insights</h1>

      <section className={styles.statsContainer}>
        <div className={styles.statsHeader}>
          <h2 className={styles.statsTitle}>Stats</h2>
          <button className={styles.filterButton}>
            <LuFilter size={20} />
            Filter
          </button>
        </div>
        <div className={styles.cardContainer}>
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.sectionHeader} ${isPopularItemsExpanded ? styles.expanded : ''}`}>
          <h2 className={styles.sectionTitle}>Most Popular Items</h2>
          <button 
            onClick={() => setIsPopularItemsExpanded(!isPopularItemsExpanded)}
            className={styles.filterButton}
          >
            <LuChevronDown className={styles.chevronIcon} size={20} />
          </button>
        </div>
        {/* Popular items content would go here */}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button className={styles.filterButton}>
              <LuFilter size={20} />
              Filter
            </button>
            <button className={styles.exportButton}>
              <LuExternalLink size={20} />
              Export
            </button>
          </div>
        </div>

        <div className={styles.ratingContainer}>
          <div className={styles.ratingLeft}>
            <div className={styles.starRating}>
              <LuStar size={24} fill="currentColor" />
              Your Rating
            </div>
          </div>
          <div className={styles.ratingRight}>
            <div className={styles.starRating}>
              {[...Array(5)].map((_, i) => (
                <LuStar key={i} size={24} fill="currentColor" />
              ))}
              0.0
            </div>
            <div>No ratings yet</div>
          </div>
        </div>

        <div className={styles.filterContainer}>
          {ratings.map((rating) => (
            <button
              key={rating}
              className={`${styles.filterButton} ${
                activeFilter === rating ? styles.active : ''
              }`}
              onClick={() => setActiveFilter(rating)}
            >
              {rating} {rating !== 'All' && '(0)'}
            </button>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default VendorInsight;
