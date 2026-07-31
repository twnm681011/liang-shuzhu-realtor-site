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

  // 捲動時標示目前所在的區塊
  const sectionLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')]
    .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter((item) => item.section);

  if (sectionLinks.length) {
    const setActive = () => {
      const line = window.scrollY + window.innerHeight * 0.3;
      let current = sectionLinks[0];
      sectionLinks.forEach((item) => {
        if (item.section.offsetTop <= line) current = item;
      });
      sectionLinks.forEach(({ link }) => link.classList.toggle("is-active", link === current.link));
    };
    setActive();
    window.addEventListener("scroll", setActive, { passive: true });
  }

  const form = document.getElementById("bookingForm");
  if (form) {
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
  }

  // 房產知識頁：分類篩選
  const filterBtns = document.querySelectorAll(".know-filter-btn");
  const knowledgeCards = document.querySelectorAll(".knowledge-card");
  if (filterBtns.length && knowledgeCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.dataset.filter;
        knowledgeCards.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }
});
