const navLinks = document.querySelectorAll(".navbar a");
const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const video = document.getElementById("videoHero");
const formContato = document.getElementById("formContato");
const formFeedback = document.getElementById("formFeedback");

function atualizarRotuloMenu(aberto) {
  if (!menuToggle) return;
  menuToggle.setAttribute(
    "aria-label",
    aberto ? "Fechar menu" : "Abrir menu"
  );
}

if (menuToggle && navbar) {
  atualizarRotuloMenu(false);

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
    menuToggle.classList.toggle("active");

    const isExpanded = navbar.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", String(isExpanded));
    atualizarRotuloMenu(isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      if (window.innerWidth <= 768) {
        navbar.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        atualizarRotuloMenu(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navbar.classList.remove("active");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      atualizarRotuloMenu(false);
    }
  });
}

if (video) {
  video.play().catch(() => {});
}

// WhatsApp dropdown
const wppBtn = document.getElementById("wppBtn");
const wppMenu = document.getElementById("wppMenu");

if (wppBtn && wppMenu) {
  wppBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const aberto = wppMenu.classList.toggle("aberto");
    wppBtn.setAttribute("aria-expanded", String(aberto));
  });

  document.addEventListener("click", () => {
    wppMenu.classList.remove("aberto");
    wppBtn.setAttribute("aria-expanded", "false");
  });

  wppMenu.addEventListener("click", (e) => e.stopPropagation());
}

if (formContato && formFeedback) {
  formContato.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formContato.reportValidity()) {
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const empresa = document.getElementById("empresa").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const interesse = document.getElementById("interesse");
    const interesseTexto = interesse.options[interesse.selectedIndex].text;
    const mensagem = document.getElementById("mensagem").value.trim();

    const linhas = [
      `Nome: ${nome}`,
      empresa ? `Empresa: ${empresa}` : null,
      `E-mail: ${email}`,
      telefone ? `Telefone: ${telefone}` : null,
      `Interesse: ${interesseTexto}`,
      "",
      "Mensagem:",
      mensagem,
    ].filter(Boolean);

    const assunto = encodeURIComponent(`Contato pelo site — ${nome}`);
    const corpo = encodeURIComponent(linhas.join("\n"));
    const mailto = `mailto:contato@handtech.dev.br?subject=${assunto}&body=${corpo}`;

    formFeedback.hidden = false;
    formFeedback.classList.remove("erro", "sucesso");
    formFeedback.classList.add("sucesso");
    formFeedback.textContent =
      "Abrindo seu aplicativo de e-mail com a mensagem pronta. Se nada abrir, copie o texto e envie para contato@handtech.dev.br ou use o WhatsApp ao lado.";

    window.location.href = mailto;
  });
}
