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
          <label className="block text-xs font-semibold text-[#102A28]">
            {label} {required && <span className="text-[#DC2626]">*</span>}
          </label>
          {tempUrl && (
            <a
              href={tempUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-[#0F766E] hover:underline flex items-center gap-1"
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
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDE7E5] text-sm text-[#102A28] bg-white placeholder-[#8A9B98] focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#7CC7BD]/30 transition-all"
          />
        </div>

        {tempUrl && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2.5 rounded-lg border border-[#DDE7E5] bg-white text-[#8A9B98] hover:text-[#DC2626] hover:bg-[#FEF2F2] transition-colors shrink-0"
            title="Clear Image URL"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Status & Preview Card */}
      {tempUrl && tempUrl.trim() && (
        <div className="bg-[#F7FAFA] border border-[#DDE7E5] rounded-xl p-3.5 space-y-2.5">
          {/* Status Badge */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#4B5F5C]">Live Preview:</span>
            
            {loadStatus === 'loading' && (
              <span className="text-[#0F766E] flex items-center gap-1">
                <RefreshCw size={12} className="animate-spin" />
                <span>Verifying image...</span>
              </span>
            )}

            {loadStatus === 'success' && (
              <span className="text-[#15803D] font-medium flex items-center gap-1">
                <CheckCircle size={13} />
                <span>Image loaded successfully</span>
              </span>
            )}

            {loadStatus === 'error' && (
              <span className="text-[#B45309] font-medium flex items-center gap-1">
                <AlertTriangle size={13} />
                <span>Preview failed (Host may block embedding or URL is invalid)</span>
              </span>
            )}
          </div>

          {/* Image Container with Safe Fallback */}
          <div className={`relative w-full max-w-sm mx-auto ${aspectRatio} rounded-lg overflow-hidden border border-[#DDE7E5] bg-[#E6F4F2] flex items-center justify-center`}>
            {loadStatus === 'success' ? (
              <img
                src={tempUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : loadStatus === 'error' ? (
              <div className="p-4 text-center space-y-1">
                <AlertTriangle size={24} className="text-[#B45309] mx-auto" />
                <div className="text-xs font-semibold text-[#102A28]">Image Not Available</div>
                <p className="text-[10px] text-[#8A9B98] leading-tight">
                  Ensure the URL points directly to an image file (.jpg, .png, .webp, or direct CDN link).
                </p>
              </div>
            ) : (
              <div className="text-xs text-[#8A9B98] flex items-center gap-2">
                <Image size={18} />
                <span>Loading preview...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
