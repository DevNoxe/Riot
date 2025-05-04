import React, { useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, code }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20">
        <div className="fixed inset-0 bg-black/75 transition-opacity"></div>

        <div 
          ref={modalRef}
          className="relative w-full max-w-lg transform rounded-lg bg-[#1a1c20] border border-[#2e2e2e] transition-all"
        >
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-[#7e7e7e] hover:text-[#f9f9f9] transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-[#d13639]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f9f9f9]">Code Expired</h3>
                <p className="mt-2 text-[#7e7e7e]">
                  The code <span className="font-mono text-[#d13639]">{code}</span> has expired or is invalid. 
                  Please check the code and try again.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2e2e2e] bg-[#111111] px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-[#7e7e7e] hover:text-[#f9f9f9] transition-colors duration-200"
            >
              Try Another Code
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-[#d13639] hover:bg-[#ef4444] text-white rounded transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;