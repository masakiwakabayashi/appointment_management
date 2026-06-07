import Sidebar from "@/components/Sidebar";

const sampleAppointments = [
  {
    id: "1",
    name: "田中 太郎",
    occupation: "エンジニア",
    details: "新規プロジェクトについて打ち合わせ予定。技術スタックの選定も含めて議論したい。",
    tags: ["エンジニア", "新規"],
    date: "2026-05-28",
  },
  {
    id: "2",
    name: "鈴木 花子",
    occupation: "デザイナー",
    details: "UIリニューアルの相談。現行デザインの課題整理から始める予定。",
    tags: ["デザイン"],
    date: "2026-05-27",
  },
  {
    id: "3",
    name: "佐藤 健",
    occupation: "営業部長",
    details: "パートナーシップの可能性を探る。まずは各社の強みを共有する場にしたい。",
    tags: ["営業", "重要"],
    date: "2026-05-25",
  },
  {
    id: "4",
    name: "山田 美咲",
    occupation: "マーケター",
    details: "SNS戦略について意見交換。直近のキャンペーン結果をもとに方向性を議論する。",
    tags: ["マーケ"],
    date: "2026-05-22",
  },
  {
    id: "5",
    name: "伊藤 龍一",
    occupation: "プロダクトマネージャー",
    details: "ロードマップのすり合わせ。Q3の優先度について合意を取りたい。",
    tags: ["PM", "重要"],
    date: "2026-05-20",
  },
  {
    id: "6",
    name: "中村 さくら",
    occupation: "カスタマーサクセス",
    details: "既存顧客からのフィードバック共有。プロダクト改善への反映方法も検討。",
    tags: ["CS"],
    date: "2026-05-18",
  },
];

const stats = [
  { label: "総Meet数", value: "24", unit: "件", change: "+3 今月" },
  { label: "今月のMeet", value: "8", unit: "件", change: "+2 先月比" },
  { label: "タグ数", value: "12", unit: "種", change: "3 カテゴリ" },
  { label: "今週の予定", value: "3", unit: "件", change: "次は明日" },
];



function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F8] flex">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-[#F0E8E8] px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#8A8A8A]">おはようございます 👋</p>
            <h2 className="text-lg font-bold text-[#2C2C2C]">ダッシュボード</h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C2C2C2]" />
              <input
                type="text"
                placeholder="Meetを検索..."
                className="pl-9 pr-4 py-2 rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#FF6B81] focus:bg-white focus:outline-none text-[#2C2C2C] placeholder-[#C2C2C2] text-sm transition-all duration-200 w-56"
              />
            </div>

            {/* Bell */}
            <div className="relative">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FFF0F2] transition-colors">
                <BellIcon className="w-5 h-5 text-[#8A8A8A]" />
              </button>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] text-white text-[9px] font-bold">
                3
              </span>
            </div>

            {/* New appointment button */}
            <button className="flex items-center gap-2 py-2 px-4 rounded-full text-white font-semibold text-sm tracking-wide bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] shadow-[0_4px_16px_rgba(255,107,129,0.35)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(255,107,129,0.45)] active:scale-[0.98] transition-all duration-200">
              <PlusIcon className="w-4 h-4" />
              新規Meet
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-6 flex flex-col gap-6">

          {/* Stats grid */}
          <section className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-5"
              >
                <p className="text-[#8A8A8A] text-sm">{stat.label}</p>
                <div className="flex items-end gap-1 mt-2">
                  <p className="text-[#2C2C2C] font-bold text-3xl leading-none">{stat.value}</p>
                  <p className="text-[#FF6B81] text-sm font-medium mb-0.5">{stat.unit}</p>
                </div>
                <p className="text-[#C2C2C2] text-xs mt-2">{stat.change}</p>
              </div>
            ))}
          </section>

          {/* Highlight banner */}
          <section>
            <div className="rounded-[20px] bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] p-6 shadow-[0_4px_16px_rgba(255,107,129,0.35)] text-white flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">次のMeet</p>
                <p className="text-2xl font-bold mt-1">田中 太郎さん</p>
                <p className="text-sm opacity-80 mt-0.5">エンジニア・新規プロジェクトについて</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold bg-white/20 rounded-full px-4 py-2">
                  2026年5月28日
                </span>
                <button className="text-sm font-semibold bg-white text-[#FF6B81] rounded-full px-5 py-2 hover:bg-[#FFF0F2] transition-colors active:scale-[0.98]">
                  詳細を見る
                </button>
              </div>
            </div>
          </section>

          {/* Appointments grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#2C2C2C] text-[18px] font-semibold">最近のMeet</h3>
              <button className="text-[#FF6B81] text-sm font-medium hover:underline">
                すべて見る
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sampleAppointments.map((appo) => (
                <div
                  key={appo.id}
                  className="bg-white rounded-[16px] border border-[#F0E8E8] shadow-[0_2px_12px_rgba(255,107,129,0.08)] p-5 hover:shadow-[0_4px_20px_rgba(255,107,129,0.15)] transition-shadow cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">
                          {appo.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[#2C2C2C] font-semibold text-[15px]">{appo.name}</p>
                        <p className="text-[#8A8A8A] text-xs mt-0.5">{appo.occupation}</p>
                      </div>
                    </div>
                    <p className="text-[#C2C2C2] text-xs shrink-0">{appo.date}</p>
                  </div>

                  <p className="text-[#8A8A8A] text-sm mt-3 line-clamp-2 leading-relaxed">
                    {appo.details}
                  </p>

                  {appo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {appo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FFF0F2] text-[#FF6B81] border border-[#FFB3BF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
