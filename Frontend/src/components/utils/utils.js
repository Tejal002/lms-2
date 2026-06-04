export function isUserCourseOwner(course, user) {
  const instructor = course?.instructor;
  const instructorId = typeof instructor === "object" ? instructor?._id || instructor?.id : instructor;
  return Boolean(user?.id && instructorId === user.id);
}