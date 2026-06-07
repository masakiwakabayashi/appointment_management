"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const SAMPLE_TAGS = [
  "エンジニア", "デザイン", "営業", "マーケ", "PM",
  "CS", "HR", "経営", "データ", "インフラ", "PR", "リサーチ", "重要", "新規",
];

const MAX_DETAILS = 500;

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
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

function UserCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function NewAppointmentPage() {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [details, setDetails] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const allTags = [...SAMPLE_TAGS, ...customTags];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const trimmed = newTag.trim();
    if (!trimmed || allTags.includes(trimmed)) {
      setNewTag("");
      return;
    }
    setCustomTags((prev) => [...prev, trimmed]);
    setSelectedTags((prev) => [...prev, trimmed]);
    setNewTag("");
  };

  const validate = () => {
    const e: { name?: string } = {};
    if (!name.trim()) e.name = "名前は必須項目です";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];
  const hasPreview = name.trim() || occupation.trim() || details.trim() || selectedTags.length > 0;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FFF8F8] flex">
        <Sidebar />
        <div className="flex-1 ml-60 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 text-center px-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69] flex items-center justify-center shadow-[0_4px_16px_rgba(255,107,129,0.35)]">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2C2C2C]">Meetを登録しました</h2>
              <p className="text-[#8A8A8A] text-sm mt-2">
                <span className="font-semibold text-[#2C2C2C]">{name}</span> さんのMeetが追加されました
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/appointments/new"
                onClick={() => setSubmitted(false)}
                className="py-2.5 px-6 rounded-full text-[#FF6B81] font-semibold text-sm border-2 border-[#FF6B81] bg-white hover:bg-[#FFF0F2] active:scale-[0.98] transition-all duration-200"
              >
                続けて追加
              </Link>
              <Link
                href="/appointments"
                className="py-2.5 px-6 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] shadow-[0_4px_16px_rgba(255,107,129,0.35)] hover:brightness-105 active:scale-[0.98] transition-all duration-200"
              >
                一覧に戻る
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F8] flex">
      <Sidebar />

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-[#F0E8E8] px-8 py-4 flex items-center gap-3">
          <Link
            href="/appointments"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FFF0F2] text-[#8A8A8A] hover:text-[#FF6B81] transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-xs text-[#8A8A8A]">Meet一覧 / 新規作成</p>
            <h2 className="text-lg font-bold text-[#2C2C2C]">新規Meet追加</h2>
          </div>
        </header>

        <main className="flex-1 px-8 py-8">
          <div className="flex gap-8 items-start max-w-5xl">

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex-1 bg-white rounded-[20px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-8 flex flex-col gap-7"
            >
              <h3 className="text-[18px] font-semibold text-[#2C2C2C]">基本情報</h3>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#8A8A8A] flex items-center gap-1">
                  名前
                  <span className="text-[#FF4D4D] text-xs">必須</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value.trim()) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholder="例：田中 太郎"
                  className={`w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border transition-all duration-200 text-[#2C2C2C] placeholder-[#C2C2C2] text-sm focus:outline-none focus:bg-white ${
                    errors.name
                      ? "border-[#FF4D4D] bg-[#FFF5F5]"
                      : "border-transparent focus:border-[#FF6B81]"
                  }`}
                />
                {errors.name && (
                  <p className="text-[#FF4D4D] text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Occupation */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#8A8A8A]">職種</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="例：エンジニア、デザイナー"
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#FF6B81] focus:bg-white focus:outline-none text-[#2C2C2C] placeholder-[#C2C2C2] text-sm transition-all duration-200"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-medium text-[#8A8A8A]">タグ</label>

                {/* Tag chips */}
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                          active
                            ? "bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] text-white shadow-[0_2px_8px_rgba(255,107,129,0.3)]"
                            : "bg-[#F5F5F7] text-[#8A8A8A] hover:bg-[#FFF0F2] hover:text-[#FF6B81]"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                {/* Add custom tag */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTag())}
                    placeholder="新しいタグを追加..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#FF6B81] focus:bg-white focus:outline-none text-[#2C2C2C] placeholder-[#C2C2C2] text-sm transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={addCustomTag}
                    disabled={!newTag.trim()}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-[#FF6B81] border-2 border-[#FF6B81] bg-white hover:bg-[#FFF0F2] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all duration-200"
                  >
                    <PlusIcon className="w-4 h-4" />
                    追加
                  </button>
                </div>

                {/* Selected tag summary */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 pl-3 pr-2 py-1 rounded-full text-xs font-medium bg-[#FFF0F2] text-[#FF6B81] border border-[#FFB3BF]"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className="hover:text-[#FF4D4D] transition-colors"
                        >
                          <XMarkIcon className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#8A8A8A]">メモ</label>
                  <span className={`text-xs ${details.length > MAX_DETAILS * 0.9 ? "text-[#FFB347]" : "text-[#C2C2C2]"}`}>
                    {details.length} / {MAX_DETAILS}
                  </span>
                </div>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value.slice(0, MAX_DETAILS))}
                  placeholder="Meetの目的や話したいことをメモ..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#FF6B81] focus:bg-white focus:outline-none text-[#2C2C2C] placeholder-[#C2C2C2] text-sm transition-all duration-200 resize-none leading-relaxed"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <Link
                  href="/appointments"
                  className="flex-1 py-3 px-6 rounded-full text-center text-[#FF6B81] font-semibold text-sm border-2 border-[#FF6B81] bg-white hover:bg-[#FFF0F2] active:scale-[0.98] transition-all duration-200"
                >
                  キャンセル
                </Link>
                <button
                  type="submit"
                  className="flex-[2] py-3 px-6 rounded-full text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] shadow-[0_4px_16px_rgba(255,107,129,0.35)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(255,107,129,0.45)] active:scale-[0.98] transition-all duration-200"
                >
                  保存する
                </button>
              </div>
            </form>

            {/* Preview */}
            <div className="w-80 flex flex-col gap-4 sticky top-28">
              <p className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider px-1">プレビュー</p>

              <div className={`bg-white rounded-[20px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-5 transition-opacity duration-300 ${hasPreview ? "opacity-100" : "opacity-40"}`}>
                {/* Avatar + name */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69] flex items-center justify-center shadow-[0_2px_8px_rgba(255,107,129,0.3)] shrink-0">
                    {name.trim() ? (
                      <span className="text-white font-bold text-lg">{name.trim().charAt(0)}</span>
                    ) : (
                      <UserCircleIcon className="w-7 h-7 text-white/70" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#2C2C2C] font-semibold text-[15px] truncate">
                      {name.trim() || <span className="text-[#C2C2C2]">名前</span>}
                    </p>
                    <p className="text-[#8A8A8A] text-xs mt-0.5 truncate">
                      {occupation.trim() || <span className="text-[#C2C2C2]">職種</span>}
                    </p>
                  </div>
                  <span className="text-[#C2C2C2] text-xs ml-auto shrink-0">{today}</span>
                </div>

                {/* Details preview */}
                {details.trim() ? (
                  <p className="text-[#8A8A8A] text-sm mt-3 line-clamp-3 leading-relaxed">
                    {details}
                  </p>
                ) : (
                  <p className="text-[#C2C2C2] text-sm mt-3 italic">メモがここに表示されます</p>
                )}

                {/* Tags preview */}
                {selectedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF0F2] text-[#FF6B81] border border-[#FFB3BF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-1.5 mt-3">
                    {["タグA", "タグB"].map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F5F5F7] text-[#C2C2C2] border border-[#E0D0D0]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {!hasPreview && (
                <p className="text-center text-xs text-[#C2C2C2]">
                  フォームを入力するとここにプレビューが表示されます
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
