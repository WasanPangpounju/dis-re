import type { PortfolioItem, Service, Product, AccessibilityFeature, Stat } from './types'

export const COMPANY = {
  name: 'บริษัท การวิจัยนวัตกรรมเพื่อคนพิการ วิสาหกิจเพื่อสังคม จำกัด',
  shortName: 'การวิจัยนวัตกรรมเพื่อคนพิการ',
  tagline: 'นวัตกรรมเพื่อคนพิการทุกคน',
  description:
    'วิสาหกิจเพื่อสังคมที่มุ่งสร้างนวัตกรรมและงานวิจัย เพื่อยกระดับคุณภาพชีวิตคนพิการในประเทศไทยอย่างยั่งยืน',
  registrationNumber: '0105567XXXXX',
  address: '123 ถนนนวัตกรรม แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900',
  phone: '02-xxx-xxxx',
  email: 'info@disabilityresearch.co.th',
  accessibilityHotline: '0800-xxx-xxx',
  socialMedia: {
    facebook: 'https://facebook.com/',
    line: 'https://line.me/',
    youtube: 'https://youtube.com/',
  },
}

export const STATS: Stat[] = [
  { number: '50+', label: 'โครงการวิจัย' },
  { number: '12', label: 'ผลิตภัณฑ์ที่พัฒนา' },
  { number: '5,000+', label: 'ผู้ได้รับประโยชน์' },
]

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'vision-ai',
    category: 'research',
    categoryLabel: 'วิจัย',
    emoji: '🔬',
    bgColor: 'from-teal-50 to-teal-100',
    title: 'ระบบนำทางสำหรับผู้พิการทางสายตาด้วย AI',
    description:
      'วิจัยและพัฒนาระบบ Computer Vision ที่ช่วยให้ผู้ตาบอดสามารถนำทางในพื้นที่สาธารณะได้ด้วยตนเอง',
    year: '2567',
    team: 'ทีมวิจัย AI',
  },
  {
    id: 'braille-audio',
    category: 'product',
    categoryLabel: 'ผลิตภัณฑ์',
    emoji: '🎧',
    bgColor: 'from-amber-50 to-amber-100',
    title: 'หูฟังแปลงเสียงอักษรเบรลล์',
    description:
      'อุปกรณ์ที่แปลงข้อความดิจิทัลเป็นเสียงภาษาไทยเพื่อช่วยผู้พิการทางสายตาเข้าถึงข้อมูล',
    year: '2566',
    award: 'รางวัล NECTEC',
  },
  {
    id: 'health-project',
    category: 'community',
    categoryLabel: 'ชุมชน',
    emoji: '🏘️',
    bgColor: 'from-indigo-50 to-indigo-100',
    title: 'โครงการ "สุขภาพดีไม่มีอุปสรรค"',
    description:
      'โครงการเข้าถึงบริการสุขภาพสำหรับคนพิการในพื้นที่ห่างไกล ครอบคลุม 5 จังหวัด',
    year: '2566–2567',
    reach: '1,200 คน',
  },
  {
    id: 'national-award',
    category: 'award',
    categoryLabel: 'รางวัล',
    emoji: '🏆',
    bgColor: 'from-red-50 to-red-100',
    title: 'รางวัลนวัตกรรมเพื่อสังคม ระดับชาติ 2566',
    description:
      'ได้รับรางวัลจากสำนักงานนวัตกรรมแห่งชาติในหมวดนวัตกรรมเพื่อคนพิการยอดเยี่ยม',
    year: '2566',
    award: 'NIA Award',
  },
  {
    id: 'mental-health',
    category: 'research',
    categoryLabel: 'วิจัย',
    emoji: '🧠',
    bgColor: 'from-teal-50 to-emerald-100',
    title: 'การวิจัยความต้องการด้านสุขภาพจิตคนพิการ',
    description:
      'สำรวจและวิเคราะห์ความต้องการด้านสุขภาพจิตของคนพิการในประเทศไทย กลุ่มตัวอย่าง 800 คน',
    year: '2567',
    status: 'ตีพิมพ์แล้ว',
  },
  {
    id: 'digital-classroom',
    category: 'community',
    categoryLabel: 'ชุมชน',
    emoji: '📚',
    bgColor: 'from-violet-50 to-indigo-100',
    title: 'ห้องเรียนดิจิทัลสำหรับนักเรียนพิการ',
    description:
      'พัฒนาระบบการเรียนออนไลน์ที่รองรับนักเรียนพิการทุกประเภทในโรงเรียน 30 แห่ง',
    year: '2565–2566',
    reach: '30 โรงเรียน',
  },
]

