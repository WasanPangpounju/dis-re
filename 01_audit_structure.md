# Prompt สำหรับ Claude Code — ตรวจสอบโครงสร้างโปรเจกต์ปัจจุบัน

วางไฟล์นี้ไว้ใน root ของโปรเจกต์ หรือ copy prompt ด้านล่างไปวางใน Claude Code terminal โดยตรง

---

## วิธีใช้

เปิด terminal ที่ root ของโปรเจกต์ แล้วรัน:

```bash
claude
```

จากนั้นพิมพ์ prompt ด้านล่างนี้:

---

## Prompt ที่ต้องวางใน Claude Code

```
กรุณาทำ 5 อย่างต่อไปนี้แล้วแสดงผลครบทุกข้อ:

1. แสดงโครงสร้างไฟล์ทั้งหมด (tree) ของโปรเจกต์นี้ ลึกสุด 4 ระดับ ยกเว้น node_modules, .next, .git

2. แสดงเนื้อหาของไฟล์เหล่านี้ทั้งหมด:
   - src/lib/constants.ts  (หรือ constants.js ถ้าไม่มี .ts)
   - src/app/api/chat/route.ts
   - src/app/layout.tsx
   - src/app/page.tsx

3. แสดง dependencies ทั้งหมดจาก package.json (dependencies และ devDependencies)

4. ตรวจสอบว่ามีไฟล์เหล่านี้อยู่ไหม และแสดงเนื้อหาถ้ามี:
   - prisma/schema.prisma
   - src/lib/db.ts หรือ src/lib/database.ts
   - src/middleware.ts
   - next.config.ts หรือ next.config.js

5. แสดง environment variables ทั้งหมดจาก .env.example (ไม่ต้องแสดง .env.local)

สรุปท้ายว่า:
- Database ปัจจุบันคืออะไร (มีหรือไม่มี)
- Authentication ปัจจุบันคืออะไร (มีหรือไม่มี)
- ข้อมูล content อยู่ที่ไหน (constants.ts / database / อื่นๆ)
```

---

## หลังจากได้ผลลัพธ์

**Copy output ทั้งหมดจาก Claude Code แล้วส่งให้ Claude (chat นี้)** เพื่อวางแผน CMS
ที่เหมาะสมกับโครงสร้างที่มีอยู่จริงครับ
