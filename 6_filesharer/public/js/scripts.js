document.body.addEventListener("htmx:afterRequest", function (event) {
  // Evento para flash message
  const msgElement = document.getElementById("msg");
  console.log(msgElement);
  // Verifica se há alguma mensagem na resposta e exibe se houver
  if (msgElement.textContent.trim() !== "") {
    msgElement.classList.remove("hidden");
  }

  // Evento para redirecionar após login/logout
  const xhr = event.detail.xhr;

  const redirect = xhr.getResponseHeader("HX-Redirect");
  if (redirect) {
    window.location.href = redirect;
  }
});
