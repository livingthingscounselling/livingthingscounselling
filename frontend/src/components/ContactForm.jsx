import React, { useState } from 'react';
import axios from 'axios';
import { mockData } from '../mockData';

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      await axios.post(`${API_BASE}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        (Array.isArray(err?.response?.data) && err.response.data[0]?.msg) ||
        'Something went wrong. Please try again or email directly.';
      setErrorMessage(typeof detail === 'string' ? detail : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-form-wrapper" data-testid="contact-form-success">
        <div className="form-success">
          <p className="success-message">
            Thank you for reaching out. {mockData.practiceInfo.responseTime}.
          </p>
          <button
            type="button"
            className="btn-secondary btn-form"
            onClick={() => setStatus('idle')}
            data-testid="contact-form-send-another-button"
            style={{ marginTop: '1rem' }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit} className="contact-form" data-testid="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Your name"
            disabled={status === 'submitting'}
            data-testid="contact-form-name-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="your.email@example.com"
            disabled={status === 'submitting'}
            data-testid="contact-form-email-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-textarea"
            placeholder="How can I help?"
            rows="5"
            disabled={status === 'submitting'}
            data-testid="contact-form-message-input"
          />
        </div>

        {status === 'error' && (
          <p
            role="alert"
            data-testid="contact-form-error"
            style={{ color: '#b91c1c', fontSize: '0.95rem', marginBottom: '1rem' }}
          >
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary btn-form"
          disabled={status === 'submitting'}
          data-testid="contact-form-submit-button"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};
