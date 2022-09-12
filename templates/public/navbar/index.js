const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.tailwindcss.com" defer></script>
</head>
<body>
    <h1>NavBar</h1>
    <h2>With tailwind</h2>
</body>
</html>
`;

class IDNavBar extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = template;
  }
}

customElements.define("id-navbar", IDNavBar);
