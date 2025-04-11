'use client';

import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // For development environment, just log and simulate success
      if (window.location.hostname === 'localhost') {
        console.log('Development mode - Form submitted:', formState);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        return;
      }

      // For production on Netlify
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('form-name', 'contact'); // Important for Netlify forms
      
      await fetch('/', {
        method: 'POST',
        body: formData,
      });
      
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      setError('There was a problem submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-8">Lovas Energy Services</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          {submitted ? (
            <div className="p-4 bg-green-100 text-green-800 rounded-md">
              Thank you for your message! We'll be in touch soon.
            </div>
          ) : (
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              className="flex flex-col gap-4 max-w-md"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              
              {error && (
                <div className="p-4 bg-red-100 text-red-800 rounded-md mb-4">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full p-2 border rounded text-black"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-2 border rounded text-black"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full p-2 border rounded text-black"
                  value={formState.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
} 