export const SERVICES: Service[] = [
  {
    id: 'research',
    icon: '🔬',
    title: 'วิจัยและพัฒนาเฉพาะทาง',
    description:
      'บริการวิจัยเชิงประยุกต์ด้านนวัตกรรมสำหรับคนพิการ ทั้งด้านเทคโนโลยี สุขภาพ และการออกแบบ',
    features: [
      'Research Design & Methodology',
      'User Research กับกลุ่มคนพิการ',
      'วิเคราะห์ข้อมูลและรายงาน',
      'ตีพิมพ์ผลงานวิชาการ',
    ],
  },
  {
    id: 'universal-design',
    icon: '♿',
    title: 'ออกแบบ Universal Design',
    description:
      'ให้คำปรึกษาและออกแบบผลิตภัณฑ์ บริการ และพื้นที่ที่ทุกคนเข้าถึงได้',
    features: [
      'Accessibility Audit',
      'UX/UI Design สำหรับคนพิการ',
      'WCAG Compliance Review',
      'Inclusive Design Workshop',
    ],
  },
  {
    id: 'assistive-tech',
    icon: '🤖',
    title: 'พัฒนาเทคโนโลยี Assistive',
    description:
      'ออกแบบและพัฒนาซอฟต์แวร์ แอปพลิเคชัน และอุปกรณ์ช่วยเหลือสำหรับคนพิการ',
    features: [
      'Screen Reader & TTS Systems',
      'Computer Vision for Blind',
      'แอปสื่อสารสำหรับผู้พิการพูดไม่ได้',
      'IoT อุปกรณ์ช่วยเหลือ',
    ],
  },
  {
    id: 'consulting',
    icon: '📋',
    title: 'ให้คำปรึกษาองค์กร',
    description:
      'ช่วยองค์กรทั้งภาครัฐและเอกชนพัฒนานโยบายและสภาพแวดล้อมที่เป็นมิตรกับคนพิการ',
    features: [
      'นโยบาย HR ด้านคนพิการ',
      'Disability Inclusion Plan',
      'การอบรมความตระหนักรู้',
      'ติดตามและประเมินผล',
    ],
  },
  {
    id: 'training',
    icon: '🎓',
    title: 'ฝึกอบรมและพัฒนาศักยภาพ',
    description:
      'หลักสูตรฝึกอบรมสำหรับนักวิจัย นักออกแบบ และผู้ให้บริการที่ทำงานกับคนพิการ',
    features: [
      'หลักสูตร Disability Awareness',
      'เทคนิคการสื่อสารกับคนพิการ',
      'การใช้เทคโนโลยีช่วยเหลือ',
      'In-house Training Program',
    ],
  },
  {
    id: 'evaluation',
    icon: '📊',
    title: 'ประเมินและวัดผลโครงการ',
    description:
      'บริการประเมินผลโครงการและนโยบายด้านคนพิการอย่างครอบคลุมด้วยวิธีการที่ยึดหลักฐาน',
    features: [
      'Program Evaluation',
      'Social Impact Assessment',
      'KPI Design สำหรับโปรแกรมคนพิการ',
      'รายงานผลกระทบทางสังคม',
    ],
  },
]

