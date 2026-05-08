import { lessons } from "./data/lessons.js";
import { renderSidebar } from "./render/sidebar.js";
import { renderWorkspace } from "./render/workspace.js";
import {
  loadActiveLesson,
  loadProgress,
  saveActiveLesson,
  saveProgress
} from "./utils/storage.js";
import "highlight.js/styles/github-dark.css";
import "./style.css";

const state = {
  activeLessonId: loadActiveLesson(lessons),
  activeTab: "explain",
  progress: loadProgress(lessons)
};

const root = document.querySelector("#root");

function getActiveLesson() {
  return lessons.find((lesson) => lesson.id === state.activeLessonId) ?? lessons[0];
}

function render() {
  const activeLesson = getActiveLesson();
  const completedCount = Object.values(state.progress).filter(Boolean).length;

  root.innerHTML = `
    <main class="app-shell">
      ${renderSidebar({
        lessons,
        activeLesson,
        progress: state.progress,
        completedCount
      })}
      ${renderWorkspace({
        lesson: activeLesson,
        isCompleted: state.progress[activeLesson.id],
        activeTab: state.activeTab
      })}
    </main>
  `;
}

function keepActiveLessonVisible() {
  const lessonList = document.querySelector(".lesson-list");
  const activeButton = lessonList?.querySelector(".lesson-button.is-active");

  if (!lessonList || !activeButton) {
    return;
  }

  const listRect = lessonList.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();
  const edgePadding = 12;

  if (buttonRect.top < listRect.top + edgePadding) {
    lessonList.scrollTop -= listRect.top + edgePadding - buttonRect.top;
    return;
  }

  if (buttonRect.bottom > listRect.bottom - edgePadding) {
    lessonList.scrollTop += buttonRect.bottom - listRect.bottom + edgePadding;
  }

  if (buttonRect.left < listRect.left + edgePadding) {
    lessonList.scrollLeft -= listRect.left + edgePadding - buttonRect.left;
    return;
  }

  if (buttonRect.right > listRect.right - edgePadding) {
    lessonList.scrollLeft += buttonRect.right - listRect.right + edgePadding;
  }
}

function setActiveLesson(lessonId) {
  const previousLessonList = document.querySelector(".lesson-list");
  const lessonListScrollTop = previousLessonList?.scrollTop ?? 0;
  const lessonListScrollLeft = previousLessonList?.scrollLeft ?? 0;

  state.activeLessonId = lessonId;
  state.activeTab = "explain";
  saveActiveLesson(lessonId);
  render();

  const lessonList = document.querySelector(".lesson-list");

  if (lessonList) {
    lessonList.scrollTop = lessonListScrollTop;
    lessonList.scrollLeft = lessonListScrollLeft;
  }

  keepActiveLessonVisible();

  if (window.matchMedia("(max-width: 760px)").matches) {
    document.querySelector(".workspace")?.scrollIntoView({ behavior: "smooth" });
  }
}

function setActiveTab(tabId) {
  state.activeTab = tabId;
  render();
}

function markComplete() {
  const activeLesson = getActiveLesson();

  if (state.progress[activeLesson.id]) {
    return;
  }

  state.progress = {
    ...state.progress,
    [activeLesson.id]: true
  };
  saveProgress(state.progress);
  render();
}

root.addEventListener("click", (event) => {
  const lessonButton = event.target.closest("[data-lesson-id]");
  const tabButton = event.target.closest("[data-tab-id]");
  const actionButton = event.target.closest("[data-action]");

  if (lessonButton) {
    lessonButton.blur();
    setActiveLesson(lessonButton.dataset.lessonId);
    return;
  }

  if (tabButton) {
    setActiveTab(tabButton.dataset.tabId);
    return;
  }

  if (actionButton?.dataset.action === "mark-complete") {
    markComplete();
  }
});

render();
keepActiveLessonVisible();
