// src/components/novels/EditModal.tsx
import React, { useState, useEffect } from "react";
import { columns } from "./columns";
import type { Novel } from "./types";

interface Props {
  row: Novel;
  onClose: () => void;
  onSave: (id: string, data: Novel) => Promise<void>;
}

const EditModal: React.FC<Props> = ({ row, onClose, onSave }) => {
  const [editData, setEditData] = useState<Novel>(row);

  useEffect(() => {
    setEditData(row);
  }, [row]);

  const handleChange = (key: string, value: any) => {
    setEditData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!row._id) return;
    await onSave(row._id, editData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-800 rounded-lg p-6 w-full max-w-lg shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-slate-200">
          Edit Novel
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {columns.map((col) => (
            <div key={col.key} className="flex flex-col">
              <label className="text-slate-400 mb-1">{col.label}</label>
              {col.key === "tags" ? (
                <input
                  type="text"
                  value={editData.tags?.join(", ") || ""}
                  onChange={(e) =>
                    handleChange(
                      "tags",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  className="px-2 py-1 rounded bg-slate-700 text-slate-200"
                  placeholder="Comma separated tags"
                />
              ) : col.key === "link" ? (
                <input
                  type="url"
                  value={editData.link || ""}
                  onChange={(e) => handleChange("link", e.target.value)}
                  className="px-2 py-1 rounded bg-slate-700 text-slate-200"
                  placeholder="URL"
                />
              ) : (
                <input
                  type="text"
                  value={editData[col.key as keyof Novel] || "-" || ""}
                  onChange={(e) => handleChange(col.key, e.target.value)}
                  className="px-2 py-1 rounded bg-slate-700 text-slate-200"
                />
              )}
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-slate-600 text-slate-200 hover:bg-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-700 text-white hover:bg-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
