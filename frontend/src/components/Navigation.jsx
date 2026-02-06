import React from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../mockData';

export const Navigation = () => {
  return (
    <nav className="navigation-header">
      <div className="container">
        <div className="navigation-content">
          <Link to="/" className="navigation-logo">
            {mockData.practiceInfo.name}
          </Link>
          
          <div className="navigation-utilities">
            <a 
              href={mockData.janeAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Session
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
