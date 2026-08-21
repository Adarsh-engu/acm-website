import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema } from '../../lib/validation';
import { submitApplication } from '../../lib/api';

const JoinUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      domainsInterested: [],
      branch: '',
    }
  });

  const selectedBranch = watch('branch');
  
  // Section logic
  const requiresSection = ['CSE', 'CSM', 'CSDS'].includes(selectedBranch);
  
  let sectionOptions = [];
  if (selectedBranch === 'CSE') sectionOptions = ['A','B','C','D','E','F','G','H','I','J'];
  if (selectedBranch === 'CSM') sectionOptions = ['A','B','C','D','E'];
  if (selectedBranch === 'CSDS') sectionOptions = ['A','B','C','D'];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await submitApplication(data);
      setShowModal(true);
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset(); // Reset the form after they join the group
  };

  return (
    <section id="join-us" className="py-24 bg-acm-blue text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-display font-bold sm:text-4xl mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
          Join ACM GRIET today to get exclusive access to workshops, mentorship, and a community that pushes you to excel.
        </p>
        
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl text-left text-gray-900">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Membership Application</h3>
            <p className="text-gray-500 mt-2">Fill out the form below to apply for the student chapter.</p>
          </div>
          
          {errorMsg && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  {...register('fullName')}
                  className={`w-full rounded-md border px-3 py-2 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2`}
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input 
                  type="text" 
                  {...register('rollNumber')}
                  className={`w-full rounded-md border px-3 py-2 ${errors.rollNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2`}
                />
                {errors.rollNumber && <p className="mt-1 text-sm text-red-500">{errors.rollNumber.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                <select 
                  {...register('yearOfStudy')}
                  className={`w-full rounded-md border px-3 py-2 ${errors.yearOfStudy ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2 bg-white`}
                >
                  <option value="">Select Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                </select>
                {errors.yearOfStudy && <p className="mt-1 text-sm text-red-500">{errors.yearOfStudy.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <select 
                  {...register('branch')}
                  className={`w-full rounded-md border px-3 py-2 ${errors.branch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2 bg-white`}
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">CSE</option>
                  <option value="CSM">CSM</option>
                  <option value="CSDS">CSDS</option>
                  <option value="CSBS">CSBS</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                  <option value="CIV">CIV</option>
                </select>
                {errors.branch && <p className="mt-1 text-sm text-red-500">{errors.branch.message}</p>}
              </div>
              {requiresSection && (
                <div className="animate-in fade-in zoom-in duration-300">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select 
                    {...register('section')}
                    className={`w-full rounded-md border px-3 py-2 ${errors.section ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2 bg-white`}
                  >
                    <option value="">Select Section</option>
                    {sectionOptions.map(sec => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
                  {errors.section && <p className="mt-1 text-sm text-red-500">{errors.section.message}</p>}
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input 
                type="tel" 
                {...register('mobileNumber')}
                className={`w-full rounded-md border px-3 py-2 ${errors.mobileNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2`}
              />
              {errors.mobileNumber && <p className="mt-1 text-sm text-red-500">{errors.mobileNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domains Interested (Select 1 to 3)</label>
              <div className="flex flex-wrap gap-4">
                {['Tech', 'Event Management', 'Logistics', 'Public Relations', 'Design'].map((domain) => (
                  <label key={domain} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      value={domain}
                      {...register('domainsInterested')}
                      className="rounded text-acm-blue focus:ring-acm-blue"
                    />
                    <span className="text-sm text-gray-700">{domain}</span>
                  </label>
                ))}
              </div>
              {errors.domainsInterested && <p className="mt-1 text-sm text-red-500">{errors.domainsInterested.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">How do you know about ACM?</label>
              <textarea 
                rows="2" 
                {...register('howKnow')}
                className={`w-full rounded-md border px-3 py-2 ${errors.howKnow ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2`}
              />
              {errors.howKnow && <p className="mt-1 text-sm text-red-500">{errors.howKnow.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join ACM?</label>
              <textarea 
                rows="3" 
                {...register('whyJoin')}
                className={`w-full rounded-md border px-3 py-2 ${errors.whyJoin ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2`}
              />
              {errors.whyJoin && <p className="mt-1 text-sm text-red-500">{errors.whyJoin.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What are your expectations from ACM?</label>
              <textarea 
                rows="3" 
                {...register('expectations')}
                className={`w-full rounded-md border px-3 py-2 ${errors.expectations ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-acm-blue'} focus:outline-none focus:ring-2`}
              />
              {errors.expectations && <p className="mt-1 text-sm text-red-500">{errors.expectations.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-acm-blue hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors disabled:opacity-70 flex justify-center items-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h3>
            <p className="text-gray-600 mb-8">
              Thank you for applying. To complete your registration, you must join our official WhatsApp group for updates.
            </p>
            
            <a 
              href="https://chat.whatsapp.com/YOUR_INVITE_LINK_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-4"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Join WhatsApp Group
            </a>
            
            <button 
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-900 font-medium text-sm underline transition-colors"
            >
              I have joined the group
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default JoinUs;
