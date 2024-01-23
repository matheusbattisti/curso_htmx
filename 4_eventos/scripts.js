document.body.addEventListener("htmx:load", function (event) {
  console.log("Página carregada ou conteúdo HTMX inserido");
});

document.body.addEventListener("htmx:beforeSwap", function (event) {
  console.log("Antes do swap");
});
document.body.addEventListener("htmx:afterSwap", function (event) {
  console.log("Depois do swap");
});

document.body.addEventListener("htmx:beforeRequest", function (event) {
  console.log("Antes da requisição");
});
document.body.addEventListener("htmx:afterRequest", function (event) {
  console.log("Depois da requisição");
});

document.body.addEventListener("htmx:responseError", function (event) {
  alert("Ocorreu um erro na requisição!");
});

document.body.addEventListener("htmx:configRequest", function (event) {
  // Adicionar ou modificar cabeçalhos de requisição
  event.detail.headers["Custom-Header"] = "Valor";

  // Adicionar ou modificar parâmetros de requisição
  event.detail.parameters["param1"] = "novo valor";
  event.detail.parameters["param2"] = "outro valor";
});
