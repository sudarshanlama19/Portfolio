import React, { useState } from 'react';
import { Lock, KeyRound, Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { useOwner } from '../context/OwnerContext.tsx';

interface OwnerAuthModalProps {
  onSuccess?: () => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({ onSuccess }) => {
  const { isAuthModalOpen, closeAuthModal, unlockOwner } = useOwner();
  const [passkeyInput, setPasskeyInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) {
      setErrorMsg('Please enter your owner passkey.');
      return;
    }

    const ok = unlockOwner(passkeyInput);
    if (ok) {
      setErrorMsg('');
      setPasskeyInput('');
      if (onSuccess) onSuccess();
    } else {
      setErrorMsg('Incorrect passkey. Only Sudarshan Lama can edit the portfolio.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-[#0D1525] border border-blue-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400">
                Security Verification
              </span>
              <h3 id="auth-modal-title" className="text-lg font-bold font-display text-white">
                Owner Access Only
              </h3>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info */}
        <div className="my-5 space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Profile photo editing and layout positioning are locked to protect against unauthorized edits by visitors.
          </p>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Enter your owner passkey to unlock editing mode on this device.</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase block mb-1.5">
              Owner Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                autoFocus
                value={passkeyInput}
                onChange={(e) => {
                  setPasskeyInput(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="Enter passkey (e.g. sudarshan19)"
                className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              Hint: Default passkey is <span className="font-mono text-blue-400">sudarshan19</span>
            </span>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeAuthModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Unlock as Sudarshan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
