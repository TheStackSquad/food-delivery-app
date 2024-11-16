// src/Pages/RiderRoutes/RiderPayout.js
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/UI/payoutCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FaStar, FaMotorcycle, FaMoneyBillWave, FaTrophy } from 'react-icons/fa';
import { BiTrendingUp } from 'react-icons/bi';
import styles from '../../css/RiderPayout.module.css';

// Sample data - In a real app, this would come from props or API
const earningsData = [
  { date: '1 Feb', earnings: 120 },
  { date: '8 Feb', earnings: 145 },
  { date: '15 Feb', earnings: 180 },
  { date: '22 Feb', earnings: 165 },
  { date: '1 Mar', earnings: 190 }
];

const statsData = {
  totalEarnings: 800,
  deliveryCount: 42,
  averageRating: 4.8,
  totalTips: 120,
  completionRate: 98
};

const RiderPayout = () => {
  return (
    <div className={styles.container}>
      {/* Earnings Section */}
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.title}>
            <FaMoneyBillWave className={styles.iconGreen} />
            Monthly Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.grid}>
            {/* Total Earnings Display */}
            <div className={styles.earningsDisplay}>
              <div className={styles.totalEarnings}>
                ${statsData.totalEarnings.toLocaleString()}
              </div>
              <div className={styles.statGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Deliveries</div>
                  <div className={styles.statValue}>
                    <FaMotorcycle />
                    {statsData.deliveryCount}
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Tips</div>
                  <div className={styles.statValue}>${statsData.totalTips}</div>
                </div>
              </div>
            </div>

            {/* Earnings Chart */}
            <div className={styles.chart}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Section */}
      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className={styles.title}>
            <FaTrophy className={styles.iconYellow} />
            Performance Rating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.grid}>
            {/* Star Rating Display */}
            <div className={styles.performanceDisplay}>
              <div className={styles.ratingDisplay}>
                <div className={styles.ratingValue}>{statsData.averageRating}</div>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(statsData.averageRating) ? styles.starFilled : styles.starEmpty}
                    />
                  ))}
                </div>
              </div>

              {/* Performance Stats */}
              <div className={styles.statGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Completion Rate</div>
                  <div className={styles.statValue}>
                    <BiTrendingUp className={styles.iconGreen} />
                    {statsData.completionRate}%
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Total Reviews</div>
                  <div className={styles.statValue}>{statsData.deliveryCount}</div>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className={styles.achievements}>
              <h3 className={styles.badgeTitle}>Achievements</h3>
              <div className={styles.badgeGrid}>
                <div className={styles.badge}>
                  <FaTrophy className={styles.iconGreen} />
                  <span>Top Rated</span>
                </div>
                <div className={styles.badge}>
                  <FaMotorcycle className={styles.iconBlue} />
                  <span>Speed King</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiderPayout;
