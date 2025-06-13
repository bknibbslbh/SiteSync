import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 2024</p>
          </div>

          <div className="space-y-6">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Shield size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Our Commitment to Privacy</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed">
                  At SiteSync, we take your privacy seriously. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you use our digital site logbook application. 
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy 
                  policy, please do not access the application.
                </p>
              </CardBody>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Database size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company or organization affiliation</li>
                    <li>Professional role and credentials</li>
                    <li>Profile picture (if provided)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Site Visit Data</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Check-in and check-out timestamps</li>
                    <li>Site locations and facility information</li>
                    <li>Purpose of visit and work performed</li>
                    <li>Notes and observations</li>
                    <li>Photos or documents uploaded (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Information</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Device information and browser type</li>
                    <li>IP address and location data</li>
                    <li>Usage patterns and application interactions</li>
                    <li>Error logs and performance data</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Eye size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
                </div>
              </CardHeader>
              <CardBody>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>To provide and maintain our facility management services</li>
                  <li>To track and record site visits for compliance and safety purposes</li>
                  <li>To generate reports and analytics for facility management</li>
                  <li>To communicate with you about your account and service updates</li>
                  <li>To improve our application and develop new features</li>
                  <li>To ensure security and prevent unauthorized access</li>
                  <li>To comply with legal obligations and regulatory requirements</li>
                </ul>
              </CardBody>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Users size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Information Sharing and Disclosure</h2>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-gray-700">
                  We may share your information in the following circumstances:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>With Your Organization:</strong> Site visit data may be shared with your employer or contracting organization</li>
                  <li><strong>With Facility Owners:</strong> Visit records may be shared with the owners or managers of facilities you visit</li>
                  <li><strong>For Legal Compliance:</strong> When required by law, regulation, or legal process</li>
                  <li><strong>For Safety and Security:</strong> To protect the safety of individuals or security of facilities</li>
                  <li><strong>With Service Providers:</strong> With trusted third-party service providers who assist in operating our application</li>
                  <li><strong>In Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                </ul>
                <p className="text-gray-700 font-medium">
                  We do not sell, trade, or rent your personal information to third parties for marketing purposes.
                </p>
              </CardBody>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Lock size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Employee training on data protection practices</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </CardBody>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Globe size={20} className="text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Your Privacy Rights</h2>
                </div>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                  <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@sitesync.live" className="text-primary-600 hover:text-primary-800">
                    privacy@facilitylog.com
                  </a>
                </p>
              </CardBody>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Data Retention</h2>
              </CardHeader>
              <CardBody>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined 
                  in this privacy policy, unless a longer retention period is required or permitted by law. 
                  Site visit records may be retained for compliance, safety, and audit purposes as required 
                  by applicable regulations.
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
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@facilitylog.com</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Privacy Street, Data City, DC 12345</p>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;