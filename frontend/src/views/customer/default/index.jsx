import React from 'react';
import LayoutCustomer from './components/LayoutCustomer';
import DashboardCustomer from './components/DashboardCustomer';

const CustomerDashboardPage = () => {
  return (
    <LayoutCustomer>
      <DashboardCustomer />
    </LayoutCustomer>
  );
};

export default CustomerDashboardPage;
