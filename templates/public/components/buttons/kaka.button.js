class Button extends HTMLElement {
    connectedCallback() {
      this.textContent = "This is a kaka button element";
      this.draggable = true;
      this.id = "kaka-button";
      this.classList.add("px-4", "py-3", "rounded-md", "bg-blue-600");
    }
  }
  
  customElements.define("kaka-button", Button);
  