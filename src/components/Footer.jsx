import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Left Section - Navigation Links */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold">Quick Links</h2>
            <ul className="mt-2 space-y-1">
              <li><Link to="/" className="hover:text-gray-400">Home</Link></li>
            </ul>
          </div>

          {/* Middle Section - Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-gray-400">
              <FaLinkedin />
            </a>
          </div>

          {/* Right Section - Copyright */}
          <div className="text-center md:text-right mt-4 md:mt-0">
            <p className="text-sm">&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
