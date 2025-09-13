import { create } from "zustand";

// Interface สำหรับข้อมูลรายวิชา
export interface Course {
  id: string;
  nameTH: string;
  nameEN: string;
  credits: number;
  teacher: string;
  grade: string;
}

// Interface สำหรับ State ของ Zustand Store
interface CourseState {
  courses: Course[];
  availableCourses: Course[];
  droppedCourses: Course[];
  addCourse: (course: Course) => void;
  dropCourse: (id: string) => void;
  addDroppedCourse: (course: Course) => void;
  calculateGPA: () => number;
}

// ข้อมูลรายวิชาทั้งหมดที่มีในระบบ
const allCourses: Course[] = [
  { id: "01423223", nameTH: "โครงสร้างข้อมูลและอัลกอริทึม", nameEN: "Data Structure and Algorithm", credits: 3, teacher: "ดร.ประวีน เขื่นแก้ว", grade: "A" },
  { id: "01423321", nameTH: "เว็บเทคโนโลยี", nameEN: "Web Technology", credits: 3, teacher: "อ.อรรถวิท ชังคมานนท์", grade: "B+" },
  { id: "01423351", nameTH: "ฐานข้อมูลเชิงสัมพันธ์", nameEN: "Structure Relational Database", credits: 3, teacher: "อ.อรรถวิท ชังคมานนท์", grade: "C" },
  { id: "01423456", nameTH: "คณิตศาสตร์สำหรับคอมพิวเตอร์", nameEN: "Mathematics for Computer Science", credits: 3, teacher: "ดร.พยุงศักดิ์ เกษมสำราญ",grade: "D" },
  { id: "01423102", nameTH: "วิศวกรรมซอฟต์แวร์", nameEN: "Software Engineering", credits: 3, teacher: "ดร.สมนึก สินธุปวน", grade: "A" },
  
];

// สร้าง Zustand Store
export const useCourseStore = create<CourseState>((set, get) => ({
  courses: allCourses.slice(0, 4), // ตั้งค่าเริ่มต้นให้มี 4 วิชาที่ลงทะเบียนแล้ว
  availableCourses: allCourses.slice(4), // วิชาที่เหลือเป็นวิชาที่สามารถลงทะเบียนได้
  droppedCourses: [], // เริ่มต้นไม่มีวิชาที่ถูกถอน

  addCourse: (course) =>
    set((state) => ({
      courses: [...state.courses, course],
      availableCourses: state.availableCourses.filter((c) => c.id !== course.id),
      droppedCourses: state.droppedCourses.filter((c) => c.id !== course.id),
    })),

  dropCourse: (id) =>
    set((state) => {
      const courseToDrop = state.courses.find((c) => c.id === id);
      return courseToDrop
        ? {
            courses: state.courses.filter((c) => c.id !== id),
            droppedCourses: [...state.droppedCourses, courseToDrop],
          }
        : state;
    }),

  addDroppedCourse: (course) =>
    set((state) => ({
        courses: [...state.courses, course],
        droppedCourses: state.droppedCourses.filter((c) => c.id !== course.id),
    })),

  calculateGPA: () => {
    const { courses } = get();
    if (courses.length === 0) return 0;

    let totalCredits = 0;
    let totalPoints = 0;

    const gradePoint: Record<string, number> = {
      A: 4.0,
      "B+": 3.5,
      B: 3.0,
      "C+": 2.5,
      C: 2.0,
      "D+": 1.5,
      D: 1.0,
      F: 0,
    };

    courses.forEach((c) => {
      const gp = gradePoint[c.grade.toUpperCase()] ?? 0;
      totalCredits += c.credits;
      totalPoints += gp * c.credits;
    });

    return totalCredits === 0 ? 0 : totalPoints / totalCredits;
  },
}));
