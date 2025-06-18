import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Github, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-electric-900 via-electric-800 to-electric-700 text-electric-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white mb-3">
              <div className="p-1 rounded-lg bg-white/20 backdrop-blur-sm">
                <ClipboardCheck size={24} />
              </div>
              <span className="text-xl font-bold">SiteSync</span>
            </div>
            <p className="text-sm text-electric-200">
              Streamlining facility management and maintenance operations with digital logbooks and QR-based site check-ins.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-electric-300 hover:text-white transition-colors hover:underline">Dashboard</Link>
              </li>
              <li>
                <Link to="/logbook" className="text-electric-300 hover:text-white transition-colors hover:underline">Logbook</Link>
              </li>
              <li>
                <Link to="/scan" className="text-electric-300 hover:text-white transition-colors hover:underline">Scan QR</Link>
              </li>
              <li>
                <Link to="/team" className="text-electric-300 hover:text-white transition-colors hover:underline">Team Access</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-electric-300 hover:text-white transition-colors hover:underline">Help Center</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-electric-300 hover:text-white transition-colors hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-electric-300 hover:text-white transition-colors hover:underline">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h4 className="text-white font-medium mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="p-1 rounded bg-white/20 mr-2">
                  <Mail size={14} />
                </div>
                <a href="mailto:support@sitesync.live" className="text-electric-300 hover:text-white transition-colors hover:underline">
                  support@sitesync.live
                </a>
              </li>
              <li className="flex items-center">
                <div className="p-1 rounded bg-white/20 mr-2">
                  <Phone size={14} />
                </div>
                <a href="tel:+15551234567" className="text-electric-300 hover:text-white transition-colors hover:underline">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <div className="p-1 rounded bg-white/20 mr-2">
                  <Github size={14} />
                </div>
                <a href="https://github.com/sitesync" className="text-electric-300 hover:text-white transition-colors hover:underline" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-electric-600/50 mt-8 pt-6 text-sm text-center">
          <p className="text-electric-200">&copy; {year} SiteSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;