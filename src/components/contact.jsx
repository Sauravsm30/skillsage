// Contact.js
import React, { useState } from 'react';
import './contact.css';
import  Navbar from "./Navbar.jsx"
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., sending data to a server or displaying a success message
    console.log('Message sent:', formData);
    alert("Message sent successfully");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <><Navbar logout="true" />
    
    <div className="contact-container">
    <br />
    <br />
    <br />
   
      <h1>ABOUT US</h1>

      {/* About Our Company Section */}
      <div className="about-company">
      
        <p>
          Skillsage is a dynamic platform dedicated to connecting passionate developers and programmers from
          around the world. Our mission is to foster collaboration, facilitate skill sharing, and empower
          individuals to grow and create innovative projects together. Whether you are looking to find
          like-minded collaborators or share your expertise, Skillsage is the go-to community for
          development enthusiasts.
        </p>
      </div>

      {/* Contact Details Section */}
      <div className="contact-details">
        <h1>CONTACT US</h1>
        <p><strong>Phone:</strong> +123-456-7890</p>
        <p>
          <strong>Instagram:</strong>{' '}
          <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer">
            @your-instagram
          </a>
        </p>
        <p>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
            Your LinkedIn Profile
          </a>
        </p>
      </div>

      {/* Contact Form Section */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div></>
  );
}

export default Contact;
