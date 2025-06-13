import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import { FileText, AlertTriangle, Scale, Users, Shield, Gavel } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 2024</p>
          </div>

          <div className="space-y-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <FileText size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Agreement to Terms</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of the SiteSync application and services 
                  provided by our company. By accessing or using our service, you agree to be bound by these Terms. 
                  If you disagree with any part of these terms, then you may not access the service.
                </p>
              </CardBody>
            </Card>

            {/* Acceptable Use */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Users size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Acceptable Use</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">You agree to use SiteSync only for:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Legitimate facility management and maintenance activities</li>
                    <li>Recording accurate site visit information</li>
                    <li>Compliance with safety and regulatory requirements</li>
                    <li>Professional business purposes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">You agree NOT to:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Provide false or misleading information</li>
                    <li>Use the service for any unlawful purpose</li>
                    <li>Attempt to gain unauthorized access to any part of the service</li>
                    <li>Interfere with or disrupt the service or servers</li>
                    <li>Share your account credentials with others</li>
                    <li>Use the service to harass, abuse, or harm others</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            {/* User Accounts */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Shield size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">User Accounts and Security</h2>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>You are responsible for all activities that occur under your account</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                  <li>Account access may be provided through your organization's administrator</li>
                </ul>
              </CardBody>
            </Card>

            {/* Data and Privacy */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Data and Privacy</h2>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Your use of the service is also governed by our Privacy Policy</li>
                  <li>You grant us the right to use and store the data you provide for service operation</li>
                  <li>You are responsible for ensuring you have the right to share any information you provide</li>
                  <li>We may share visit data with facility owners and your organization as necessary</li>
                  <li>You acknowledge that site visit records may be subject to legal and regulatory requirements</li>
                </ul>
              </CardBody>
            </Card>

            {/* Service Availability */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <AlertTriangle size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Service Availability</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We strive to provide reliable service, but we cannot guarantee uninterrupted access:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>The service may be temporarily unavailable for maintenance or updates</li>
                  <li>We are not liable for any downtime or service interruptions</li>
                  <li>We reserve the right to modify or discontinue features with notice</li>
                  <li>Critical updates may be applied without advance notice for security purposes</li>
                </ul>
              </CardBody>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Scale size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Intellectual Property</h2>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>The SiteSync application and all related content are our intellectual property</li>
                  <li>You may not copy, modify, distribute, or reverse engineer our software</li>
                  <li>You retain ownership of the data you input into the system</li>
                  <li>Any feedback or suggestions you provide may be used to improve our service</li>
                  <li>Third-party content and trademarks remain the property of their respective owners</li>
                </ul>
              </CardBody>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Gavel size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Limitation of Liability</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>We provide the service "as is" without warranties of any kind</li>
                  <li>We are not liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid for the service</li>
                  <li>You use the service at your own risk</li>
                  <li>We are not responsible for decisions made based on data in the system</li>
                </ul>
              </CardBody>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Termination</h2>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Either party may terminate this agreement at any time</li>
                  <li>We may suspend or terminate your access for violations of these terms</li>
                  <li>Upon termination, your right to use the service ceases immediately</li>
                  <li>Data retention after termination is subject to our Privacy Policy and legal requirements</li>
                  <li>Provisions regarding liability and intellectual property survive termination</li>
                </ul>
              </CardBody>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Changes to Terms</h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of significant 
                  changes via email or through the application. Your continued use of the service after changes 
                  are posted constitutes acceptance of the new terms.
                </p>
              </CardBody>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Governing Law</h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                  without regard to its conflict of law provisions. Any disputes arising from these terms or your 
                  use of the service shall be resolved in the courts of [Your Jurisdiction].
                </p>
              </CardBody>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> legal@sitesync.live</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Legal Street, Terms City, TC 12345</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;