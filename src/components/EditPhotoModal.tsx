import React, { useState, useRef } from 'react';
import { X, Upload, Link, RotateCcw, Check, Camera, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { compressImage } from '../utils/imageStorage.ts';

interface EditPhotoModalProps {
  isOpen: boolean;
  currentPhoto: string;
  photoSizeLevel: number;
  onChangePhotoSize: (level: number) => void;
  onSavePhoto: (newPhotoUrl: string) => void;
  onResetPhoto: () => void;
  onClose: () => void;
}

export const EditPhotoModal: React.FC<EditPhotoModalProps> = ({
  isOpen,
  currentPhoto,
  photoSizeLevel,
  onChangePhotoSize,
  onSavePhoto,
  onResetPhoto,
  onClose,
}) => {
  const [photoPreview, setPhotoPreview] = useState<string>(currentPhoto);
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please choose an image file (PNG, JPG, WebP).');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    try {
      // Compress and preserve alpha transparency for background-removed PNGs
      const compressedDataUrl = await compressImage(file, 900);
      setPhotoPreview(compressedDataUrl);
    } catch (err: any) {
      console.error('Image compression error:', err);
      // Fallback to direct FileReader
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMsg('Please enter an image URL.');
      return;
    }
    setErrorMsg('');
    setPhotoPreview(urlInput.trim());
  };

  const handleSave = () => {
    try {
      onSavePhoto(photoPreview);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMsg('Could not save photo: ' + (err.message || 'Storage error'));
    }
  };

  const handleReset = () => {
    onResetPhoto();
    setPhotoPreview(PERSONAL_INFO.profileImage);
    setUrlInput('');
    setErrorMsg('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-photo-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0D1525] border border-blue-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400">
                Personalize Hero Photo
              </span>
              <h3 id="edit-photo-title" className="text-xl font-bold font-display text-white">
                Upload or Change Photo
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Area with transparent checkerboard & ambient glow */}
        <div className="my-5 flex flex-col items-center justify-center">
          <div className="relative w-44 h-56 rounded-2xl flex items-end justify-center overflow-hidden border-2 border-blue-500/40 shadow-2xl bg-gradient-to-b from-slate-900/40 to-slate-950/80 group">
            {/* Ambient backlight glow */}
            <div className="absolute w-28 h-28 rounded-full bg-blue-600/30 blur-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            {isProcessing ? (
              <div className="flex flex-col items-center justify-center gap-2 text-blue-400 py-12">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">Optimizing Image...</span>
              </div>
            ) : (
              <img
                src={photoPreview}
                alt="Profile Preview"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(59,130,246,0.35)]"
                onError={() => setErrorMsg('Could not load image. Please upload a file or check the URL.')}
              />
            )}

            <span className="absolute bottom-1.5 left-2 right-2 text-center text-[10px] font-mono font-semibold text-blue-300 bg-black/70 backdrop-blur-sm rounded py-0.5">
              Live Preview
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-blue-400 mt-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Background removed & transparent PNG photos fully supported!</span>
          </div>

          {/* Photo Size & Scale Adjuster */}
          <div className="w-full mt-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Photo Display Size
              </span>
              <span className="text-[11px] font-mono text-blue-400 font-bold">
                {['Compact', 'Medium', 'Large', 'Extra Large', 'Maximum'][photoSizeLevel - 1] || 'Large'}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { level: 1, label: 'S' },
                { level: 2, label: 'M' },
                { level: 3, label: 'L' },
                { level: 4, label: 'XL' },
                { level: 5, label: 'MAX' },
              ].map((s) => (
                <button
                  key={s.level}
                  type="button"
                  onClick={() => onChangePhotoSize(s.level)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    photoSizeLevel === s.level
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-4 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File (PNG / JPG)
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            Image Link / URL
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' ? (
          <div className="space-y-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`w-full py-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${
                isDragging
                  ? 'border-blue-400 bg-blue-950/40 scale-102'
                  : 'border-slate-700 hover:border-blue-500 bg-slate-900/40 hover:bg-slate-900/80'
              }`}
            >
              <div className="p-3 rounded-full bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-white">
                Click to browse photo or drag & drop here
              </span>
              <span className="text-[11px] text-slate-500">
                Supports background-removed PNG, WebP, and JPG files
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-xs font-medium text-slate-400 block">
              Direct Image Link / CDN URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/transparent-photo.png"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleApplyUrl}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="mt-3 p-2.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs text-center flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {saveSuccess && (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Profile photo saved successfully!</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset to default photo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Original</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
