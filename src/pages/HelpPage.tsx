import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import { Search, ChevronDown, ChevronRight, HelpCircle, Book, MessageCircle, Mail } from 'lucide-react';

const HelpPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I check in to a site?",
      answer: "To check in to a site, navigate to the 'Scan QR' page and either scan the QR code at the facility entrance or manually enter the site code. Complete the check-in form with your visit details."
    },
    {
      question: "What if I forget to check out?",
      answer: "If you forget to check out, you can manually check out later by going to the Logbook page and clicking on your active entry. The system will also send reminders after 8 hours if enabled in settings."
    },
    {
      question: "How do I add a new site as an admin?",
      answer: "As an admin, go to the Admin page and click 'Add New Site'. Fill in the site name and address, and the system will automatically generate a unique QR code for that site."
    },
    {
      question: "Can I use the app offline?",
      answer: "Yes, the app supports offline mode. You can check in and out while offline, and the data will sync when you reconnect to the internet. Enable offline mode in Settings."
    },
    {
      question: "How do I export QR codes for printing?",
      answer: "In the Admin page, click the QR code icon next to any site to export the QR code as an image file that can be printed and posted at the facility entrance."
    },
    {
      question: "What information is tracked in the logbook?",
      answer: "The logbook tracks check-in/out times, site visited, engineer name, purpose of visit, work completion status, and any notes added during the visit."
    },
    {
      question: "How do I change my password?",
      answer: "Currently, password changes must be requested through your system administrator. Contact your admin or use the 'Forgot password?' link on the login page."
    },
    {
      question: "Can I add photos to my site visits?",
      answer: "Photo functionality is planned for a future update. Currently, you can add detailed notes about your visit in the check-out form."
    }
  ];

  const filteredFaqs = searchQuery.trim() 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
            <p className="text-gray-600">Find answers to common questions and get support</p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search size={18} className="text-gray-400" />}
              fullWidth
              className="max-w-md mx-auto"
            />
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/dashboard">
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardBody className="text-center p-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Book size={24} className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Guide</h3>
                  <p className="text-gray-600 text-sm">Complete guide on how to use SiteSync</p>
                </CardBody>
              </Card>
            </Link>

            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardBody className="text-center p-6">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle size={24} className="text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm">Chat with our support team in real-time</p>
              </CardBody>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardBody className="text-center p-6">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail size={24} className="text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm">Send us an email and we'll get back to you</p>
              </CardBody>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <HelpCircle size={20} className="text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              {filteredFaqs.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No FAQs found matching your search.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <h3 className="text-lg font-medium text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {expandedFaq === index ? (
                          <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronRight size={20} className="text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="mt-4 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Contact Section */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                Email us at{' '}
                <a href="mailto:support@sitesync.live" className="text-primary-600 hover:text-primary-800">
                  support@sitesync.live
                </a>
              </p>
              <p className="text-gray-600">
                Call us at{' '}
                <a href="tel:+15551234567" className="text-primary-600 hover:text-primary-800">
                  (555) 123-4567
                </a>
              </p>
              <p className="text-sm text-gray-500">
                Our support team is available Monday-Friday, 9 AM - 5 PM EST
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;