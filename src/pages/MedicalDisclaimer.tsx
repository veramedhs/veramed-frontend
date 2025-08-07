import React from 'react';

const MedicalDisclaimerPage: React.FC = () => {
  return (
    <section id="medical-disclaimer" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* --- Page Header (Consistent with other pages) --- */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Medical
            <span className="text-primary"> Disclaimer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Important information regarding the scope and limitations of our services.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last Updated: August 1, 2025</p>
        </div>

        {/* 
          --- Content Wrapper ---
          The `prose` class from @tailwindcss/typography styles the long-form text.
        */}
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          
          <p className="lead">
            The information provided by VeraMed Health Solutions ("we", "our", "us") on our website and through our services is for informational and facilitation purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          
          <h2>1. Not Medical Advice</h2>
          <p>
            VeraMed Health Solutions is a medical tourism facilitator, not a healthcare provider. We do not employ doctors, nurses, or any medical professionals. The content on this site, including text, graphics, images, and other material, is not intended to be medical advice. You should not rely on this information as an alternative to medical advice from your doctor or other professional healthcare provider.
          </p>
          
          <h2>2. No Doctor-Patient Relationship</h2>
          <p>
            Your use of our Service does not create a doctor-patient relationship between you and VeraMed Health Solutions or any of its employees. All medical services are provided by independent hospitals, clinics, and medical professionals ("Third-Party Providers") who are not employed by or affiliated with us.
          </p>

          <h2>3. Third-Party Providers</h2>
          <p>
            While we facilitate connections to a network of Third-Party Providers, we do not endorse, recommend, or guarantee the quality, outcomes, or services of any specific provider. The responsibility for your medical care rests solely with the healthcare professionals you engage with. We are not liable for any professional negligence, malpractice, or unsatisfactory outcomes of the treatment provided by these Third-Party Providers.
          </p>
          
          <h2>4. User Responsibility</h2>
          <p>
            You are solely responsible for your decision to obtain medical treatment. We strongly encourage you to conduct your own research and consult with your local physician before making any decisions about medical travel or treatment. Always seek the advice of a qualified health provider with any questions you may have regarding a medical condition.
          </p>

          <h2>5. Emergency Situations</h2>
          <p>
            <strong>Do not use our Service for medical emergencies.</strong> If you are experiencing a medical emergency, you should immediately call your local emergency number or seek care from the nearest emergency room or qualified healthcare provider. Do not delay seeking professional medical advice because of information you have read or received through our Service.
          </p>
          
          <h2>6. Acceptance of Disclaimer</h2>
          <p>
            By using our services, you acknowledge and agree that you have read, understood, and accepted the terms of this Medical Disclaimer. You agree that VeraMed Health Solutions bears no responsibility for the medical treatment or advice you receive from Third-Party Providers.
          </p>
          
          <div className="p-4 mt-8 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-l-4 border-red-500 rounded-md">
            <h4 className="font-bold">Crucial Acknowledgment</h4>
            <p className="!mt-2">This website does not provide medical advice. The information is for educational and facilitation purposes only. Consult a licensed medical professional for any health concerns.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedicalDisclaimerPage;