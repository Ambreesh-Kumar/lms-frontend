/* ===================== AUTH ===================== */

const AUTH = {
  REGISTER: "/api/auth/register",
  LOGIN: "/api/auth/login",
  REFRESH_TOKEN: "/api/auth/refresh_token",
  LOGOUT: "/api/auth/logout",
};

/* ===================== COURSES ===================== */

const COURSES = {
  PUBLISHED: "/api/v1/courses/published",

  INSTRUCTOR_LIST: "/api/v1/courses/instructor",

  CREATE: "/api/v1/courses",

  UPDATE: (courseId) => `/api/v1/courses/${courseId}`,

  UPDATE_STATUS: (courseId) =>
    `/api/v1/courses/${courseId}/status`,

  DELETE: (courseId) => `/api/v1/courses/${courseId}`,

  SINGLE: (courseId) => `/api/v1/courses/${courseId}`,
};

/* ===================== SECTIONS ===================== */

const SECTIONS = {
  BY_COURSE: (courseId) => `/api/sections/course/${courseId}`,

  CREATE: "/api/sections",

  UPDATE: (sectionId) => `/api/sections/${sectionId}`,

  DELETE: (sectionId) => `/api/sections/${sectionId}`,
};

/* ===================== LESSONS ===================== */

const LESSONS = {
  CREATE: "/api/lessons",

  BY_SECTION: (sectionId) =>
    `/api/lessons/section/${sectionId}`,

  UPDATE: (lessonId) => `/api/lessons/${lessonId}`,

  DELETE: (lessonId) => `/api/lessons/${lessonId}`,
};

/* ===================== ENROLLMENTS ===================== */

const ENROLLMENTS = {
  CREATE: "/api/enrollments",

  MY: "/api/enrollments/me",

  COURSE_ENROLLMENTS: (courseId) =>
    `/api/enrollments/course/${courseId}`,

  UPDATE_STATUS: (enrollmentId) =>
    `/api/enrollments/${enrollmentId}/status`,
};

/* ===================== PROGRESS ===================== */

const PROGRESS = {
  COMPLETE_LESSON: "/api/progress/complete",

  COURSE_PROGRESS: (courseId) =>
    `/api/progress/course/${courseId}`,

  LESSON_COMPLETION_MAP: (courseId) =>
    `/api/progress/course/${courseId}/lessons`,
};

/* ===================== DASHBOARDS ===================== */

const DASHBOARD = {
  STUDENT: "/api/dashboard/student",
  INSTRUCTOR: "/api/instructor/dashboard",
  ADMIN: "/api/admin/dashboard",
};

/* ===================== PAYMENTS ===================== */

const PAYMENTS = {
  CREATE_ORDER: "/api/payments/create-order",
  VERIFY: "/api/payments/verify",
};

/* ===================== EXPORT ===================== */

export const API_ENDPOINTS = {
  AUTH,
  COURSES,
  SECTIONS,
  LESSONS,
  ENROLLMENTS,
  PROGRESS,
  DASHBOARD,
  PAYMENTS,
};
