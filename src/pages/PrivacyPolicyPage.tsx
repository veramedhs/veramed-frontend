import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <section id="privacy-policy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* --- Page Header (Consistent with other pages) --- */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy
            <span className="text-primary"> Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your privacy is critically important to us.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last Updated: August 1, 2025</p>
        </div>

        {/* 
          --- Content Wrapper ---
          The `prose` class from @tailwindcss/typography styles the long-form text.
        */}
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          
          <p className="lead">
            VeraMed Health Solutions ("we", "our", "us") is committed to protecting the privacy and security of your personal and health information. This Privacy Policy describes how we collect, use, process, and disclose your information in conjunction with your access to and use of our medical tourism facilitation services.
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, information from third-party healthcare providers, and information that is automatically collected when you use our services.
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> This includes your name, email address, phone number, passport details, address, and payment information.
            </li>
            <li>
              <strong>Medical Information:</strong> This includes your medical history, diagnostic reports, images, treatment plans, and other health-related data necessary to facilitate medical services. This is treated as highly sensitive data.
            </li>
            <li>
              <strong>Technical Information:</strong> We may collect information about your device and how you use our website, such as your IP address, browser type, and pages visited.
            </li>
          </ul>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our services.</li>
            <li>Connect you with and transfer your information to partner hospitals and healthcare providers for consultation and treatment.</li>
            <li>Process payments and manage your bookings (flights, accommodation, etc.).</li>
            <li>Communicate with you, respond to inquiries, and provide customer support.</li>
            <li>Improve and personalize our services and website experience.</li>
            <li>Comply with legal obligations and regulations.</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information. We may share your information only in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Healthcare Providers:</strong> We share your personal and medical information with your chosen hospitals, clinics, and doctors to arrange for your treatment.
            </li>
            <li>
              <strong>Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf, such as travel agencies, hotels, and payment processors.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
            </li>
          </ul>
          
          <h2>4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. We use encryption, access controls, and secure servers to protect your data. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>

          <h2>5. Your Rights and Choices</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, including the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request that we correct any inaccurate information.</li>
            <li>Request that we delete your personal information.</li>
            <li>Object to or restrict the processing of your information.</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the details below.
          </p>
          
          <h2>6. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
          </p>
          <ul>
            <li>Email: veramedhs@gmail.com</li>
            <li>Phone: +91-9953306560</li>
            <li>Address: Gurgaon, India</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;