import { escapeHtml } from "../utils/dom.js";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("javascript", javascript);

function renderList(items) {
  return `
    <ul>
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderTabs(activeTab) {
  const tabs = [
    { id: "explain", label: "讲解" },
    { id: "review", label: "复盘" }
  ];

  return `
    <div class="lesson-tabs" role="tablist" aria-label="课程内容">
      ${tabs
        .map(
          (tab) => `
            <button
              class="tab-button${activeTab === tab.id ? " is-active" : ""}"
              id="${tab.id}-tab"
              type="button"
              role="tab"
              data-tab-id="${tab.id}"
              aria-selected="${activeTab === tab.id}"
              aria-controls="${tab.id}-panel"
            >
              ${tab.label}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderCodeBlock(lesson) {
  if (!lesson.code) {
    return "";
  }

  const language = lesson.codeLanguage ?? "javascript";
  const highlighted = hljs.highlight(lesson.code, { language }).value;

  return `
    <pre><code class="hljs language-${escapeHtml(language)}">${highlighted}</code></pre>
  `;
}

function renderReviewItems(items) {
  return `
    <div class="review-list">
      ${items
        .map(
          (item, index) => `
            <details class="review-item" ${index === 0 ? "open" : ""}>
              <summary>
                <span>${String(index + 1).padStart(2, "0")}</span>
                ${escapeHtml(item.question)}
              </summary>
              <p>${escapeHtml(item.answer)}</p>
            </details>
          `
        )
        .join("")}
    </div>
  `;
}

function renderExplainPanel(lesson) {
  return `
    <section
      class="content-section"
      id="explain-panel"
      role="tabpanel"
      aria-labelledby="explain-tab"
    >
      <div class="section-heading">
        <h3>讲解</h3>
      </div>
      ${renderList(lesson.explain)}
      ${renderCodeBlock(lesson)}
    </section>
  `;
}

function renderReviewPanel(lesson, isCompleted) {
  return `
    <section
      class="content-section"
      id="review-panel"
      role="tabpanel"
      aria-labelledby="review-tab"
    >
      <div class="section-heading">
        <h3>复盘</h3>
      </div>
      ${renderReviewItems(lesson.review)}
      <div class="review-actions">
        <button
          class="complete-button"
          type="button"
          data-action="mark-complete"
          ${isCompleted ? "disabled" : ""}
        >
          ${isCompleted ? "已完成" : "标记完成"}
        </button>
      </div>
    </section>
  `;
}

export function renderWorkspace({ lesson, isCompleted, activeTab }) {
  return `
    <article class="workspace">
      <header class="lesson-hero">
        <div>
          <p class="eyebrow">Vite Course</p>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p>${escapeHtml(lesson.summary)}</p>
          <div class="tag-row">${renderTags(lesson.tags)}</div>
        </div>
      </header>

      ${renderTabs(activeTab)}
      <div class="tab-panels">
        ${activeTab === "review" ? renderReviewPanel(lesson, isCompleted) : renderExplainPanel(lesson)}
      </div>
    </article>
  `;
}
