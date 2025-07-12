import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-pink-600 mb-4">
            We'd Love to Hear From You
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Whether you have questions about our services or need assistance, our team is ready to help
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-8 h-full">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                Get in Touch
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300 shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-8 h-full">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaMapMarkerAlt className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Our Office</h4>
                    <p className="text-gray-600">123 Love Lane, Boyra<br />Khulna-9000, Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaPhoneAlt className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <p href="tel:+8801912345678" className="hover:text-pink-600 transition-colors">+880 1316034237</p>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaEnvelope className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <p href="mailto:info@khulnamatrimony.com" className="hover:text-pink-600 transition-colors">rantumondal06@gmail.com</p>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <FaClock className="text-pink-600 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Working Hours</h4>
                    <p className="text-gray-600">
                      Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                      Friday: 9:00 AM - 1:00 PM<br />
                      Saturday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://www.facebook.com/rantu.0066/" className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                    <FaFacebookF />
                  </a>
                  <a href="https://www.instagram.com/rantu.0066/" className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                    <FaInstagram />
                  </a>
                  <a href="https://www.linkedin.com/in/rantubytes/" className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-colors">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58949.6927746595!2d89.5278464!3d22.8456416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb47152f%3A0xf04b21288f62324e!2sKhulna!5e0!3m2!1sen!2sbd!4v1623861282932!5m2!1sen!2sbd" 
            width="100%" 
            height="450" 
            style={{border:0}}
            allowFullScreen="" 
            loading="lazy"
            title="Our Location in Khulna"
            className="filter grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;