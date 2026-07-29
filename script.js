document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");

  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const form = document.getElementById("bookingForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const topic = form.topic.value;
    const message = form.message.value.trim();

    const text = encodeURIComponent(
      `您好，我是 ${name}，電話 ${phone}。\n想諮詢：${topic}\n${message ? "內容：" + message : ""}`
    );

    window.open(`https://line.me/ti/p/~twnm681011?text=${text}`, "_blank", "noopener");
  });
});
