import { useState } from "react";
import CoursesTable from "./CoursesTable";
import SectionsTable from "./SectionsTable";
import LessonsTable from "./LessonsTable";
import { useSelector } from "react-redux";
import AIActions from "./AIActions";

const AdminDashboard = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const { selectedLesson } = useSelector((state) => state.lessons);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>

      {/* COURSES */}
      <CoursesTable
        onSelectCourse={(course) => {
          setSelectedCourse(course);
          setSelectedSection(null);
        }}
      />

      {/* SECTIONS */}
      {selectedCourse && (
        <>
          <h2>Sections — {selectedCourse.title}</h2>
          <SectionsTable
            courseId={selectedCourse._id}
            onSelectSection={setSelectedSection}
          />
        </>
      )}

      {/* LESSONS */}
      {selectedSection && (
        <>
          <h2>Lessons — {selectedSection.title}</h2>
          <LessonsTable sectionId={selectedSection._id} />
        </>
      )}

      {/* AI ACTIONS */}
      {selectedLesson && <AIActions lessonId={selectedLesson._id} />}
    </div>
  );
};

export default AdminDashboard;
