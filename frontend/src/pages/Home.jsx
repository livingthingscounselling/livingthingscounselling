import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import { mockData } from '../mockData';

const Home = () => {
  return (
    <div className="site-wrapper">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-large">
              High-quality counseling, made more accessible.
            </h1>
            <p className="hero-subtitle">Evidence-based, client-centered therapy. Virtual sessions available.

            </p>
            <a
              href={mockData.janeAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary">

              Book a Session
            </a>
          </div>
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="content-block">
            <h2 className="heading-1">You don't have to know exactly where to start.

            </h2>
            <p className="body-large">If something feels off, stressful, or heavy, that’s reason enough. We’ll take the time to understand what’s going on and figure out next steps together, and create a space where you will feel comfortable and supported.


            </p>
          </div>
        </div>
      </section>

      {/* Who I Work With Section */}
      <section className="section-padding section-alt">
        <div className="container container-narrow">
          <h2 className="heading-1 section-title">Who I Work With</h2>
          <p className="body-large section-intro">I work with adults and adolescents who are feeling stuck, overwhelmed, or disconnected—and who want thoughtful, professional support to move forward.


          </p>
          
          <div className="content-spacing">
            <p className="body-regular section-label">
              Common reasons people reach out include:
            </p>
            <ul className="content-list">
              <li className="body-regular">Anxiety, or feeling "off" without a clear reason</li>
              <li className="body-regular">Depression, low mood, or loss of motivation</li>
              <li className="body-regular">ADHD-related challenges, including focus, overwhelm, emotional regulation, and self-esteem</li>
              <li className="body-regular">Stress, burnout, and work-related pressure</li>
              <li className="body-regular">Life transitions, identity shifts, or major changes</li>
              <li className="body-regular">Relationship challenges or communication difficulties</li>
              <li className="body-regular">Parenting stress and family-related strain</li>
              <li className="body-regular">Trauma, difficult past experiences, or ongoing emotional patterns</li>
            </ul>
          </div>
          
          <p className="body-large">You don't need a diagnosis, a crisis, or the right words to begin. If you'd like help exploring yourself or making a change, let's talk.


          </p>
        </div>
      </section>

      {/* What Sessions Are Like Section */}
      <section className="section-padding">
        <div className="container container-narrow">
          <h2 className="heading-1 section-title">What Sessions Are Like</h2>
          <p className="body-large section-intro">
            Sessions are collaborative, practical, and focused on what matters most to you. 
            Virtual appointments are conducted via secure video platform for your privacy and convenience.
          </p>
          
          <div className="content-spacing">
            <p className="body-regular">
              Each session is 50 minutes, allowing enough time to explore what's coming up, 
              identify patterns, and work toward meaningful progress without feeling rushed.
            </p>
            
            <p className="body-regular">
              We'll start by getting a clear sense of what's bringing you in and what you'd 
              like to change. From there, we'll work together to build insight and develop 
              strategies that fit your life.
            </p>
            
            <p className="body-regular section-label">
              You can expect sessions to be:
            </p>
            <ul className="content-list">
              <li className="body-regular">Structured but flexible</li>
              <li className="body-regular">Thoughtful and conversational</li>
              <li className="body-regular">Grounded in evidence-based practice</li>
              <li className="body-regular">Respectful of your pace</li>
            </ul>
            
            <p className="body-large">
              You're not expected to perform or have everything figured out. Showing up is enough.
            </p>
          </div>
        </div>
      </section>

      {/* Fees & Accessibility Section */}
      <section className="section-padding section-alt">
        <div className="container container-narrow">
          <h2 className="heading-1 section-title">Fees & Accessibility</h2>
          <p className="body-large section-intro">
            I believe access to mental health care matters. Cost shouldn't be the reason 
            someone goes without support.
          </p>
          
          <div className="content-spacing">
            <p className="body-regular">
              Sessions are priced to reflect high-quality, professional care while remaining 
              as accessible as possible. Reduced-fee sessions may be available depending on availability.
            </p>
            
            <p className="body-large">If cost or coverage is a concern, please ask about sliding scale rates.

            </p>
          </div>
        </div>
      </section>

      {/* About Background Section */}
      <section className="section-padding">
        <div className="container container-narrow">
          <div className="about-content-wrapper">
            <h2 className="heading-1 section-title">About My Background</h2>
            <p className="body-large about-text">I'm a Registered Social Worker (MSW) with over 16 years of experience in mental health care. My work is grounded in trauma-informed, evidence-based practices such as Cognitive Behavioral and Narrative Therapies, with a focus on practical, meaningful change.



            </p>
            <div className="about-image-container">
              <img
                src="https://customer-assets.emergentagent.com/job_calm-counseling-4/artifacts/h3s0azab_DSC08408-Edit.jpg"
                alt="Professional headshot"
                className="about-image" />

            </div>
          </div>
        </div>
      </section>

      {/* Province & Licensing Section */}
      <section className="section-padding-small section-alt">
        <div className="container container-narrow">
          <h2 className="heading-2 section-title">Province & Licensing</h2>
          <p className="body-regular">
            I provide virtual counseling in jurisdictions where I am registered and permitted 
            to practice. Availability may vary by province.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2 className="heading-1">Ready to get started?</h2>
            <a
              href={mockData.janeAppBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary">

              Book a Session
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>);

};

export default Home;