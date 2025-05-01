import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer mt-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs mt-2">
          This medical information card is powered by Synapse &copy; {new Date().getFullYear()}
        </p>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <span className="material-icons text-sm text-primary">verified_user</span>
          <span className="text-xs">Secure Medical Information</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
