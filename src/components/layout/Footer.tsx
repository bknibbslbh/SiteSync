import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Github, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-primary-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white mb-3">
              <ClipboardCheck size={24} />
              <span className="text-xl font-semibold">SiteSync</span>
            </div>
            <p className="text-sm">
              Streamlining facility management and maintenance operations with digital logbooks and QR-based site check-ins.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-primary-300 hover:text-white transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/logbook" className="text-primary-300 hover:text-white transition-colors">Logbook</Link>
              </li>
              <li>
                <Link to="/scan" className="text-primary-300 hover:text-white transition-colors">Scan QR</Link>
              </li>
              <li>
                <Link to="/team" className="text-primary-300 hover:text-white transition-colors">Team Access</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-primary-300 hover:text-white transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-300 hover:text-white transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:support@sitesync.live" className="text-primary-300 hover:text-white transition-colors">
                  support@sitesync.live
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+15551234567" className="text-primary-300 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Github size={16} className="mr-2" />
                <a href="https://github.com/sitesync" className="text-primary-300 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-6 text-sm text-center">
          <p>&copy; {year} SiteSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;