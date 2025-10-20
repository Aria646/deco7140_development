function openModal(modal) {
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");
const loginBtn = document.querySelector(".js-login-trigger");
const signupBtn = document.querySelector(".js-signup-trigger");

loginBtn.addEventListener("click", () => openModal(loginModal));
signupBtn.addEventListener("click", () => openModal(signupModal));

document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-overlay");
        closeModal(modal);
    });
});

document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
    });
});
