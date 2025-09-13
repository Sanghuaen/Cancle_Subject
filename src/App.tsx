// src/App.tsx
import CourseForm from "./components/Coursefrom";
import CourseList from "./components/CourseList";
import CourseDrop from "./components/CourseDrop";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-xl font-bold">ระบบ เพิ่ม-ถอนรายวิชา</h1>
      <CourseForm />
      <CourseList />
      <CourseDrop />
    </div>
  );
}

export default App;
