import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections, selectSection } from "../../features/sections/sectionSlice";

const SectionsTable = ({ courseId, onSelectSection }) => {
  const dispatch = useDispatch();
  const { list, status, error, selectedSection } = useSelector((state) => state.sections);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchSections(courseId));
    }
  }, [dispatch, courseId]);

  if (!courseId) return <p>Please select a course to view sections.</p>;
  if (status === "loading") return <p>Loading sections...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table border="1" style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Lesson Count</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((section) => (
          <tr
            key={section._id}
            style={{ backgroundColor: selectedSection?._id === section._id ? "#f0f0f0" : "white" }}
          >
            <td>{section.title}</td>
            <td>{section.lessonCount}</td>
            <td>
              <button
                onClick={() => {
                  dispatch(selectSection(section));
                  onSelectSection(section);
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

export default SectionsTable;
