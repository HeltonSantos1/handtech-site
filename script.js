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

    const data = new FormData(formContato);

    fetch(formContato.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        formFeedback.hidden = false;
        formFeedback.classList.remove("erro", "sucesso");
        if (response.ok) {
          formFeedback.classList.add("sucesso");
          formFeedback.textContent = "Mensagem enviada com sucesso! Retornaremos em breve.";
          formContato.reset();
        } else {
          formFeedback.classList.add("erro");
          formFeedback.textContent = "Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.";
        }
      })
      .catch(() => {
        formFeedback.hidden = false;
        formFeedback.classList.add("erro");
        formFeedback.textContent = "Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.";
      });
  });
}

