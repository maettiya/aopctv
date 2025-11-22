function toggleProject(id) {
  const section = document.getElementById(id);
  const video = document.getElementById(`video-${id}`);
  const isOpen = section.style.maxHeight && section.style.maxHeight !== "0px";

  // 1. CLOSE ANY OTHER OPEN PROJECTS
  document.querySelectorAll("[id^='project-']").forEach(other => {
    if (other.id !== id) {
      other.style.maxHeight = "0px";
      stopMedia(other.id);
    }
  });

  // 2. IF CLICKING AN OPEN ONE → CLOSE IT
  if (isOpen) {
    section.style.maxHeight = "0px";
    stopMedia(id);
    return;
  }

  // 3. OTHERWISE, OPEN THIS ONE
  section.style.maxHeight = section.scrollHeight + "px";

  // 4. AUTOPLAY ONLY THIS ONE
  playMedia(id);
}

// ---- STOP MEDIA (MP4 OR YOUTUBE) ----
function stopMedia(id) {
  const el = document.getElementById(`video-${id}`);

  if (!el) return;

  if (el.tagName === "VIDEO") {
    el.pause();
    el.currentTime = 0;
  }

  if (el.tagName === "IFRAME") {
    const base = el.dataset.base;
    el.src = "";     // unload
    el.src = base;   // reload fresh (stops sound)
  }
}

// ---- PLAY MEDIA (MP4 OR YOUTUBE) ----
function playMedia(id) {
  const el = document.getElementById(`video-${id}`);

  if (!el) return;

  if (el.tagName === "VIDEO") {
    el.muted = false;
    el.play().catch(() => {});
  }

  if (el.tagName === "IFRAME") {
    const base = el.dataset.base;
    el.src = `${base}?autoplay=1&mute=0`;
  }
}

window.toggleProject = toggleProject;
