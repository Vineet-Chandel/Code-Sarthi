import React, { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import LoadingButton from "./LoadingButton";

export const InputModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  defaultValue = "",
  placeholder = "Enter value...",
  confirmText = "Save",
  cancelText = "Cancel",
  validationError = "",
  isLoading = false,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(validationError);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setValue(defaultValue);
      setError(validationError);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
    }
  }, [isOpen, defaultValue, validationError]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isLoading) return;
    
    const trimmed = value.trim();
    if (!trimmed) {
      setError("This field is required.");
      return;
    }
    setError("");
    onSubmit(trimmed);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={true} size="md">
      <form onSubmit={handleSubmit} className="p-5 text-left">
        <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
        {description && (
          <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{description}</p>
        )}
        
        <div className="mt-4">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full bg-[#121212] border border-white/10 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-white/20 transition-all duration-150 placeholder-zinc-700"
          />
          {error && (
            <p className="text-[11px] text-red-500 mt-1.5 font-medium">{error}</p>
          )}
        </div>

        <div className="flex justify-end gap-2.5 mt-5">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[#121212] hover:bg-[#1a1a1a] text-xs font-medium text-zinc-400 hover:text-white border border-white/5 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          
          <LoadingButton
            type="submit"
            isLoading={isLoading}
            loadingText="Saving..."
            className="px-3 py-1.5 rounded bg-white hover:bg-zinc-200 text-black text-xs font-semibold border border-white transition duration-150"
          >
            {confirmText}
          </LoadingButton>
        </div>
      </form>
    </Modal>
  );
};

export default InputModal;
