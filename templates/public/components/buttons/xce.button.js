class Button extends HTMLElement {
    connectedCallback() {
      this.textContent = "This is a button element";
      this.draggable = true;
      this.id = "xce-button";
      this.classList.add("px-4", "py-3", "rounded-md", "bg-blue-600");
    }
  }
  
  customElements.define("xce-button", Button);
  