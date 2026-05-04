"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminCard from "@/components/admin/AdminCard";
import AdminInput from "@/components/admin/AdminInput";
import AdminTextarea from "@/components/admin/AdminTextarea";
import AdminSelect from "@/components/admin/AdminSelect";
import AdminButton from "@/components/admin/AdminButton";
import AdminToast from "@/components/admin/AdminToast";

const CATEGORIES = [
  { value: "research", label: "วิจัย" },
  { value: "product", label: "ผลิตภัณฑ์" },
  { value: "community", label: "ชุมชน" },
  { value: "award", label: "รางวัล" },
];

const CATEGORY_LABELS: Record<string, string> = {
  research: "วิจัย",
  product: "ผลิตภัณฑ์",
  community: "ชุมชน",
  award: "รางวัล",
};

const AddPhoto = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1f1f1f"
  >
    <path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z" />
  </svg>
);

const BG_COLORS = [
  { value: "from-teal-50 to-teal-100", label: "Teal" },
  { value: "from-amber-50 to-amber-100", label: "Amber" },
  { value: "from-indigo-50 to-indigo-100", label: "Indigo" },
  { value: "from-red-50 to-red-100", label: "Red" },
  { value: "from-teal-50 to-emerald-100", label: "Emerald" },
  { value: "from-violet-50 to-indigo-100", label: "Violet" },
];

export default function PortfolioEditPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/portfolio/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setForm(d);
        setLoading(false);
      });
  }, [id]);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        categoryLabel: CATEGORY_LABELS[form.category] || form.categoryLabel,
      };
      const res = await fetch(`/api/admin/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setToast({ msg: "บันทึกสำเร็จ", type: "success" });
      else setToast({ msg: "เกิดข้อผิดพลาด", type: "error" });
    } catch {
      setToast({ msg: "เกิดข้อผิดพลาด", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  if (loading)
    return (
      <div style={{ fontFamily: "var(--font-sarabun)" }}>กำลังโหลด...</div>
    );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("image", reader.result as string);
    reader.readAsDataURL(file);
  }
  
  return (
    <div>
      <h1
        style={{
          fontSize: "26px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "24px",
          fontFamily: "var(--font-kanit)",
        }}
      >
        แก้ไขผลงาน
      </h1>

      <AdminCard>
        <div className="my-1">
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              color: "#374151",
              marginBottom: "8px",
            }}
          >
            รูปภาพผลงาน
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {form.image ? (
              <img
                src={form.image}
                alt="preview"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "1px solid #E5E7EB",
                }}
              />
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "10px",
                  border: "2px dashed #D1D5DB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9CA3AF",
                  fontSize: "28px",
                }}
              >
                <AddPhoto />
              </div>
            )}
            <div>
              <input
                type="file"
                id="service-image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="service-image"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  background: "#F3F4F6",
                  border: "1px solid #D1D5DB",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                {form.image ? "เปลี่ยนรูป" : "เลือกรูป"}
              </label>
              {form.image && (
                <button
                  type="button"
                  onClick={() => set("image", "")}
                  style={{
                    marginLeft: "8px",
                    fontSize: "13px",
                    color: "#EF4444",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ลบ
                </button>
              )}
            </div>
          </div>
        </div>
        <AdminSelect
          label="หมวดหมู่"
          value={form.category || "research"}
          onChange={(v) => set("category", v)}
          options={CATEGORIES}
        />
        <AdminInput
          label="ชื่อผลงาน"
          value={form.title || ""}
          onChange={(v) => set("title", v)}
          required
        />
        <AdminTextarea
          label="คำอธิบาย"
          value={form.description || ""}
          onChange={(v) => set("description", v)}
          required
        />
        <AdminSelect
          label="สีพื้นหลัง"
          value={form.bgColor || "from-teal-50 to-teal-100"}
          onChange={(v) => set("bgColor", v)}
          options={BG_COLORS}
        />
        <AdminInput
          label="ปี"
          value={form.year || ""}
          onChange={(v) => set("year", v)}
          placeholder="2567"
        />
        <AdminInput
          label="ทีมงาน"
          value={form.team || ""}
          onChange={(v) => set("team", v)}
        />
        <AdminInput
          label="รางวัล"
          value={form.award || ""}
          onChange={(v) => set("award", v)}
        />
        <AdminInput
          label="จำนวนผู้ได้รับประโยชน์"
          value={form.reach || ""}
          onChange={(v) => set("reach", v)}
        />
        <AdminInput
          label="สถานะ"
          value={form.status || ""}
          onChange={(v) => set("status", v)}
        />
      </AdminCard>

      <div style={{ display: "flex", gap: "12px" }}>
        <AdminButton onClick={handleSave} loading={saving}>
          บันทึก
        </AdminButton>
        <AdminButton
          variant="secondary"
          onClick={() => router.push("/admin/portfolio")}
        >
          ยกเลิก
        </AdminButton>
      </div>

      {toast && (
        <AdminToast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
