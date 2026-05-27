"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

type Tag = {
  id: string;
  tagName: string;
  usageCount: number;
};

const initialTags: Tag[] = [
  { id: "1", tagName: "エンジニア", usageCount: 8 },
  { id: "2", tagName: "デザイン", usageCount: 5 },
  { id: "3", tagName: "営業", usageCount: 4 },
  { id: "4", tagName: "マーケ", usageCount: 3 },
  { id: "5", tagName: "PM", usageCount: 6 },
  { id: "6", tagName: "CS", usageCount: 2 },
  { id: "7", tagName: "HR", usageCount: 1 },
  { id: "8", tagName: "経営", usageCount: 3 },
  { id: "9", tagName: "データ", usageCount: 2 },
  { id: "10", tagName: "インフラ", usageCount: 4 },
  { id: "11", tagName: "PR", usageCount: 1 },
  { id: "12", tagName: "リサーチ", usageCount: 2 },
  { id: "13", tagName: "重要", usageCount: 7 },
  { id: "14", tagName: "新規", usageCount: 5 },
];

type SortKey = "name" | "usage";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
  );
}
function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
function XMarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function InlineEditCard({
  tag,
  onRename,
  onDelete,
}: {
  tag: Tag;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [draft, setDraft] = useState(tag.tagName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitRename = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== tag.tagName) {
      onRename(tag.id, trimmed);
    } else {
      setDraft(tag.tagName);
    }
    setEditing(false);
  };

  const cancelRename = () => {
    setDraft(tag.tagName);
    setEditing(false);
  };

  if (confirming) {
    return (
      <div className="bg-white rounded-[16px] border border-[#FF4D4D]/30 shadow-[0_2px_12px_rgba(255,77,77,0.08)] p-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FF4D4D]/10 flex items-center justify-center shrink-0 mt-0.5">
            <TrashIcon className="w-4 h-4 text-[#FF4D4D]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2C2C2C]">タグを削除しますか？</p>
            <p className="text-xs text-[#8A8A8A] mt-1">
              <span className="font-medium text-[#2C2C2C]">「{tag.tagName}」</span> を削除すると
              {tag.usageCount > 0 && <span className="text-[#FF4D4D]"> {tag.usageCount}件のアポ</span>}
              {tag.usageCount > 0 ? "からも外れます。" : "元に戻せません。"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setConfirming(false)}
            className="flex-1 py-2 rounded-full text-xs font-semibold text-[#8A8A8A] border border-[#E0D0D0] bg-white hover:bg-[#F5F5F7] active:scale-[0.98] transition-all duration-200"
          >
            キャンセル
          </button>
          <button
            onClick={() => onDelete(tag.id)}
            className="flex-1 py-2 rounded-full text-xs font-semibold text-white bg-[#FF4D4D] hover:brightness-105 active:scale-[0.98] transition-all duration-200"
          >
            削除する
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] hover:shadow-[0_4px_20px_rgba(255,107,129,0.15)] p-5 flex flex-col gap-4 transition-shadow duration-200">
      {/* Tag chip */}
      <div className="flex items-center justify-between gap-2">
        {editing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitRename();
              if (e.key === "Escape") cancelRename();
            }}
            className="flex-1 px-3 py-1.5 rounded-xl bg-[#F5F5F7] border border-[#FF6B81] focus:outline-none text-[#2C2C2C] text-sm font-medium"
          />
        ) : (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#FFF0F2] text-[#FF6B81] border border-[#FFB3BF]">
            {tag.tagName}
          </span>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-1 shrink-0">
          {editing ? (
            <>
              <button
                onClick={commitRename}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[#4CAF7D]/10 text-[#4CAF7D] hover:bg-[#4CAF7D]/20 transition-colors"
              >
                <CheckIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={cancelRename}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[#F5F5F7] text-[#8A8A8A] hover:bg-[#E0D0D0] transition-colors"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setDraft(tag.tagName); setEditing(true); }}
                className="w-7 h-7 flex items-center justify-center rounded-full text-[#C2C2C2] hover:bg-[#FFF0F2] hover:text-[#FF6B81] opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <PencilIcon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setConfirming(true)}
                className="w-7 h-7 flex items-center justify-center rounded-full text-[#C2C2C2] hover:bg-[#FFF5F5] hover:text-[#FF4D4D] opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Usage bar */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8A8A8A]">使用数</span>
          <span className="text-xs font-semibold text-[#2C2C2C]">{tag.usageCount} 件</span>
        </div>
        <div className="h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] transition-all duration-500"
            style={{ width: `${Math.min((tag.usageCount / 10) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [newTagName, setNewTagName] = useState("");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("usage");
  const [createError, setCreateError] = useState("");
  const newTagInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    let list = tags;
    if (search.trim()) {
      list = list.filter((t) => t.tagName.includes(search.trim()));
    }
    return [...list].sort((a, b) =>
      sortKey === "name"
        ? a.tagName.localeCompare(b.tagName, "ja")
        : b.usageCount - a.usageCount
    );
  }, [tags, search, sortKey]);

  const createTag = () => {
    const trimmed = newTagName.trim();
    if (!trimmed) return;
    if (tags.some((t) => t.tagName === trimmed)) {
      setCreateError("同じ名前のタグが既に存在します");
      return;
    }
    setTags((prev) => [
      ...prev,
      { id: String(Date.now()), tagName: trimmed, usageCount: 0 },
    ]);
    setNewTagName("");
    setCreateError("");
  };

  const renameTag = (id: string, newName: string) => {
    if (tags.some((t) => t.tagName === newName && t.id !== id)) return;
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, tagName: newName } : t)));
  };

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  const totalUsage = tags.reduce((s, t) => s + t.usageCount, 0);
  const mostUsed = [...tags].sort((a, b) => b.usageCount - a.usageCount)[0];

  return (
    <div className="min-h-screen bg-[#FFF8F8] flex">
      <Sidebar />

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-[#F0E8E8] px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#8A8A8A]">全 {tags.length} タグ</p>
            <h2 className="text-lg font-bold text-[#2C2C2C]">タグ管理</h2>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2C2C2]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="タグを検索..."
              className="pl-9 pr-4 py-2 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#FF6B81] focus:bg-white focus:outline-none text-[#2C2C2C] placeholder-[#C2C2C2] text-sm transition-all duration-200 w-52"
            />
          </div>
        </header>

        <main className="flex-1 px-8 py-6 flex flex-col gap-6">

          {/* Stats row */}
          <section className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-5">
              <p className="text-[#8A8A8A] text-sm">タグ総数</p>
              <div className="flex items-end gap-1 mt-2">
                <p className="text-[#2C2C2C] font-bold text-3xl leading-none">{tags.length}</p>
                <p className="text-[#FF6B81] text-sm font-medium mb-0.5">種類</p>
              </div>
              <p className="text-[#C2C2C2] text-xs mt-2">未使用 {tags.filter((t) => t.usageCount === 0).length} 件</p>
            </div>

            <div className="bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-5">
              <p className="text-[#8A8A8A] text-sm">タグ付けされたアポ</p>
              <div className="flex items-end gap-1 mt-2">
                <p className="text-[#2C2C2C] font-bold text-3xl leading-none">{totalUsage}</p>
                <p className="text-[#FF6B81] text-sm font-medium mb-0.5">件</p>
              </div>
              <p className="text-[#C2C2C2] text-xs mt-2">平均 {(totalUsage / tags.length).toFixed(1)} 件 / タグ</p>
            </div>

            <div className="bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] rounded-[16px] shadow-[0_4px_16px_rgba(255,107,129,0.35)] p-5 text-white">
              <p className="text-sm font-medium opacity-80">最多使用タグ</p>
              <p className="font-bold text-2xl mt-2">{mostUsed?.tagName ?? "—"}</p>
              <p className="text-sm opacity-80 mt-1">{mostUsed?.usageCount ?? 0} 件のアポで使用</p>
            </div>
          </section>

          {/* New tag form */}
          <section className="bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-6">
            <h3 className="text-[15px] font-semibold text-[#2C2C2C] mb-4">新規タグを追加</h3>
            <div className="flex gap-3 items-start">
              <div className="flex-1 flex flex-col gap-1.5">
                <input
                  ref={newTagInputRef}
                  type="text"
                  value={newTagName}
                  onChange={(e) => { setNewTagName(e.target.value); setCreateError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && createTag()}
                  placeholder="例：フォローアップ、リード、VIP"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border transition-all duration-200 text-[#2C2C2C] placeholder-[#C2C2C2] text-sm focus:outline-none focus:bg-white ${
                    createError ? "border-[#FF4D4D]" : "border-transparent focus:border-[#FF6B81]"
                  }`}
                />
                {createError && (
                  <p className="text-[#FF4D4D] text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {createError}
                  </p>
                )}
              </div>
              <button
                onClick={createTag}
                disabled={!newTagName.trim()}
                className="flex items-center gap-2 py-3 px-5 rounded-full text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] shadow-[0_4px_16px_rgba(255,107,129,0.35)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(255,107,129,0.45)] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <PlusIcon className="w-4 h-4" />
                追加
              </button>
            </div>
          </section>

          {/* Sort + grid */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#8A8A8A]">
                {search ? `「${search}」の検索結果 ${filtered.length} 件` : `${filtered.length} 件`}
              </p>
              <div className="flex items-center gap-1 bg-white border border-[#F0E8E8] rounded-xl p-1 shadow-[0_2px_8px_rgba(255,107,129,0.06)]">
                {(["usage", "name"] as SortKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortKey(key)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      sortKey === key
                        ? "bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] text-white shadow-sm"
                        : "text-[#8A8A8A] hover:text-[#2C2C2C]"
                    }`}
                  >
                    {key === "usage" ? "使用数順" : "名前順"}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <p className="text-[#C2C2C2] text-sm">タグが見つかりませんでした</p>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-[#FF6B81] text-sm font-medium hover:underline"
                  >
                    検索をクリア
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {filtered.map((tag) => (
                  <InlineEditCard
                    key={tag.id}
                    tag={tag}
                    onRename={renameTag}
                    onDelete={deleteTag}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
