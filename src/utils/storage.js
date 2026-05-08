const activeLessonKey = "vite-practice-lab:active-lesson";
const progressKey = "vite-practice-lab:progress";

export function loadActiveLesson(lessons) {
  const savedLessonId = window.localStorage.getItem(activeLessonKey);
  return lessons.some((lesson) => lesson.id === savedLessonId)
    ? savedLessonId
    : lessons[0].id;
}

export function saveActiveLesson(lessonId) {
  window.localStorage.setItem(activeLessonKey, lessonId);
}

export function loadProgress(lessons) {
  try {
    const savedProgress = JSON.parse(window.localStorage.getItem(progressKey) ?? "{}");
    return lessons.reduce(
      (progress, lesson) => ({
        ...progress,
        [lesson.id]: Boolean(savedProgress[lesson.id])
      }),
      {}
    );
  } catch {
    return Object.fromEntries(lessons.map((lesson) => [lesson.id, false]));
  }
}

export function saveProgress(progress) {
  window.localStorage.setItem(progressKey, JSON.stringify(progress));
}
