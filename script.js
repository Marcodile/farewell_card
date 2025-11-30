const scene = document.querySelector(".scene");
const ticket = document.getElementById("ticket");

// Limiti di rotazione
const maxRotate = 16; // gradi max

function handlePointerMove(e) {
  const rect = scene.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const px = x / rect.width - 0.5;  // -0.5 .. 0.5
  const py = y / rect.height - 0.5; // -0.5 .. 0.5

  const ry = px * maxRotate;  // muovi in X -> ruota Y
  const rx = -py * maxRotate; // muovi in Y -> ruota X

  ticket.style.setProperty("--rx", `${rx}deg`);
  ticket.style.setProperty("--ry", `${ry}deg`);

  // Piccolo shift interno per l'effetto parallax
  const tx = -px * 18;
  const ty = -py * 18;
  ticket.style.setProperty("--tx", `${tx}px`);
  ticket.style.setProperty("--ty", `${ty}px`);

  // Usiamo translate sui contenuti se vuoi esagerare: qui è solo variabile se ti serve
}

function resetTransform() {
  ticket.style.setProperty("--rx", "0deg");
  ticket.style.setProperty("--ry", "0deg");
  ticket.style.setProperty("--tx", "0px");
  ticket.style.setProperty("--ty", "0px");
}

// Eventi pointer (invece di mouse così va meglio anche su touchpad moderni)
scene.addEventListener("pointermove", handlePointerMove);
scene.addEventListener("pointerleave", resetTransform);

// Un piccolo "tap" di scala su click
scene.addEventListener("click", () => {
  ticket.animate(
    [
      { transform: `scale(1) rotateX(var(--rx)) rotateY(var(--ry))` },
      { transform: `scale(1.03) rotateX(var(--rx)) rotateY(var(--ry))` },
      { transform: `scale(1) rotateX(var(--rx)) rotateY(var(--ry))` }
    ],
    {
      duration: 260,
      easing: "ease-out"
    }
  );
});
