import { useState, useEffect } from "react";
import api from "../../api/axios";
import type { Novel } from "./types";

export const useNovels = () => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNovels = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/novels");
      setNovels(res.data);
    } catch (err) {
      console.error("Error fetching novels", err);
      setNovels([]);
    } finally {
      setLoading(false);
    }
  };

  const addNovel = async (data: any) => {
    await api.post("/api/novels", data);
    fetchNovels();
  };

  const updateNovel = async (id: string, data: any) => {
    await api.put(`/api/novels/${id}`, data);
    fetchNovels();
  };

  const deleteNovel = async (id: string) => {
    await api.delete(`/api/novels/${id}`);
    fetchNovels();
  };

  useEffect(() => {
    fetchNovels();
  }, []);

  return { novels, loading, addNovel, updateNovel, deleteNovel, fetchNovels };
};
