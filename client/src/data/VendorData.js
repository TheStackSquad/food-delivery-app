// src/data/vendorData.js
import {
  MdDeliveryDining, 
  MdStorefront,
  MdBusinessCenter
} from 'react-icons/md';
import { 
  FaWallet, 
  FaHeadset, 
  FaAward,
  FaUserFriends, 
  FaRoute 
} from 'react-icons/fa';
import { BiRestaurant } from 'react-icons/bi';

const vendorData = {
    liTags: [
      { 
        id: 1, 
        title: 'Restaurant Delivery',
      },
      { 
        id: 2, 
        title: 'Pickup',
      },
      { 
        id: 3, 
        title: 'Grocery & More',
      },
      { 
        id: 4, 
        title: 'Best Selection',
      },
      { 
        id: 5, 
        title: 'Cancel Anytime',
      },
      {
        id: 6,
        title: 'Express Delivery',
      },
      {
        id: 7,
        title: 'Reward Points',
      }
    ],
    cardContent: [
      { 
        id: 1, 
        icon: BiRestaurant,
        headerText: "For Restaurants",
        content: "Join our network and reach thousands of hungry customers! Boost your sales by 50% or more.",
        features: [
          "Smart delivery logistics",
          "Real-time order tracking",
          "Dedicated support team",
          "Performance analytics"
        ]
      },
      { 
        id: 2, 
        icon: FaRoute,
        headerText: "For Drivers",
        content: "Be your own boss! Flexible hours, great earnings, and instant payouts.",
        features: [
          "Choose your schedule",
          "Earn competitive rates",
          "Weekly bonuses",
          "Support at every step"
        ]
      },
      { 
        id: 3, 
        icon: MdStorefront,
        headerText: "For Merchants",
        content: "Transform your store into a digital powerhouse. Reach more customers, sell more products.",
        features: [
          "Easy inventory management",
          "Automated dispatch",
          "Sales analytics",
          "Marketing tools"
        ]
      },
      {
        id: 4,
        icon: FaUserFriends,
        headerText: "For Customers",
        content: "Your cravings, our mission. Experience food delivery at its finest.",
        features: [
          "Live order tracking",
          "24/7 customer support",
          "Exclusive deals",
          "Loyalty rewards"
        ]
      },
      {
        id: 5,
        icon: MdBusinessCenter,
        headerText: "Business Solutions",
        content: "Corporate accounts, catering services, and bulk orders made easy.",
        features: [
          "Dedicated account manager",
          "Customized ordering",
          "Flexible billing",
          "Special rates"
        ]
      }
    ],
    features: {
      delivery: {
        icon: MdDeliveryDining,
        items: [
          "Real-time GPS tracking",
          "Contactless delivery option",
          "Special delivery instructions",
          "Scheduled deliveries"
        ]
      },
      payment: {
        icon: FaWallet,
        items: [
          "Secure payment processing",
          "Multiple payment options",
          "Split bill feature",
          "Digital receipts"
        ]
      },
      support: {
        icon: FaHeadset,
        items: [
          "24/7 customer service",
          "Live chat support",
          "Easy refund process",
          "Order history"
        ]
      },
      rewards: {
        icon: FaAward,
        items: [
          "Points on every order",
          "Special member discounts",
          "Birthday rewards",
          "Referral bonuses"
        ]
      }
    }
  };
  
  export default vendorData;