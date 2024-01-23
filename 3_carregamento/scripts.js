document.body.addEventListener("htmx:afterRequest", function (event) {
  if (event.target.id === "load-user-data") {
    const response = JSON.parse(event.detail.xhr.responseText);
    const userDataDiv = document.getElementById("user-data-2");
    userDataDiv.innerHTML = `
            <p>Nome: ${response.name}</p>
            <p>Idade: ${response.age}</p>
            <p>Localização: ${response.location}</p>
        `;
  }
});
