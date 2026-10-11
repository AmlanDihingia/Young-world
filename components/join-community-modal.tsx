'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, Loader2, Users } from 'lucide-react';
import flagsData from '@/utils/flags.json';

const countryList = Object.keys(flagsData).sort();

type Props = {
  communityName: string;
  communitySlug: string;
  defaultCountry?: string;
};

export default function JoinCommunityModal({ communityName, communitySlug, defaultCountry }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open to prevent background overlapping/scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    age: '',
    city: '',
    country: defaultCountry || '',
    reason: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/join-community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          communityName,
          communitySlug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset state after transition
    setTimeout(() => {
      setIsSubmitted(false);
      setErrorMessage('');
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        age: '',
        city: '',
        country: defaultCountry || '',
        reason: '',
      });
    }, 300);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full mt-8 bg-[#C49232] text-white font-bold py-4 rounded-full hover:bg-[#b0832d] transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
      >
        <Users className="w-5 h-5" />
        Join Community
      </button>

      {/* Modal Backdrop - rendered directly into document.body via Portal to break out of all stacking contexts */}
      {isOpen && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh] my-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-[#2C1A14] text-white p-5 sm:p-6 relative shrink-0">
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-block bg-[#F2B04E]/20 text-[#F2B04E] text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2">
                Membership Request
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Join {communityName}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Fill out the details below to request to join this community.
              </p>
            </div>

            {/* Content / Form */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
                  <p className="text-gray-600 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-gray-800">{formData.name}</span>! Your request to join <span className="font-semibold text-gray-800">{communityName}</span> has been received. The community leaders will connect with you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-6 bg-[#222222] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-black transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email & Whatsapp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        placeholder="+1 234 567 8900"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Age, City, Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        required
                        min="5"
                        max="120"
                        placeholder="e.g. 24"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="e.g. Nairobi"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        required
                        placeholder="e.g. Kenya"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Why do you want to join */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Why do you want to join our community? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="reason"
                      required
                      rows={3}
                      placeholder="Tell us what draws you to this community and what you hope to experience..."
                      value={formData.reason}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49232] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#C49232] hover:bg-[#b0832d] disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 text-sm cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
