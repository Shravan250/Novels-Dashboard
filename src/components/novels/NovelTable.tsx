import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Novel } from "./types";

interface Props {
  columns: { key: string; label: string }[];
  data: Novel[];
  loading: boolean;
  filters: { [key: string]: string };
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  setEditRow: React.Dispatch<React.SetStateAction<Novel | null>>;
  setDeleteRow: React.Dispatch<React.SetStateAction<Novel | null>>;
}

const NovelTable: React.FC<Props> = ({
  data,
  columns,
  loading,
  filters,
  setFilters,
  setEditRow,
  setDeleteRow,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-slate-200">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-5 text-left">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-5 text-left">Actions</th>
          </tr>
          <tr className="bg-slate-900">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2">
                <input
                  type="text"
                  placeholder={`Search ${col.label.toLowerCase()}...`}
                  className="w-full px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filters[col.key] || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [col.key]: e.target.value,
                    }))
                  }
                />
              </td>
            ))}
            <td />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-6">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row._id || idx}
                className="hover:bg-slate-800 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.key === "tags" ? (
                      row.tags?.map((tag: string, i: number) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded-full bg-indigo-700 text-white mr-1"
                        >
                          {tag}
                        </span>
                      ))
                    ) : col.key === "link" ? (
                      <a
                        href={row.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline"
                      >
                        Visit
                      </a>
                    ) : (
                      row[col.key as keyof Novel] || "-"
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => setEditRow(row)}
                    className="text-indigo-400 hover:text-indigo-200"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => setDeleteRow(row)}
                    className="text-red-400 hover:text-red-200"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NovelTable;
