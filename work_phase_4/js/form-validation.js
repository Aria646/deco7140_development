(function () {
  const form = document.getElementById("submission-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const fields = [
    { id: "title",    min: 3,  msg: "Title must be at least 3 characters" },
    { id: "category", min: 1,  msg: "Please select a category" },
    { id: "content",  min: 20, msg: "Content must be at least 20 characters" },
  ];

  function setError(input, message) {
    input.setAttribute("aria-invalid", "true");
    const em = form.querySelector(`#${input.id}-error`);
    if (em) em.textContent = message;
  }

  function clearError(input) {
    input.removeAttribute("aria-invalid");
    const em = form.querySelector(`#${input.id}-error`);
    if (em) em.textContent = "";
  }

  function checkField(def) {
    const el = form.querySelector("#" + def.id);
    if (!el) return true;
    const val = (el.value || "").trim();
    if (val.length < def.min || (el.tagName === "SELECT" && !val)) {
      setError(el, def.msg);
      return false;
    }
    clearError(el);
    return true;
  }

  fields.forEach((def) => {
    const el = form.querySelector("#" + def.id);
    if (el) {
      el.addEventListener("input", () => checkField(def));
      el.addEventListener("blur",  () => checkField(def));
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    fields.forEach((def) => {
      if (!checkField(def)) ok = false;
    });
    if (!ok) {
      status.textContent = "Please correct the errors in the form first.";
      return;
    }
    status.textContent = "Submitted successfully (demo). In a real project, send to backend API here.";
    form.reset();
  });
})();
