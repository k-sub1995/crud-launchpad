const STORAGE_KEY = "static-launchpad.entries.v1";

const form = document.querySelector("#entry-form");
const entryIdInput = document.querySelector("#entry-id");
const entryTextInput = document.querySelector("#entry-text");
const saveButton = document.querySelector("#save-button");
const cancelEditButton = document.querySelector("#cancel-edit");
const formTitle = document.querySelector("#form-title");
const formMode = document.querySelector("#form-mode");
const charCount = document.querySelector("#char-count");
const searchInput = document.querySelector("#search-input");
const clearSearchButton = document.querySelector("#clear-search");
const entriesContainer = document.querySelector("#entries");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const entryTemplate = document.querySelector("#entry-template");

let entries = loadEntries();

function loadEntries() {
  const rawEntries = localStorage.getItem(STORAGE_KEY);

  if (!rawEntries) {
    return [];
  }

  try {
    const parsedEntries = JSON.parse(rawEntries);
    return Array.isArray(parsedEntries) ? parsedEntries : [];
  } catch {
    return [];
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getFilteredEntries() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    return entries;
  }

  return entries.filter((entry) => entry.text.toLowerCase().includes(query));
}

function renderEntries() {
  const filteredEntries = getFilteredEntries();
  entriesContainer.replaceChildren();
  resultCount.textContent = String(filteredEntries.length);

  filteredEntries.forEach((entry) => {
    const fragment = entryTemplate.content.cloneNode(true);
    const article = fragment.querySelector(".entry");
    const entryText = fragment.querySelector(".entry-text");
    const updatedAt = fragment.querySelector(".updated-at");

    article.dataset.id = entry.id;
    entryText.textContent = entry.text;
    updatedAt.textContent = `更新: ${formatDate(entry.updatedAt)}`;
    entriesContainer.append(fragment);
  });

  emptyState.textContent = searchInput.value.trim()
    ? "検索条件に一致する文章はありません。"
    : "まだ文章が登録されていません。";
  emptyState.hidden = filteredEntries.length > 0;
}

function updateCharacterCount() {
  charCount.textContent = `${entryTextInput.value.length} / ${entryTextInput.maxLength}`;
}

function resetForm() {
  form.reset();
  entryIdInput.value = "";
  formTitle.textContent = "文章登録";
  formMode.textContent = "新しい文章をローカルストレージへ保存します。";
  saveButton.textContent = "登録";
  cancelEditButton.hidden = true;
  updateCharacterCount();
}

function createEntryId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `entry-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function upsertEntry(text) {
  const editingId = entryIdInput.value;
  const now = new Date().toISOString();

  if (editingId) {
    entries = entries.map((entry) =>
      entry.id === editingId ? { ...entry, text, updatedAt: now } : entry,
    );
    return;
  }

  entries = [
    {
      id: createEntryId(),
      text,
      createdAt: now,
      updatedAt: now,
    },
    ...entries,
  ];
}

function startEdit(entry) {
  entryIdInput.value = entry.id;
  entryTextInput.value = entry.text;
  formTitle.textContent = "文章更新";
  formMode.textContent = "選択した文章を更新します。";
  saveButton.textContent = "更新";
  cancelEditButton.hidden = false;
  updateCharacterCount();
  entryTextInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = entryTextInput.value.trim();
  if (!text) {
    entryTextInput.focus();
    return;
  }

  upsertEntry(text);
  saveEntries();
  resetForm();
  renderEntries();
});

entryTextInput.addEventListener("input", updateCharacterCount);

cancelEditButton.addEventListener("click", resetForm);

searchInput.addEventListener("input", renderEntries);

clearSearchButton.addEventListener("click", () => {
  searchInput.value = "";
  renderEntries();
  searchInput.focus();
});

entriesContainer.addEventListener("click", (event) => {
  const entryElement = event.target.closest(".entry");
  if (!entryElement) {
    return;
  }

  const entry = entries.find((candidate) => candidate.id === entryElement.dataset.id);
  if (!entry) {
    return;
  }

  if (event.target.matches(".edit-button")) {
    startEdit(entry);
    return;
  }

  if (event.target.matches(".delete-button")) {
    entries = entries.filter((candidate) => candidate.id !== entry.id);
    saveEntries();

    if (entryIdInput.value === entry.id) {
      resetForm();
    }

    renderEntries();
  }
});

updateCharacterCount();
renderEntries();
