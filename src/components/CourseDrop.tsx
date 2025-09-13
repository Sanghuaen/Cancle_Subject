import React from 'react';
import { useCourseStore } from "../CourseStore";

const CourseDrop = () => {
  const { droppedCourses, addDroppedCourse } = useCourseStore();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-white">รายวิชาที่ถอนแล้ว</h2>
      {droppedCourses.length > 0 ? (
        <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider text-gray-200">
                <th className="px-5 py-3 border-b-2 border-gray-600">รหัสวิชา</th>
                <th className="px-5 py-3 border-b-2 border-gray-600">ชื่อวิชา (ไทย)</th>
                <th className="px-5 py-3 border-b-2 border-gray-600">หน่วยกิต</th>
                <th className="px-5 py-3 border-b-2 border-gray-600">อาจารย์</th>
                <th className="px-5 py-3 border-b-2 border-gray-600">เกรด</th>
                <th className="px-5 py-3 border-b-2 border-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {droppedCourses.map((course) => (
                <tr key={course.id} className="text-sm">
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-gray-300">{course.id}</td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-gray-300">{course.nameTH}</td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-gray-300">{course.credits}</td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-gray-300">{course.teacher}</td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-gray-300 font-bold">{course.grade}</td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-right">
                    <button onClick={() => addDroppedCourse(course)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      เพิ่มกลับ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-4">ยังไม่มีรายวิชาที่ถูกถอน</p>
      )}
    </div>
  );
};

export default CourseDrop;
