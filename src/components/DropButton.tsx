import { useCourseStore } from "../CourseStore";

const DropButton = ({ id }: { id: string }) => {
  const { dropCourse } = useCourseStore();

  return (
    <button
      onClick={() => dropCourse(id)}
      style={{
        background: "red",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
      }}
    >
      ถอน
    </button>
  );
};

export default DropButton;
