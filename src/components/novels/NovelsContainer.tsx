import React, { useState, useEffect, useMemo } from "react";
import { columns } from "./columns";
import NovelTable from "./NovelTable";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import type { Novel } from "./types";
import { useNovels } from "./useNovels";

const perPageOptions = [5, 10, 25, 50];

const NovelsContainer: React.FC = () => {
  const { novels, loading, addNovel, updateNovel, deleteNovel, fetchNovels } =
    useNovels();

  // Global search + filters
  const [globalSearch, setGlobalSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Pagination
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // Modals
  const [editRow, setEditRow] = useState<Novel | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState<Novel | null>(null);

  // Debounce global search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(globalSearch), 300);
    return () => clearTimeout(handler);
  }, [globalSearch]);

  useEffect(() => {
    fetchNovels();
  }, []);

  // Filtered + paginated data
  const filteredData = useMemo(() => {
    let filtered = Array.isArray(novels) ? novels : [];

    // Global search
    if (debouncedSearch.trim()) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter((row) =>
        columns.some((col) => {
          if (col.key === "tags") {
            return (row.tags || []).join(", ").toLowerCase().includes(search);
          }
          return String(row[col.key] || "")
            .toLowerCase()
            .includes(search);
        })
      );
    }

    // Per-column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) =>
          String(row[key as keyof typeof row] || "")
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      }
    });

    return filtered;
  }, [novels, debouncedSearch, filters]);

  const totalPages = Math.ceil(filteredData.length / perPage);
  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <div className="flex flex-col gap-3 bg-slate-900 p-6 rounded-xl shadow-lg my-10 mx-5">
      {/* Top bar: per-page + global search + add button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="perPage" className="text-slate-400 text-sm">
            entries per page
          </label>
          <select
            id="perPage"
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded px-2 py-1"
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {perPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <button
            className="ml-2 px-3 py-1 rounded bg-indigo-700 text-white hover:bg-indigo-600"
            onClick={() => setAddModal(true)}
          >
            + Add Novel
          </button>
        </div>
        <input
          type="text"
          placeholder="Global search..."
          className="w-full md:w-64 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <NovelTable
        columns={columns}
        data={paginatedData}
        loading={loading}
        filters={filters}
        setFilters={setFilters}
        setEditRow={setEditRow}
        setDeleteRow={setDeleteRow}
      />

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 text-slate-400 text-sm">
        <div>
          Showing {filteredData.length === 0 ? 0 : (page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="flex items-center space-x-1 mt-2 md:mt-0">
          <button
            className="px-2 py-1 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-2 py-1 rounded ${
                page === i + 1
                  ? "bg-slate-700 text-white"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-2 py-1 rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || totalPages === 0}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modals */}
      {editRow && (
        <EditModal
          row={editRow}
          onClose={() => setEditRow(null)}
          onSave={updateNovel}
        />
      )}
      {addModal && (
        <AddModal
          onClose={() => setAddModal(false)}
          onSave={addNovel} // from useNovels hook
        />
      )}
      {deleteRow && (
        <DeleteModal
          row={deleteRow}
          onClose={() => setDeleteRow(null)}
          onDelete={deleteNovel} // from useNovels hook
        />
      )}
    </div>
  );
};

export default NovelsContainer;
