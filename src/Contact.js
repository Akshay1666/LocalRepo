import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // store contact messages in localStorage for demo
    try {
      const raw = localStorage.getItem('contacts');
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem('contacts', JSON.stringify(arr));
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>Have a question or feedback? Send us a message and we'll get back to you.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Message
          <textarea name="message" value={form.message} onChange={handleChange} required />
        </label>
        <button type="submit" className="contact-btn">Send Message</button>
        {sent && <div className="contact-sent">Message sent — thank you!</div>}
      </form>
    </div>
  );
};

export default Contact;
