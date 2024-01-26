document.body.addEventListener("htmx:afterRequest", function (event) {
  const msgElement = document.getElementById("msg");
  console.log(msgElement);
  // Verifica se há alguma mensagem na resposta e exibe se houver
  if (msgElement.textContent.trim() !== "") {
    msgElement.classList.remove("hidden");
  }
});
