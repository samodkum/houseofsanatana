import React, { useState } from 'react';
import { Settings, LogOut, Bell, Sparkles } from 'lucide-react';

interface SettingsPanelProps {
  onLogout: () => Promise<void>;
  customerEmail?: string;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onLogout, customerEmail }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    await onLogout();
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="border-b border-[#D9C6A8]/40 pb-6">
        <div className="flex items-center gap-2 text-[#C7833D] font-dm text-xs uppercase tracking-widest font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Preferences & Control</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#332C25] font-normal tracking-wide">
          Account Settings
        </h2>
        <p className="text-sm text-[#8F6E5B] font-dm mt-1">
          Configure notifications, preferences, and your active session.
        </p>
      </div>

      {/* Preferences Section */}
      <div className="bg-[#FFFFFF] border border-[#D9C6A8]/60 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(51,44,37,0.04)] space-y-4">
        <div className="flex items-center gap-3 border-b border-[#D9C6A8]/30 pb-4">
          <div className="w-10 h-10 rounded-full bg-[#F7F1E5] text-[#C7833D] flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[#332C25] text-base">
              Notifications & Updates
            </h3>
            <p className="text-xs text-[#8F6E5B] font-dm">
              Receive auspicious muhurat alerts and shipment tracking.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-1">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-dm text-[#332C25] font-medium">
              Order status & dispatch updates
            </span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#C7833D] w-4 h-4 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-xs font-dm text-[#332C25] font-medium">
              Sanctum Yatra festival announcements
            </span>
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#C7833D] w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Danger / Logout Zone */}
      <div className="bg-[#FFFFFF] border border-[#F8B4B4]/60 rounded-2xl p-6 sm:p-7 shadow-[0_4px_16px_rgba(179,57,39,0.04)] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif font-bold text-[#332C25] text-base">
              End Sacred Session
            </h4>
            <p className="text-xs text-[#8F6E5B] font-dm mt-0.5">
              Securely sign out of your House of Sanatana customer dashboard.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B33927] hover:bg-[#922819] text-white font-dm text-xs font-semibold tracking-wider uppercase transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
