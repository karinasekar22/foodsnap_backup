import React from 'react';
import LayoutOwner from './components/LayoutOwner';
import OwnerDashboard from './components/ManageRestorant';

const OwnerDashboardPage = () => {
  return (
    <LayoutOwner>
      <OwnerDashboard />
    </LayoutOwner>
  );
};

export default OwnerDashboardPage;