import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLessonsBySectionAdmin,
  selectLesson,
} from "../../features/lessons/lessonSlice";

const LessonsTable = ({ sectionId }) => {
  const dispatch = useDispatch();
  const { list, status, error, selectedLesson } = useSelector(
    (state) => state.lessons
  );

  useEffect(() => {
    if (sectionId) {
      dispatch(fetchLessonsBySectionAdmin(sectionId));
    }
  }, [dispatch, sectionId]);

  if (!sectionId) return null;
  if (status === "loading") return <p>Loading lessons...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table
      border="1"
      style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}
    >
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Order</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((lesson) => (
          <tr
            key={lesson._id}
            style={{
              backgroundColor:
                selectedLesson?._id === lesson._id ? "#eef" : "white",
            }}
          >
            <td>{lesson.title}</td>
            <td>{lesson.type}</td>
            <td>{lesson.order}</td>
            <td>
              <button onClick={() => dispatch(selectLesson(lesson))}>
                Select
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LessonsTable;
