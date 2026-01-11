import "./CourseCards.css";

const CourseCards = ({ courses, onCourseClick }) => {
  if (!courses || courses.length === 0) {
    return <p>No courses found</p>;
  }

  return (
    <div className="course-cards-grid">
      {courses.map((course) => (
        <div
          key={course._id}
          className="course-card"
          onClick={() => onCourseClick(course._id)}
        >
          <img
            src={course.thumbnail}
            alt={course.title}
            className="course-thumbnail"
          />

          <div className="course-card-body">
            <h3>{course.title}</h3>
            <p className="course-description">
              {course.description?.slice(0, 90)}...
            </p>

            <div className="course-meta">
              <span>₹{course.price}</span>
              <span>{course.level}</span>
            </div>

            <div className="course-instructor">
              <img src={course.instructor?.avatar} alt="Instructor" />
              <p>{course.instructor?.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;