export const PRODUCTS: Product[] = [
  {
    id: 'vision-guide',
    icon: '👁️',
    title: 'VisionGuide AI',
    subtitle: 'ระบบนำทางผู้พิการทางสายตา',
    description:
      'แอปพลิเคชันมือถือที่ใช้ AI วิเคราะห์ภาพจากกล้องเพื่ออ่านป้าย ตรวจจับสิ่งกีดขวาง และนำทางในพื้นที่ต่างๆ สำหรับผู้ตาบอดและผู้มีสายตาเลือนราง',
    tags: ['Computer Vision', 'Text-to-Speech', 'iOS / Android'],
    status: 'เปิดให้ใช้งานแล้ว',
    statusColor: 'teal',
    badge: 'พร้อมใช้งาน',
  },
  {
    id: 'talk-bridge',
    icon: '🎙️',
    title: 'TalkBridge',
    subtitle: 'อุปกรณ์สื่อสารสำหรับผู้พิการทางการพูด',
    description:
      'อุปกรณ์ฮาร์ดแวร์ + ซอฟต์แวร์ที่แปลงการเคลื่อนไหวของดวงตาและสัญญาณสมองเป็นคำพูดได้แบบ Real-time',
    tags: ['Eye Tracking', 'AI Speech', 'Hardware'],
    status: 'Pilot กำลังดำเนินการ',
    statusColor: 'teal',
    badge: 'ใหม่ 2567',
  },
  {
    id: 'access-health',
    icon: '📱',
    title: 'AccessHealth TH',
    subtitle: 'แพลตฟอร์มข้อมูลสุขภาพคนพิการ',
    description:
      'เว็บและแอปให้ข้อมูลสุขภาพสำหรับคนพิการทุกประเภท พร้อม Screen Reader รองรับ WCAG 2.1 AA',
    tags: ['WCAG 2.1 AA', 'Screen Reader', 'ภาษาไทย'],
    status: 'เปิดให้ใช้งานแล้ว',
    statusColor: 'teal',
    badge: 'พร้อมใช้งาน',
  },
  {
    id: 'include-work',
    icon: '🤝',
    title: 'IncludeWork Platform',
    subtitle: 'แพลตฟอร์มจับคู่งานคนพิการ',
    description:
      'ระบบ AI จับคู่นายจ้างกับผู้พิการที่มีทักษะตรงกัน พร้อมเครื่องมือประเมินความพร้อมและสนับสนุนการทำงาน',
    tags: ['Job Matching AI', 'HR Tech', 'B2B / B2C'],
    status: 'เปิดรับ Beta Tester',
    statusColor: 'gold',
    badge: 'กำลังพัฒนา',
  },
]

export const ACCESSIBILITY_FEATURES: AccessibilityFeature[] = [
  {
    icon: '👁️',
    title: 'WCAG 2.1 AA',
    description: 'ผ่านมาตรฐาน Web Content Accessibility Guidelines ระดับ AA',
  },
  {
    icon: '⌨️',
    title: 'Keyboard Navigation',
    description: 'นำทางทั้งเว็บได้ด้วยแป้นพิมพ์ ไม่ต้องใช้เมาส์',
  },
  {
    icon: '🔊',
    title: 'Screen Reader Ready',
    description: 'ทดสอบกับ NVDA, JAWS และ VoiceOver บน iOS',
  },
  {
    icon: '🎨',
    title: 'High Contrast Mode',
    description: 'รองรับ High Contrast และการปรับขนาดฟอนต์',
  },
  {
    icon: '🌏',
    title: 'ภาษาไทยเต็มรูปแบบ',
    description: 'เนื้อหาภาษาไทยทั้งหมด รองรับฟอนต์ขนาดใหญ่',
  },
]

export const NAV_LINKS = [
  { href: '/portfolio', label: 'ผลงาน' },
  { href: '/services', label: 'บริการ' },
  { href: '/products', label: 'ผลิตภัณฑ์' },
  { href: '/#chatbot', label: 'Chat Bot' },
  { href: '/contact', label: 'ติดต่อ' },
]
