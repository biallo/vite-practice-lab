import { escapeHtml } from "../utils/dom.js";

const iconUrl = `${import.meta.env.BASE_URL}icons/vite.svg`;

export function renderSidebar({ lessons, activeLesson, progress, completedCount }) {
  return `
    <aside class="sidebar" aria-label="课程列表">
      <div class="brand">
        <img src="${iconUrl}" alt="" width="36" height="36" />
        <div>
          <h1>Vite Practice Lab</h1>
          <p class="eyebrow">Vite 8 学习项目</p>
        </div>
      </div>

      <div class="progress-panel" aria-label="学习进度">
        <div class="progress-copy">
          <span>${completedCount}/${lessons.length}</span>
          <strong>已复盘课程</strong>
        </div>
        <div class="progress-track">
          <span style="width: ${(completedCount / lessons.length) * 100}%"></span>
        </div>
      </div>

      <label class="lesson-select-field">
        <span>当前课程</span>
        <select class="lesson-select" data-lesson-select aria-label="选择课程">
          ${lessons
            .map((lesson, index) => {
              const isActive = lesson.id === activeLesson.id;
              const isDone = progress[lesson.id];
              const title = `${String(index + 1).padStart(2, "0")}. ${lesson.title.replace(/^\d+\.\s*/, "")}${isDone ? " - 已完成" : ""}`;

              return `
                <option value="${escapeHtml(lesson.id)}" ${isActive ? "selected" : ""}>
                  ${escapeHtml(title)}
                </option>
              `;
            })
            .join("")}
        </select>
      </label>

      <nav class="lesson-list">
        ${lessons
          .map((lesson, index) => {
            const isActive = lesson.id === activeLesson.id;
            const isDone = progress[lesson.id];

            return `
              <button
                class="lesson-button${isActive ? " is-active" : ""}"
                type="button"
                data-lesson-id="${escapeHtml(lesson.id)}"
                aria-current="${isActive ? "page" : "false"}"
              >
                <span class="lesson-index">${String(index + 1).padStart(2, "0")}</span>
                <span class="lesson-meta">
                  <strong>${escapeHtml(lesson.title.replace(/^\d+\.\s*/, ""))}</strong>
                  <small>${escapeHtml(lesson.summary)}</small>
                </span>
                <span class="lesson-state ${isDone ? "lesson-done" : ""}" aria-label="${isDone ? "已完成" : "未完成"}">
                  ${isDone ? "已完成" : ""}
                </span>
              </button>
            `;
          })
          .join("")}
      </nav>
    </aside>
  `;
}
