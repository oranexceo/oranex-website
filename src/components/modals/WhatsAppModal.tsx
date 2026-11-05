import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OranexLogo } from '../OranexLogo';
import { X, MessageCircle, Send, Check } from 'lucide-react';

export const WhatsAppModal: React.FC = () => {
  const { isWhatsAppModalOpen, closeWhatsAppModal, whatsAppCustomText, companyInfo } = useApp();
  const [message, setMessage] = useState(whatsAppCustomText);

  // Update local message when custom text changes
  React.useEffect(() => {
    setMessage(whatsAppCustomText);
  }, [whatsAppCustomText]);

  if (!isWhatsAppModalOpen) return null;

  const handleLaunchWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const cleanNumber = companyInfo.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    closeWhatsAppModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in-50 duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
        {/* WhatsApp Brand Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded shrink-0">
              <OranexLogo size={26} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-sm text-white">
                  Chat with Oranex Sourcing
                </h3>
                <span className="text-[10px] bg-emerald-700 text-emerald-100 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Direct Procurement Desk Line
              </div>
            </div>
          </div>
          <button
            onClick={closeWhatsAppModal}
            className="p-1 rounded text-emerald-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message preview & customization */}
        <div className="p-5 space-y-4">
          <div className="text-xs text-slate-600 leading-relaxed">
            Connect directly with an Oranex sourcing officer in Addis Ababa. You can customize your opening inquiry below before launching WhatsApp:
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Prefilled Message
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-500">
            Official line: <span className="font-mono font-semibold text-slate-700">{companyInfo.phone}</span> (Oranex Trading One Member PLC)
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              onClick={closeWhatsAppModal}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleLaunchWhatsApp}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch WhatsApp Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
