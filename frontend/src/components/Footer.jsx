import React from 'react';
import { mockData } from '../mockData';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{mockData.practiceInfo.name}</h3>
            <p className="footer-location">{mockData.practiceInfo.location}</p>
            <p className="footer-text">{mockData.practiceInfo.credentials}</p>
            <p className="footer-text">{mockData.practiceInfo.responseTime}</p>
          </div>
          
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <p className="footer-text">Email: {mockData.contact.email}</p>
            <p className="footer-text">Phone: {mockData.contact.phone}</p>
          </div>
          
          <div className="footer-section">
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
        
        <div className="footer-bottom">
          <p className="footer-text-small">
            © {new Date().getFullYear()} {mockData.practiceInfo.name}. Professional counseling services.
          </p>
        </div>
      </div>
    </footer>
  );
};
