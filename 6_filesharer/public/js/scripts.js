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

  // Resetar form de arquivo
  if (event.target.getAttribute("id") === "file-form") {
    event.target.reset();
  }

  // Msg de sucesso ao deletar
  if (event.detail.pathInfo.requestPath.includes("delete-file")) {
    const msgDiv = document.getElementById("msg");

    msgDiv.textContent = "Arquivo excluído com sucesso.";

    msgDiv.classList.remove("hidden");
  }
});
