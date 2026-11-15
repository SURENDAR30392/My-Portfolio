import React, { useState, useEffect } from 'react';
import { Image, CheckCircle, AlertTriangle, RefreshCw, Trash2, ExternalLink } from 'lucide-react';

export const ImageUrlInput = ({
  value,
  onChange,
  onRemove,
  label = "Image URL",
  placeholder = "https://example.com/image.jpg",
  aspectRatio = "aspect-video",
  fallbackUrl = "/msr-portrait.svg",
  required = false
}) => {
  const [loadStatus, setLoadStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [tempUrl, setTempUrl] = useState(value || '');

  useEffect(() => {
    setTempUrl(value || '');
  }, [value]);

  useEffect(() => {
    if (!tempUrl || !tempUrl.trim()) {
      setLoadStatus('idle');
      return;
    }

    // Check basic URL format
    if (!/^https?:\/\//i.test(tempUrl) && !tempUrl.startsWith('/')) {
      setLoadStatus('error');
      return;
    }

    setLoadStatus('loading');
    const img = new window.Image();
    img.src = tempUrl;
    img.onload = () => setLoadStatus('success');
    img.onerror = () => setLoadStatus('error');

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [tempUrl]);

  const handleChange = (newVal) => {
    setTempUrl(newVal);
    onChange(newVal);
  };

  const handleClear = () => {
    setTempUrl('');
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-3">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#172554]">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {tempUrl && (
            <a
              href={tempUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Test direct link</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="url"
            value={tempUrl}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#172554] bg-white placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#EFF6FF] transition-all"
          />
        </div>

        {tempUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#94A3B8] hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
            title="Clear Image URL"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Live Preview Card */}
      {tempUrl && (
        <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center gap-3">
          <div className={`w-20 ${aspectRatio} bg-white rounded-lg border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0`}>
            {loadStatus === 'loading' && (
              <RefreshCw size={16} className="text-[#2563EB] animate-spin" />
            )}
            {loadStatus === 'success' && (
              <img
                src={tempUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setLoadStatus('error')}
              />
            )}
            {loadStatus === 'error' && (
              <AlertTriangle size={16} className="text-amber-500" />
            )}
            {loadStatus === 'idle' && (
              <Image size={16} className="text-[#94A3B8]" />
            )}
          </div>

          <div className="flex-1 min-w-0 text-xs">
            {loadStatus === 'loading' && (
              <span className="text-[#64748B] flex items-center gap-1.5 font-medium">
                <RefreshCw size={12} className="animate-spin text-[#2563EB]" />
                Validating image URL...
              </span>
            )}
            {loadStatus === 'success' && (
              <span className="text-[#10B981] flex items-center gap-1.5 font-bold">
                <CheckCircle size={14} />
                Image validated successfully
              </span>
            )}
            {loadStatus === 'error' && (
              <span className="text-amber-600 flex items-center gap-1.5 font-medium">
                <AlertTriangle size={14} />
                Unable to load image from URL.
              </span>
            )}
            <p className="text-[11px] text-[#94A3B8] truncate mt-1">
              {tempUrl}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
