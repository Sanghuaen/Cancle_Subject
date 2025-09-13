import React, { useState, useRef } from "react";
import { useCourseStore } from "../CourseStore";

const CourseForm = () => {
  const { addCourse } = useCourseStore();

  const [course, setCourse] = useState({
    id: "",
    nameTH: "",
    nameEN: "",
    credits: 3,
    teacher: "",
    grade: "",
  });

  const idRef = useRef(null);
  const nameTHRef = useRef(null);
  const nameENRef = useRef(null);
  const creditsRef = useRef(null);
  const teacherRef = useRef(null);
  const gradeRef = useRef(null);
  const refs = [idRef, nameTHRef, nameENRef, creditsRef, teacherRef, gradeRef];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
  
  const handleAddCourse = () => {
    if (course.id && course.nameTH && course.credits > 0) {
      addCourse({ ...course, credits: Number(course.credits) });
      setCourse({
        id: "",
        nameTH: "",
        nameEN: "",
        credits: 3,
        teacher: "",
        grade: "",
      });
      if (idRef.current) {
        (idRef.current as HTMLInputElement).focus();
      }
    } else {
      console.error("Please fill in all required fields.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.key === 'Enter') {
      const currentInputIndex = refs.findIndex(ref => ref.current === document.activeElement);
      const nextInput = refs[currentInputIndex + 1];

      if (nextInput && nextInput.current) {
        (nextInput.current as HTMLInputElement | HTMLSelectElement).focus();
      } else {
        handleAddCourse();
      }
      e.preventDefault();
    }
  };

  return (
    <div className="mx-auto max-w-md flex flex-col gap-4 p-6 bg-gray-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-white text-center">เพิ่มรายวิชา</h2>
      <div className="flex flex-col gap-2">
        <input
          ref={idRef}
          type="text"
          name="id"
          value={course.id}
          placeholder="รหัสวิชา"
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <input
          ref={nameTHRef}
          type="text"
          name="nameTH"
          value={course.nameTH}
          placeholder="ชื่อวิชา (ไทย)"
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <input
          ref={nameENRef}
          type="text"
          name="nameEN"
          value={course.nameEN}
          placeholder="ชื่อวิชา (อังกฤษ)"
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <input
          ref={creditsRef}
          type="number"
          name="credits"
          value={course.credits}
          placeholder="หน่วยกิต"
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <input
          ref={teacherRef}
          type="text"
          name="teacher"
          value={course.teacher}
          placeholder="ชื่ออาจารย์"
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <select
          ref={gradeRef}
          name="grade"
          value={course.grade}
          onChange={handleChange}
          className="p-2 rounded-md border border-gray-600 bg-gray-700 text-white"
          onKeyDown={handleKeyPress}
        >
          <option value="">เลือกเกรด</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="F">F</option>
          <option value="W">W</option>
          
        </select>
      </div>
      <button onClick={handleAddCourse} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700">เพิ่มรายวิชา</button>
    </div>
  );
};

export default CourseForm;
