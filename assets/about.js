// Load navbar
fetch("navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar").innerHTML = html;

    // After navbar is loaded, activate hamburger
    document.getElementById("hamburger").onclick = () => {
      document.getElementById("nav-links").classList.toggle("open");
    };
  });

