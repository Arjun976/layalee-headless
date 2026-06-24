'use client';

import React, { startTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#F5F3EF] px-5 py-12 text-center font-['Google_Sans',sans-serif]">
      <div className="max-w-md space-y-6 bg-white p-8 md:p-10 rounded-2xl border border-gray-200 shadow-xl">
        {/* Warning Icon */}
        <div className="w-16 h-16 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center mx-auto text-rose-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Error Info */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">API Connection Error</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            We are having trouble connecting to the WordPress backend. Please ensure the server is online and configure your environments properly.
          </p>
          {error.message && (
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-left">
              <code className="text-xs text-rose-600 font-mono break-all">{error.message}</code>
            </div>
          )}
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          className="w-full py-3.5 px-6 rounded-lg bg-[#2C322D] hover:bg-[#3d453e] text-white font-semibold transition shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
}
