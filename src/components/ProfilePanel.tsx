import React, { useState, useEffect } from 'react';
import { User, Mail, ShieldCheck, CheckCircle2, AlertCircle, Save, Sparkles } from 'lucide-react';
import { CustomerData } from '../hooks/useCustomer';

interface ProfilePanelProps {
  customer: CustomerData | null;
  onUpdateProfile: (firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ customer, onUpdateProfile }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (customer) {
      setFirstName(customer.firstName || '');
      setLastName(customer.lastName || '');
    }
  }, [customer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const result = await onUpdateProfile(firstName, lastName);
    setIsSaving(false);

    if (result.success) {
      setStatusMessage({ type: 'success', text: 'Sacred profile updated with divine grace.' });
      setTimeout(() => setStatusMessage(null), 4000);
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to update sacred profile.' });
    }
  };

  const email = customer?.emailAddress?.emailAddress || '';
  const displayName = customer?.displayName || `${firstName} ${lastName}`.trim() || 'Blessed Devotee';

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="border-b border-[#D9C6A8]/40 pb-6">
        <div className="flex items-center gap-2 text-[#C7833D] font-dm text-xs uppercase tracking-widest font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sadhaka Identity</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#332C25] font-normal tracking-wide">
          Sacred Profile
        </h2>
        <p className="text-sm text-[#8F6E5B] font-dm mt-1">
          Manage your personal details linked with your Shopify customer account.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-[#FFFFFF] border border-[#D9C6A8]/60 rounded-2xl p-6 shadow-[0_4px_16px_rgba(51,44,37,0.04)] flex flex-col sm:flex-row items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#F7F1E5] border-2 border-[#C7833D]/30 flex items-center justify-center text-[#C7833D] shrink-0 shadow-inner">
          <User className="w-8 h-8" />
        </div>
        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h3 className="text-lg font-serif text-[#332C25] font-bold truncate">
              {displayName}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-dm text-[#3E7C59] bg-[#EBF5EE] border border-[#B9E0C7] px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          </div>
          <p className="text-xs text-[#8F6E5B] font-dm mt-0.5 flex items-center justify-center sm:justify-start gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 text-[#C7833D]" />
            {email}
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-[#D9C6A8]/60 rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_rgba(51,44,37,0.04)] space-y-6">
        <h4 className="text-base font-serif font-bold text-[#332C25] border-b border-[#D9C6A8]/30 pb-3">
          Personal Information
        </h4>

        {statusMessage && (
          <div
            className={`p-3.5 rounded-xl text-xs font-dm flex items-center gap-2.5 transition-all ${
              statusMessage.type === 'success'
                ? 'bg-[#EBF5EE] border border-[#B9E0C7] text-[#3E7C59]'
                : 'bg-[#FDF2F2] border border-[#F8B4B4] text-[#B33927]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-dm uppercase tracking-wider text-[#8F6E5B] font-semibold">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Anjali"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9C6A8] bg-[#F7F1E5]/40 text-[#332C25] font-dm text-sm focus:outline-none focus:ring-2 focus:ring-[#C7833D]/40 focus:border-[#C7833D] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-dm uppercase tracking-wider text-[#8F6E5B] font-semibold">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Sharma"
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9C6A8] bg-[#F7F1E5]/40 text-[#332C25] font-dm text-sm focus:outline-none focus:ring-2 focus:ring-[#C7833D]/40 focus:border-[#C7833D] transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-dm uppercase tracking-wider text-[#8F6E5B] font-semibold">
            Associated Email (Managed by Shopify)
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-[#D9C6A8]/50 bg-[#F7F1E5]/60 text-[#8F6E5B] font-dm text-sm cursor-not-allowed select-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-dm font-bold text-[#8F6E5B] bg-[#D9C6A8]/40 px-2 py-0.5 rounded">
              Read Only
            </span>
          </div>
          <p className="text-[11px] text-[#8F6E5B]/80 font-dm">
            Email changes are verified securely via the Shopify Customer Account gateway.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-[#F7F1E5] font-dm text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
