import React from 'react';

const TermsAndConditionPage: React.FC = () => {
  return (
    <section id="terms-and-conditions" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* --- Page Header (Consistent with other pages) --- */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms and
            <span className="text-primary"> Conditions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last Updated: August 1, 2025</p>
        </div>

        {/* 
          --- Content Wrapper ---
          The `prose` class from @tailwindcss/typography is used here for clean, readable
          styling of long-form text. It automatically styles h2, h3, p, ul, li, etc.
          `dark:prose-invert` ensures it looks good in dark mode.
        */}
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          
          <p className="lead">
            Welcome to VeraMed Health Solutions ("we", "our", "us"). These Terms and Conditions govern your access to and use of our medical tourism facilitation services, website, and associated applications (collectively, the "Service"). By using our Service, you agree to be bound by these terms.
          </p>
          
          <h2>1. Introduction</h2>
          <p>
            VeraMed Health Solutions acts as a facilitator, connecting patients with healthcare providers, hospitals, and clinics worldwide. We do not provide medical advice or services ourselves. All medical services are provided by independent, licensed healthcare professionals.
          </p>
          
          <h2>2. Use of Our Services</h2>
          <p>
            You agree to use our Service only for lawful purposes. You must provide accurate and complete information when requested, including your medical history and personal details. You are responsible for making the final decision on your choice of healthcare provider.
          </p>

          <h2>3. Medical Disclaimer</h2>
          <p>
            All information provided through our Service, including on our website and in communications, is for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
          
          <h2>4. Payments and Fees</h2>
          <p>
            Our facilitation fees will be clearly communicated to you. All payments for medical procedures and related expenses (such as hospital fees, travel, and accommodation) are made directly to the respective service providers (e.g., hospitals, airlines) as per their policies. We are not responsible for any issues related to payments made to third parties.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, VeraMed Health Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues. We are not liable for the actions, negligence, or malpractice of any third-party healthcare provider. Our total liability to you for any claims arising from the use of the Service is limited to the amount of the facilitation fee you paid to us.
          </p>

          <h2>6. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, and software, is the property of VeraMed Health Solutions or its content suppliers and is protected by international copyright laws.
          </p>
          
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new terms.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts located in Gurgaon, Haryana.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <ul>
            <li>Email: veramedhs@gmail.com</li>
            <li>Phone: +91-9953306560</li>
            <li>Address: Gurgaon, India</li>
          </ul>

          <div className="p-4 mt-8 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-l-4 border-yellow-500 rounded-md">
            <h4 className="font-bold">Legal Disclaimer</h4>
            <p className="!mt-2">The content provided in this document is a template and for informational purposes only. It does not constitute legal advice. You should consult with a qualified legal professional to ensure these terms are complete and compliant for your specific business needs and jurisdiction.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionPage;