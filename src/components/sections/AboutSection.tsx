import RevealOnScroll from "@/components/ui/RevealOnScroll";
import SectionHeader from "@/components/ui/SectionHeader";

const TargetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DiamondIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.57a2.41 2.41 0 0 0 3.41 0l7.57-7.57a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const HandshakeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 17a4.5 4.5 0 0 1 0-9" />
    <path d="M13 7a4.5 4.5 0 0 1 0 9" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="m16.24 16.24 2.83 2.83" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="m16.24 7.76 2.83-2.83" />
  </svg>
);

const values = [
  {
    icon: <TargetIcon />,
    title: "พันธกิจ",
    description:
      "วิจัยและพัฒนานวัตกรรมที่ตอบสนองความต้องการของคนพิการในประเทศไทย โดยยึดผู้ใช้เป็นศูนย์กลาง",
  },
  {
    icon: <EyeIcon />,
    title: "วิสัยทัศน์",
    description:
      "สังคมไทยที่คนพิการทุกคนสามารถดำรงชีวิตอย่างมีคุณภาพ เท่าเทียม และเต็มศักยภาพ",
  },
  {
    icon: <DiamondIcon />,
    title: "คุณค่าหลัก",
    description:
      "ความเท่าเทียม ความครอบคลุม ความโปร่งใส และการพัฒนาอย่างยั่งยืนเพื่อสังคม",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{ padding: "clamp(60px, 8vw, 100px) clamp(16px, 4vw, 24px)", background: "white" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <RevealOnScroll>
          <SectionHeader
            label="เกี่ยวกับเรา"
            title="วิสาหกิจเพื่อสังคมที่"
            highlight="ขับเคลื่อนโดยคนพิการเพื่อเพื่อนคนพิการ"
            description="เราเชื่อว่านวัตกรรมสามารถเปลี่ยนแปลงชีวิตคนพิการได้อย่างแท้จริง ด้วยนักวจัย นักออกแบบ และผู้เชี่ยวชาญที่มีประสบการณ์มากกว่า 10 ปี"          />
        </RevealOnScroll>

        {/* Stats row */}
        <RevealOnScroll>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              padding: "32px",
              borderRadius: "16px",
              background: "var(--white)",
              border: "1px solid var(--border)",
              marginBottom: "28px",
            }}
          >
            {[
              { num: "2566", label: "ปีที่ก่อตั้งบริษัท" },
              { num: "2568", label: "จดทะเบียนวิสาหกิจเพื่อสังคม ภายใต้ สวส." },
            ].map((item, i) => (
              <div
                key={item.num}
                style={{
                  paddingLeft: i !== 0 ? "24px" : 0,
                  borderLeft: i !== 0 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-kanit)",
                    fontSize: "40px",
                    fontWeight: 700,
                    color: "var(--teal)",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {item.num}
                </div>
                <div style={{ fontSize: "15px", color: "var(--text-min)", lineHeight: 1.5 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "28px",
            marginBottom: "60px",
          }}
        >
          {values.map((value, i) => (
            <RevealOnScroll key={value.title} delay={i * 100}>
              <div
                style={{
                  padding: "32px",
                  borderRadius: "16px",
                  background: "var(--cream)",
                  border: "1px solid var(--border)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "var(--teal-pale)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--teal)",
                    marginBottom: "16px",
                  }}
                  aria-hidden="true"
                >
                  {value.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-kanit)",
                    fontWeight: 700,
                    fontSize: "22px",
                    color: "var(--navy)",
                    marginBottom: "10px",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    fontSize: "17px",
                    color: "var(--text-mid)",
                    lineHeight: 1.8,
                    margin: 0,
                  }}
                >
                  {value.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div
            style={{
              padding: "clamp(24px, 4vw, 40px)",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, var(--navy), var(--navy-mid))",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "28px",
            }}
          >
            {/* header: center */}
            <div style={{ textAlign: "center" }}>
              <h3
                style={{
                  fontFamily: "var(--font-kanit)",
                  fontWeight: 700,
                  fontSize: "24px",
                  marginBottom: "12px",
                }}
              >
                จดทะเบียนในฐานะ
                <br />
                <span style={{ color: "#2DA88E" }}>วิสาหกิจเพื่อสังคม</span>
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.75)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                ภายใต้การกำกับของสำนักงานส่งเสริมวิสาหกิจเพื่อสังคม (สวส.)
                <br />
                กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
              </p>
            </div>

            {/* divider */}
            <div
              style={{
                width: "100%",
                height: "1px",
                background: "rgba(255,255,255,0.1)",
              }}
            />

            {/* 3 features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 w-full">
              {[
                { icon: <ClipboardIcon />, text: "กำไรส่วนใหญ่นำกลับสู่สังคม" },
                { icon: <BuildingIcon />,   text: "โปร่งใส ตรวจสอบได้" },
                { icon: <HandshakeIcon />,  text: "เป็นพาร์ตเนอร์กับ 20+ องค์กร" },
              ].map((item, i) => (
                <div
                  key={item.text}
                  className={[
                    "flex items-center gap-3 py-3 px-6",
                    i !== 0 ? "" : "",
                  ].join(" ")}
                >
                  <span style={{ color: "rgba(255,255,255,0.85)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span style={{ fontSize: "17px", color: "rgba(255,255,255,0.85)" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Team section */}
        <RevealOnScroll>
          <div style={{ marginTop: "28px" }}>
            <h3
              style={{
                fontFamily: "var(--font-kanit)",
                fontWeight: 700,
                fontSize: "22px",
                color: "var(--navy)",
                marginBottom: "20px",
              }}
            >
              ทีมผู้ก่อตั้ง
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                { img: "/width-346.webp",   name: "อนุรักษ์ ปฐมลิขิตกาญจน์", role: "ผู้ก่อตั้งบริษัท" },
                { img: "/width-346-2.webp", name: "ธวัชพงศ์ หาเรือนโภค",      role: "ผู้ร่วมก่อตั้งบริษัท" },
              ].map((person) => (
                <div
                  key={person.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "20px 24px",
                    borderRadius: "14px",
                    background: "var(--cream)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={person.img}
                    alt={person.name}
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-kanit)",
                        fontWeight: 700,
                        fontSize: "17px",
                        color: "var(--navy)",
                        marginBottom: "4px",
                      }}
                    >
                      {person.name}
                    </div>
                    <div style={{ fontSize: "14px", color: "var(--text-mid)" }}>
                      {person.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
