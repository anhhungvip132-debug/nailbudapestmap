export function openOverlay(html) {
  const o = document.getElementById("overlay");
  o.innerHTML = html;
  o.classList.add("active");
}
export function closeOverlay() {
  document.getElementById("overlay").classList.remove("active");
}
