import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Notifications from '../ui/Notifications';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      <Notifications />
      <Footer />
    </div>
  );
};

export default Layout;