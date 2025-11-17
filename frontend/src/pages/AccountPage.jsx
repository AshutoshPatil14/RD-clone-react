import React from 'react';
import { Outlet } from 'react-router-dom';
import AccountSidebar from '../components/AccountSidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/my-account.css";

const AccountPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="my-account-container">
          <AccountSidebar />
          <div className="right-section">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AccountPage;