document.body.addEventListener("htmx:afterRequest", function (event) {
  if (event.target.getAttribute("id") === "edit-form") {
    cancelEdit();
    atualizarListaTarefas();
  }

  if (event.target.getAttribute("id") === "todo-form") {
    resetForm();
    atualizarListaTarefas();
  }
});

function resetForm() {
  document.getElementById("todo-form").reset();
}

function editarTarefa(id, texto, dificuldade) {
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-texto").value = texto;
  document.getElementById("edit-dificuldade").value = dificuldade;

  document.getElementById("edit-form").style.display = "block";
  document.getElementById("todo-form").style.display = "none";
}

function cancelEdit() {
  document.getElementById("edit-form").style.display = "none";
  document.getElementById("todo-form").style.display = "block";
}

function deletarTarefa(id) {
  if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
    htmx.ajax("DELETE", "http://localhost:3000/todos/" + id, "#msg");
    atualizarListaTarefas();
  }
}

function toggleTarefa(id) {
  htmx.ajax("PATCH", "http://localhost:3000/todos/" + id, "#msg");
  atualizarListaTarefas();
}

function atualizarListaTarefas() {
  htmx.ajax("GET", "http://localhost:3000/todos", "#todo-list");
}
