import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blind Help — แอปพลิเคชันเพื่อคนพิการทางการมองเห็น",
  description:
    "แอปพลิเคชันที่ช่วยสนับสนุนการเข้าถึงการบริการด้านสุขภาพของคนพิการทางการมองเห็น",
};

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

// const PlayCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="64"
//     height="64"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <polygon points="10 8 16 12 10 16 10 8" />
//   </svg>
// );

const healthFeatures = [
  {
    num: "01",
    title: "ตัวช่วยอ่านฉลากยา",
    desc: "ระบบช่วยอ่านข้อมูลยา ให้ถูกต้องแม่นยำ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4M9 14h6" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "เมนูฉุกเฉิน",
    desc: "เข้าถึงความช่วยเหลือได้ทันที กดปุ่มเดียวเพื่อแจ้งเหตุฉุกเฉิน",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5.05 2 2 0 0 1 3.59 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "CHATBOT สุขภาพ",
    desc: "ให้คำปรึกษาสุขภาพเบื้องต้น ตอบคำถามได้ตลอด 24 ชั่วโมง",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "คลังข้อมูลสุขภาพ",
    desc: "รวบรวมข้อมูลที่จำเป็นสำหรับผู้ใช้งาน",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
];

const sexualHealthCards = [
  {
    num: "01",
    title: "AI CHATBOT เพศศึกษา",
    desc: "ให้คำปรึกษาเรื่องสุขภาวะทางเพศอย่างเป็นส่วนตัวและปลอดภัย",
  },
  {
    num: "02",
    title: "เบอร์โทรฉุกเฉินเฉพาะด้าน",
    desc: "มีเบอร์โทรฉุกเฉินเฉพาะด้านสุขภาวะทางเพศพร้อมให้บริการ",
  },
  {
    num: "03",
    title: "แหล่งเรียนรู้",
    desc: "เป็นแหล่งเรียนรู้เรื่องสุขภาวะด้านเพศที่เข้าถึงง่ายสำหรับทุกคน",
  },
];

export default function BlindHelpPage() {
  return (
    <div style={{ paddingTop: "70px", minHeight: "100vh" }}>
      {/* 1. HERO */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D2B45, #1B7E6A)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(45,168,142,0.15)",
            border: "1px solid rgba(45,168,142,0.3)",
            borderRadius: "24px",
            padding: "8px 18px",
            marginBottom: "28px",
          }}
        >
          <span
            className="animate-pulse-dot"
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#2DA88E",
              display: "inline-block",
            }}
            aria-hidden="true"
          />
          <span style={{ color: "#2DA88E", fontSize: "15px", fontWeight: 600 }}>
            แอปพลิเคชันเพื่อคนพิการ
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-kanit)",
            fontWeight: 700,
            fontSize: "clamp(40px, 7vw, 80px)",
            color: "white",
            lineHeight: 1.1,
            margin: "0 0 20px",
            letterSpacing: "-0.02em",
          }}
        >
          BLIND <span style={{ color: "#D4A843" }}>HELP</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.8,
            maxWidth: "600px",
            margin: "0 auto 36px",
          }}
        >
          แอปพลิเคชันที่ช่วยสนับสนุนการเข้าถึงการบริการด้านสุขภาพของคนพิการทางการมองเห็นเป็นหลัก
        </p>

        <Link
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 32px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1B7E6A, #2DA88E)",
            color: "white",
            textDecoration: "none",
            fontFamily: "var(--font-sarabun)",
            fontWeight: 700,
            fontSize: "18px",
          }}
        >
          <PlayIcon /> ดาวน์โหลดแอป
        </Link>
      </div>

      {/* 2. VIDEO SECTION */}
      <div style={{ background: "var(--cream)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(45,168,142,0.1)",
                color: "#2DA88E",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "6px 16px",
                borderRadius: "20px",
                marginBottom: "16px",
              }}
            >
              วิดีโอแนะนำ
            </span>
            <h2
              style={{
                fontFamily: "var(--font-kanit)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#0D2B45",
                margin: 0,
              }}
            >
              ดูวิธีใช้งาน Blind Help
            </h2>
          </div>

          {/* 16:9 video wrapper */}
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#0D2B45",
              border: "1px solid var(--border)",
            }}
          >
            {/* TODO: replace with YouTube URL */}
            <iframe
              src="https://www.youtube.com/embed/CnJf0Ackmec"
              title="วิดีโอแนะนำ Blind Help"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. HEALTH FEATURES */}
      <div style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(45,168,142,0.1)",
                color: "#2DA88E",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "6px 16px",
                borderRadius: "20px",
                marginBottom: "16px",
              }}
            >
              ด้านสุขภาพ
            </span>
            <h2
              style={{
                fontFamily: "var(--font-kanit)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#0D2B45",
                margin: 0,
              }}
            >
              ฟีเจอร์ช่วยดูแลสุขภาพ
            </h2>
          </div>

          <div
            className="health-features-grid"
            style={{ display: "grid", gap: "20px" }}
          >
            {healthFeatures.map((f) => (
              <div
                key={f.num}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(45,168,142,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#2DA88E",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {f.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#2DA88E",
                        letterSpacing: "0.08em",
                        marginBottom: "6px",
                      }}
                    >
                      {f.num}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-kanit)",
                        fontWeight: 700,
                        fontSize: "18px",
                        color: "#0D2B45",
                        margin: "0 0 8px",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "var(--text-mid)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. SEXUAL HEALTH */}
      <div style={{ background: "#0D2B45", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(45,168,142,0.15)",
                color: "#2DA88E",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "6px 16px",
                borderRadius: "20px",
                marginBottom: "16px",
              }}
            >
              สุขภาวะด้านเพศ
            </span>
            <h2
              style={{
                fontFamily: "var(--font-kanit)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "white",
                margin: 0,
              }}
            >
              บริการด้านสุขภาวะเพศ
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "20px" }}
          >
            {sexualHealthCards.map((c) => (
              <div
                key={c.num}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#2DA88E",
                    letterSpacing: "0.08em",
                    marginBottom: "12px",
                  }}
                >
                  {c.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-kanit)",
                    fontWeight: 700,
                    fontSize: "18px",
                    color: "white",
                    margin: "0 0 10px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. CTA */}
      <div
        style={{
          background: "var(--cream)",
          padding: "80px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-kanit)",
              fontWeight: 700,
              fontSize: "clamp(24px, 3vw, 36px)",
              color: "#0D2B45",
              margin: "0 0 12px",
            }}
          >
            พร้อมใช้งาน Blind Help แล้วหรือยัง?
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: "var(--text-mid)",
              marginBottom: "32px",
            }}
          >
            ดาวน์โหลดฟรี รองรับทั้ง iOS และ Android
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 28px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1B7E6A, #2DA88E)",
                color: "white",
                textDecoration: "none",
                fontFamily: "var(--font-sarabun)",
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              <PlayIcon /> ดาวน์โหลดแอป
            </Link>
            <Link
              href="/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                borderRadius: "12px",
                background: "transparent",
                color: "#0D2B45",
                textDecoration: "none",
                fontFamily: "var(--font-sarabun)",
                fontWeight: 700,
                fontSize: "16px",
                border: "2px solid #0D2B45",
              }}
            >
              ดูข้อมูลเพิ่มเติม
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
