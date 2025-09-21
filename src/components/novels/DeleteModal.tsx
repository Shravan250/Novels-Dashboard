// src/components/novels/DeleteModal.tsx
import React from "react";
import type { Novel } from "./types";

interface Props {
  row: Novel;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
}

const DeleteModal: React.FC<Props> = ({ row, onClose, onDelete }) => {
  const handleDelete = async () => {
    if (!row._id) return;
    await onDelete(row._id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">
          Delete Novel
        </h2>
        <p className="mb-4 text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-bold">{row.title}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-slate-600 text-slate-200 hover:bg-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
