class skyhklCTA extends HTMLElement {
    connectedCallback() {
      this.textContent = "This is a CTA element";
      this.draggable = true;
      this.id = "skyhkl-cta";
      this.classList.add("px-4", "py-3", "rounded-md", "bg-pink-600");
    }
  }
  
  customElements.define("skyhkl-cta", skyhklCTA);
  