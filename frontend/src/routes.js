import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SignUpUMKM from 'views/auth/registerUMKM';
import SignUpCustomer from 'views/auth/sign-up-customer';

const routes = [
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Register',
    layout: '/auth',
    path: '/register-umkm',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignUpUMKM />,
  },

  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'NFT Marketplace',
    layout: '/admin',
    path: '/nft-marketplace',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: '/profile',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
 
  {
    name: 'Sign Up Role',
    layout: '/auth',
    path: '/sign-up-role',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignUpRole />,
  },

  {
    name: 'Sign Up Customer',
    layout: '/auth',
    path: '/sign-up-customer',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignUpCustomer />,
  },

  {
    name: 'Sign Up UMKM',
    layout: '/auth',
    path: '/registerUMKM',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <SignUpUmkm />,
  },

  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: '/rtl-default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <RTL />,
  },
];

export default routes;
