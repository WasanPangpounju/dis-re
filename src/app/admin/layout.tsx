"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import type { ReactNode } from "react";

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
  </svg>
);

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M160-160q-33 0-56.5-23.5T80-240v-400q0-33 23.5-56.5T160-720h240l80-80h320q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm73-280h207v-207L233-440Zm-73-40 160-160H160v160Zm0 120v120h640v-480H520v280q0 33-23.5 56.5T440-360H160Zm280-160Z" />
  </svg>
);

const ToolsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M280-720v-40q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760v40h28q24 0 43.5 13.5T780-672l94 216q3 8 4.5 16t1.5 16v184q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-184q0-8 1.5-16t4.5-16l94-216q9-21 28.5-34.5T252-720h28Zm80 0h240v-40H360v40Zm-80 240v-40h80v40h240v-40h80v40h96l-68-160H252l-68 160h96Zm0 80H160v160h640v-160H680v40h-80v-40H360v40h-80v-40Zm200-40Zm0-40Zm0 80Z" />
  </svg>
);

const BoxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="m400-570 80-40 80 40v-190H400v190ZM280-280v-80h200v80H280Zm-80 160q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-640v560-560Zm0 560h560v-560H640v320l-160-80-160 80v-320H200v560Z" />
  </svg>
);

const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z" />
  </svg>
);

const Logout = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
  </svg>
);

const Arrowback = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
  </svg>
);

const Activity = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M200-80q-50 0-85-35t-35-85q0-39 22.5-69.5T160-313v-334q-35-13-57.5-43.5T80-760q0-50 35-85t85-35q39 0 69.5 22.5T313-800h334q12-35 42.5-57.5T760-880q50 0 85 35t35 85q0 40-22.5 70.5T800-647v334q35 13 57.5 43.5T880-200q0 50-35 85t-85 35q-39 0-69.5-22.5T647-160H313q-13 35-43.5 57.5T200-80Zm0-640q17 0 28.5-11.5T240-760q0-17-11.5-28.5T200-800q-17 0-28.5 11.5T160-760q0 17 11.5 28.5T200-720Zm560 0q17 0 28.5-11.5T800-760q0-17-11.5-28.5T760-800q-17 0-28.5 11.5T720-760q0 17 11.5 28.5T760-720ZM313-240h334q9-26 28-45t45-28v-334q-26-9-45-28t-28-45H313q-9 26-28 45t-45 28v334q26 9 45 28t28 45Zm447 80q17 0 28.5-11.5T800-200q0-17-11.5-28.5T760-240q-17 0-28.5 11.5T720-200q0 17 11.5 28.5T760-160Zm-560 0q17 0 28.5-11.5T240-200q0-17-11.5-28.5T200-240q-17 0-28.5 11.5T160-200q0 17 11.5 28.5T200-160Zm0-600Zm560 0Zm0 560Zm-560 0Z" />
  </svg>
);
const NAV: { href: string; label: string; icon: ReactNode }[] = [
  { href: "/admin/general", label: "ข้อมูลทั่วไป", icon: <SettingsIcon /> },
  { href: "/admin/portfolio", label: "ผลงาน", icon: <FolderIcon /> },
  { href: "/admin/activities", label: "กิจกรรม", icon: <Activity /> },
  { href: "/admin/services", label: "บริการ", icon: <ToolsIcon /> },
  { href: "/admin/products", label: "ผลิตภัณฑ์", icon: <BoxIcon /> },
  { href: "/admin/chatbot", label: "Chat Bot", icon: <BotIcon /> },
];
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const sidebarContent = (
    <>
      <div style={{ padding: "24px 20px", borderBottom: "1px solid #f3f4f6" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "18px",
            fontWeight: 700,
            color: "#111827",
            fontFamily: "var(--font-kanit)",
          }}
        >
          <SettingsIcon />
          <span>Admin Panel</span>
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            marginTop: "2px",
            fontFamily: "var(--font-sarabun)",
          }}
        >
          การวิจัยนวัตกรรมเพื่อคนพิการ
        </div>
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "11px 14px",
                borderRadius: "10px",
                marginBottom: "4px",
                background: active ? "#eef2ff" : "transparent",
                color: active ? "#4f46e5" : "#374151",
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: active ? 700 : 400,
                fontFamily: "var(--font-sarabun)",
                transition: "background 0.15s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid #f3f4f6" }}>
        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            color: "#6b7280",
            textDecoration: "none",
            fontSize: "14px",
            fontFamily: "var(--font-sarabun)",
            marginBottom: "4px",
          }}
        >
          <Arrowback />
          <span>ดูหน้าเว็บหลัก</span>
        </Link>

        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 14px",
            borderRadius: "10px",
            background: "#fee2e2",
            color: "#ef4444",
            border: "none",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "var(--font-sarabun)",
          }}
        >
          <Logout />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      {/* Desktop sidebar */}
      <aside
        style={{
          width: "240px",
          background: "white",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
        }}
        className="admin-sidebar-desktop"
      >
        {sidebarContent}
      </aside>

      {/* Mobile hamburger */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          zIndex: 200,
        }}
        className="admin-mobile-header"
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            marginRight: "12px",
            marginBottom: "10px",
          }}
        >
          ☰
        </button>
        <span
          style={{
            fontWeight: 700,
            fontFamily: "var(--font-kanit)",
            fontSize: "16px",
          }}
        >
          Admin Panel
        </span>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 150,
            }}
            onClick={() => setMenuOpen(false)}
          />
          <aside
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "280px",
              background: "white",
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
              boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
            }}
          >
            {sidebarContent}
          </aside>
        </>
      )}

      <main
        style={{ marginLeft: "240px", flex: 1, padding: "32px" }}
        className="admin-main"
      >
        {children}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-main { margin-left: 0 !important; padding-top: 72px !important; }
        }
        @media (min-width: 769px) {
          .admin-mobile-header { display: none !important; }
        }
      `}</style>
    </div>
  );
}
