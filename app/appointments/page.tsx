"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";

type Appointment = {
  id: string;
  name: string;
  occupation: string;
  details: string;
  tags: string[];
  date: string;
};

const allAppointments: Appointment[] = [
  { id: "1", name: "田中 太郎", occupation: "エンジニア", details: "新規プロジェクトについて打ち合わせ予定。技術スタックの選定も含めて議論したい。", tags: ["エンジニア", "新規"], date: "2026-05-28" },
  { id: "2", name: "鈴木 花子", occupation: "デザイナー", details: "UIリニューアルの相談。現行デザインの課題整理から始める予定。", tags: ["デザイン"], date: "2026-05-27" },
  { id: "3", name: "佐藤 健", occupation: "営業部長", details: "パートナーシップの可能性を探る。まずは各社の強みを共有する場にしたい。", tags: ["営業", "重要"], date: "2026-05-25" },
  { id: "4", name: "山田 美咲", occupation: "マーケター", details: "SNS戦略について意見交換。直近のキャンペーン結果をもとに方向性を議論する。", tags: ["マーケ"], date: "2026-05-22" },
  { id: "5", name: "伊藤 龍一", occupation: "プロダクトマネージャー", details: "ロードマップのすり合わせ。Q3の優先度について合意を取りたい。", tags: ["PM", "重要"], date: "2026-05-20" },
  { id: "6", name: "中村 さくら", occupation: "カスタマーサクセス", details: "既存顧客からのフィードバック共有。プロダクト改善への反映方法も検討。", tags: ["CS"], date: "2026-05-18" },
  { id: "7", name: "渡辺 拓也", occupation: "データサイエンティスト", details: "分析基盤の整備について相談。BIツール選定の方向性を決めたい。", tags: ["エンジニア", "データ"], date: "2026-05-15" },
  { id: "8", name: "小林 奈々", occupation: "人事マネージャー", details: "採用プロセスの見直し。エンジニア採用の強化施策を一緒に考えたい。", tags: ["HR"], date: "2026-05-12" },
  { id: "9", name: "加藤 誠", occupation: "CFO", details: "来期予算のドラフトレビュー。プロダクト投資の優先順位を固める。", tags: ["経営", "重要"], date: "2026-05-10" },
  { id: "10", name: "吉田 ゆかり", occupation: "UXリサーチャー", details: "ユーザーインタビュー結果の共有。インサイトをもとに次のスプリントに反映したい。", tags: ["デザイン", "リサーチ"], date: "2026-05-08" },
  { id: "11", name: "松本 大輝", occupation: "インフラエンジニア", details: "本番環境の移行計画について。ダウンタイムを最小化する方法を検討。", tags: ["エンジニア", "インフラ"], date: "2026-05-05" },
  { id: "12", name: "井上 彩", occupation: "広報担当", details: "プレスリリースの内容確認。新機能発表のタイミングと内容をすり合わせ。", tags: ["マーケ", "PR"], date: "2026-05-02" },
];

const ALL_TAGS = ["すべて", ...Array.from(new Set(allAppointments.flatMap((a) => a.tags)))];

type SortKey = "date" | "name" | "occupation";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

function ChevronUpDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("すべて");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState<Appointment | null>(null);

  const filtered = useMemo(() => {
    let list = allAppointments;

    if (activeTag !== "すべて") {
      list = list.filter((a) => a.tags.includes(activeTag));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.occupation.toLowerCase().includes(q) ||
          a.details.toLowerCase().includes(q)
      );
    }

    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = a.date.localeCompare(b.date);
      if (sortKey === "name") cmp = a.name.localeCompare(b.name, "ja");
      if (sortKey === "occupation") cmp = a.occupation.localeCompare(b.occupation, "ja");
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [search, activeTag, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const SortHeader = ({ label, col }: { label: string; col: SortKey }) => (
    <button
      onClick={() => toggleSort(col)}
      className="flex items-center gap-1 text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider hover:text-[#FF6B81] transition-colors"
    >
      {label}
      <ChevronUpDownIcon className="w-3.5 h-3.5" />
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FFF8F8] flex">
      <Sidebar />

      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-[#F0E8E8] px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#8A8A8A]">全 {allAppointments.length} 件</p>
            <h2 className="text-lg font-bold text-[#2C2C2C]">Meet一覧</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2C2C2]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="名前・職種・メモで検索..."
                className="pl-9 pr-4 py-2 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#FF6B81] focus:bg-white focus:outline-none text-[#2C2C2C] placeholder-[#C2C2C2] text-sm transition-all duration-200 w-64"
              />
            </div>

            <button className="flex items-center gap-2 py-2 px-4 rounded-full text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] shadow-[0_4px_16px_rgba(255,107,129,0.35)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(255,107,129,0.45)] active:scale-[0.98] transition-all duration-200">
              <PlusIcon className="w-4 h-4" />
              新規Meet
            </button>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {/* List area */}
          <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${selected ? "mr-[400px]" : ""}`}>
            {/* Tag filter */}
            <div className="px-8 py-4 flex items-center gap-2 flex-wrap border-b border-[#F0E8E8] bg-white">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeTag === tag
                      ? "bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] text-white shadow-[0_2px_8px_rgba(255,107,129,0.3)]"
                      : "bg-[#F5F5F7] text-[#8A8A8A] hover:bg-[#FFF0F2] hover:text-[#FF6B81]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto px-8 py-4">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <p className="text-[#C2C2C2] text-sm">該当するMeetが見つかりませんでした</p>
                  <button
                    onClick={() => { setSearch(""); setActiveTag("すべて"); }}
                    className="text-[#FF6B81] text-sm font-medium hover:underline"
                  >
                    フィルターをリセット
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] overflow-hidden">
                  {/* Table header */}
                  <div className="grid grid-cols-[2fr_1.5fr_1fr_1.5fr_auto] gap-4 px-6 py-3 border-b border-[#F0E8E8] bg-[#FFF8F8]">
                    <SortHeader label="名前" col="name" />
                    <SortHeader label="職種" col="occupation" />
                    <SortHeader label="日付" col="date" />
                    <span className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">タグ</span>
                    <span className="w-8" />
                  </div>

                  {/* Table rows */}
                  {filtered.map((appo, i) => (
                    <button
                      key={appo.id}
                      onClick={() => setSelected(selected?.id === appo.id ? null : appo)}
                      className={`w-full grid grid-cols-[2fr_1.5fr_1fr_1.5fr_auto] gap-4 px-6 py-4 text-left transition-colors
                        ${i !== 0 ? "border-t border-[#F0E8E8]" : ""}
                        ${selected?.id === appo.id
                          ? "bg-[#FFF0F2]"
                          : "hover:bg-[#FFF8F8]"}
                      `}
                    >
                      {/* Name + avatar */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69] flex items-center justify-center shrink-0">
                          <span className="text-white font-bold text-xs">{appo.name.charAt(0)}</span>
                        </div>
                        <span className="text-[#2C2C2C] font-semibold text-sm truncate">{appo.name}</span>
                      </div>

                      {/* Occupation */}
                      <span className="text-[#8A8A8A] text-sm self-center truncate">{appo.occupation}</span>

                      {/* Date */}
                      <span className="text-[#8A8A8A] text-sm self-center">{appo.date}</span>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 self-center">
                        {appo.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#FFF0F2] text-[#FF6B81] border border-[#FFB3BF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Chevron */}
                      <ChevronDownIcon
                        className={`w-4 h-4 text-[#C2C2C2] self-center transition-transform duration-200 ${
                          selected?.id === appo.id ? "rotate-180 text-[#FF6B81]" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}

              <p className="text-center text-xs text-[#C2C2C2] mt-4">
                {filtered.length} 件を表示中
              </p>
            </div>
          </div>

          {/* Detail panel */}
          {selected && (
            <aside className="fixed right-0 top-0 bottom-0 w-[400px] bg-white border-l border-[#F0E8E8] shadow-[-4px_0_30px_rgba(0,0,0,0.06)] flex flex-col z-20 overflow-y-auto">
              {/* Panel header */}
              <div className="px-6 py-5 border-b border-[#F0E8E8] flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-base font-bold text-[#2C2C2C]">詳細</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FFF0F2] text-[#8A8A8A] hover:text-[#FF6B81] transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 px-6 py-6 flex flex-col gap-6">
                {/* Avatar + name */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69] flex items-center justify-center shadow-[0_4px_16px_rgba(255,107,129,0.35)]">
                    <span className="text-white font-bold text-2xl">{selected.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-[#2C2C2C] text-xl font-bold">{selected.name}</p>
                    <p className="text-[#8A8A8A] text-sm mt-0.5">{selected.occupation}</p>
                  </div>
                </div>

                {/* Date */}
                <div className="bg-[#FFF8F8] rounded-[12px] px-4 py-3 border border-[#F0E8E8]">
                  <p className="text-[#8A8A8A] text-xs font-medium mb-1">日付</p>
                  <p className="text-[#2C2C2C] text-sm font-semibold">{selected.date}</p>
                </div>

                {/* Tags */}
                <div>
                  <p className="text-[#8A8A8A] text-xs font-medium mb-2">タグ</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFF0F2] text-[#FF6B81] border border-[#FFB3BF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <p className="text-[#8A8A8A] text-xs font-medium mb-2">メモ</p>
                  <p className="text-[#2C2C2C] text-sm leading-relaxed bg-[#FFF8F8] rounded-[12px] px-4 py-3 border border-[#F0E8E8]">
                    {selected.details}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <button className="w-full py-3 px-6 rounded-full text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] shadow-[0_4px_16px_rgba(255,107,129,0.35)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(255,107,129,0.45)] active:scale-[0.98] transition-all duration-200">
                    編集する
                  </button>
                  <button className="w-full py-3 px-6 rounded-full text-[#FF6B81] font-semibold text-sm border-2 border-[#FF6B81] bg-white hover:bg-[#FFF0F2] active:scale-[0.98] transition-all duration-200">
                    削除する
                  </button>
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}
