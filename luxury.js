
function orderProduct(name, price) {
  const msg = `Hello Lilaura,%0AI would like to order:%0A• ${name} (£${price})`;
  window.open("https://wa.me/447303179015?text=" + msg, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    el.style.opacity = 1;
    el.style.transform = "translateY(0)";
  });
});
