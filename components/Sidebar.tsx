"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { id: "home", label: "ダッシュボード", href: "/", icon: HomeIcon },
  { id: "appointments", label: "Meet一覧", href: "/appointments", icon: CalendarIcon },
  { id: "add", label: "新規Meet追加", href: "/appointments/new", icon: PlusIcon },
  { id: "tags", label: "タグ管理", href: "/tags", icon: TagIcon },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-60 bg-white border-r border-[#F0E8E8] flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#F0E8E8]">
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF6B81] to-[#FF8C69] bg-clip-text text-transparent">
          MeetLog
        </h1>
        <p className="text-[11px] text-[#C2C2C2] mt-0.5">Appointment Manager</p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-xl w-full
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-[#FFF0F2] text-[#FF6B81]"
                  : "text-[#8A8A8A] hover:bg-[#FFF8F8] hover:text-[#2C2C2C]"}
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User profile */}
      <div className="px-4 py-4 border-t border-[#F0E8E8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B81] to-[#FF8C69] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">田</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#2C2C2C] truncate">田中 太郎</p>
            <p className="text-xs text-[#8A8A8A]">管理者</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
