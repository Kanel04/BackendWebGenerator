const socket = io();
const componentText = document.querySelector("#component-text");
const componentContainer = document.querySelector("#components_list");
const treelist = document.querySelector("#treelist");

const loadComponents = () => {
  componentText.textContent = "Loading components...";
  fetch("/components")
    .then((res) => res.json())
    .then((data) => {
      for (item of data) {
        appendComponentToList(item.components);
      }
    })
    .catch((error) => alert(error))
    .finally(() => (componentText.textContent = "Components list"));
};

const appendComponentToList = (data) => {
  const script = document.createElement("script");
  script.text = data.content;
  document.head.appendChild(script);
  const liComponent = document.createElement("li");
  liComponent.classList.add("component", "cursor-pointer");
  const component = document.createElement(data.name);
  liComponent.appendChild(component);
  liComponent.addEventListener("click", (e) => {
    socket.emit("add-component", data);
    // Adding element in treelist
    const li = document.createElement("li");
    li.classList.add("tree-item");
    li.textContent = `${document.querySelectorAll(".tree-item").length + 1} - ${
      data.name
    }`;
    treelist.appendChild(li);
  });
  componentContainer.appendChild(liComponent);
};

loadComponents();
