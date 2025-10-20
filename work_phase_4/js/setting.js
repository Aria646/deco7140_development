import { postFormData } from "./modules/postFormData.js";
import { fetchGetData } from "./modules/getData.js";

const student_number = "s4929713";
const uqcloud_zone_id = "0ba79392";

const API_URL =
  "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/community/";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("community-form");
  const feedback = document.getElementById("form-feedback");
  const list = document.getElementById("community-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    feedback.textContent = "Submitting...";

    const { success, data } = await postFormData(form, API_URL, {
      student_number,
      uqcloud_zone_id,
    });

    if (success) {
      feedback.textContent = data.message;
      form.reset();
      loadCommunity();
    } else {
      feedback.textContent = data.message || "Something went wrong.";
    }
  });

  async function loadCommunity() {
    const data = await fetchGetData(API_URL, {
      student_number,
      uqcloud_zone_id,
    });

    list.innerHTML = "";

    if (!data) {
      list.innerHTML =
        '<p style="color:red;">Failed to load community members.</p>';
      return;
    }

    data.forEach((member) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        ${member.photo ? `<img src="${member.photo}" alt="photo">` : ""}
        <div>
          <h3>${member.name}</h3>
          <p>Email: ${member.email}</p>
          <p>${member.message || ""}</p>
        </div>
      `;

      list.appendChild(card);
    });
  }

  loadCommunity();
});
