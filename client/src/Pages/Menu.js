import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/UI/menuCard';
import Dropdown from '../components/UI/dropdown'; // Import the Dropdown component
import styles from '../css/Menu.module.css';

const Menu = () => {
  const [selectedType, setSelectedType] = useState('all');

  // Sample data
  const vendors = [
    { id: 1, name: 'Sweet Treats', type: 'Ice Cream', rating: 4.5 },
    { id: 2, name: 'Dragon Palace', type: 'Chinese Cuisines', rating: 4.8 },
    { id: 3, name: 'African Delights', type: 'African Food', rating: 4.7 },
    { id: 4, name: 'Craft Beer Co', type: 'Alcohol Beverages', rating: 4.6 },
    { id: 5, name: 'Fresh Bakes', type: 'Bakery Delight', rating: 4.9 },
  ];

  const weeklyPicks = vendors.filter((v) => v.rating >= 4.8);

  return (
    <div className={`${styles.container}`}>
      {/* Vendor Type Filter */}
      <div className={styles.filterContainer}>
        <Dropdown
          onChange={setSelectedType} // Pass setSelectedType to handle selection
          options={[
            { value: 'all', label: 'All Vendors' },
            { value: 'Ice Cream', label: 'Ice Cream' },
            { value: 'Alcohol Beverages', label: 'Alcohol Beverages' },
            { value: 'Chinese Cuisines', label: 'Chinese Cuisines' },
            { value: 'African Food', label: 'African Food' },
            { value: 'Bakery Delight', label: 'Bakery Delight' },
          ]}
          defaultValue="all"
          placeholder="Select vendor type"
        />
      </div>

      {/* Picks of the Week */}
      <section className={styles.sectionWrap}>
        <h2 className={styles.sectionTitle}>Picks of the Week</h2>
        <div className={styles.gridContainer}>
          {weeklyPicks.map((vendor) => (
            <Card key={vendor.id} className={styles.cardHover}>
              <CardHeader>
                <CardTitle>{vendor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={styles.vendorType}>{vendor.type}</p>
                <p className={styles.vendorRating}>Rating: {vendor.rating}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Vendors */}
      <section>
        <h2 className={styles.sectionTitle}>All Vendors</h2>
        <div className={styles.gridContainer}>
          {vendors
            .filter((vendor) => selectedType === 'all' || vendor.type === selectedType)
            .map((vendor) => (
              <Card key={vendor.id} className={styles.cardHover}>
                <CardHeader>
                  <CardTitle>{vendor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={styles.vendorType}>{vendor.type}</p>
                  <p className={styles.vendorRating}>Rating: {vendor.rating}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
