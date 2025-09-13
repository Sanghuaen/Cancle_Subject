import { useCourseStore } from "../CourseStore";
import DropButton from "./DropButton";

const CourseList = () => {
  const { courses, calculateGPA } = useCourseStore();

  return (
    <div>
      <h2>รายวิชาที่ลงทะเบียน</h2>
      {courses.length === 0 ? (
        <p>ยังไม่มีรายวิชา</p>
      ) : (
        <table border={1} style={{ width: "100%", marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา (ไทย)</th>
              <th>ชื่อวิชา (อังกฤษ)</th>
              <th>หน่วยกิต</th>
              <th>อาจารย์</th>
              <th>เกรด</th>
              <th>ถอน</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nameTH}</td>
                <td>{c.nameEN}</td>
                <td>{c.credits}</td>
                <td>{c.teacher}</td>
                <td>{c.grade}</td>
                <td>
                  <DropButton id={c.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>GPA รวม: {calculateGPA().toFixed(2)}</h3>
    </div>
  );
};

export default CourseList;
