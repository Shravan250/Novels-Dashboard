import Novel from "../model/Novel.js";
// @desc Get all novels
export const getNovels = async (req, res) => {
  try {
    const novels = await Novel.find();
    res.json(novels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single novel
export const getNovel = async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.id);
    if (!novel) return res.status(404).json({ message: "Novel not found" });
    res.json(novel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Create novel
export const createNovel = async (req, res) => {
  try {
    const novel = new Novel(req.body);
    const saved = await novel.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Update novel
export const updateNovel = async (req, res) => {
  try {
    const updated = await Novel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Novel not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete novel
export const deleteNovel = async (req, res) => {
  try {
    const deleted = await Novel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Novel not found" });
    res.json({ message: "Novel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
