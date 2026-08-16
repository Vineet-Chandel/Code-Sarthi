import React from "react";
import Modal from "./Modal";
import LoadingButton from "./LoadingButton";

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = true,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnBackdrop={!isDestructive} size="sm">
      <div className="p-5 text-left">
        <h3 className="text-sm font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{description}</p>
        
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
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText={isDestructive ? "Deleting..." : "Processing..."}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition duration-150 ${
              isDestructive
                ? "bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/50"
                : "bg-white hover:bg-zinc-200 text-black border border-white"
            }`}
          >
            {confirmText}
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
