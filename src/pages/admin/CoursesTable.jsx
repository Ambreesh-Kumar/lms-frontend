import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, selectCourse } from "../../features/courses/courseSlice";

const CoursesTable = ({ onSelectCourse }) => {
  const dispatch = useDispatch();
  const { list, status, error, selectedCourse } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (status === "loading") return <p>Loading courses...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table border="1" style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Category</th>
          <th>Level</th>
          <th>Price</th>
          <th>Instructor</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((course) => (
          <tr
            key={course._id}
            style={{ backgroundColor: selectedCourse?._id === course._id ? "#f0f0f0" : "white" }}
          >
            <td>
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} width="50" />
              ) : (
                "No Image"
              )}
            </td>
            <td>{course.title}</td>
            <td>{course.category}</td>
            <td>{course.level}</td>
            <td>{course.price === 0 ? "Free" : `₹${course.price}`}</td>
            <td>{course.instructor?.name}</td>
            <td>
              <button
                onClick={() => {
                  dispatch(selectCourse(course));
                  onSelectCourse(course);
                }}
              >
                Select
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoursesTable;
