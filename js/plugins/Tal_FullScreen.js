(function() {
  const style = document.createElement('style');
  style.innerHTML = `
  
  @media (orientation: portrait) {
    canvas#gameCanvas { width: 100vw !important; height: auto !important; }
    video#gameVideo { width: 100vw !important; height: auto !important; }
  }
  @media (orientation: landscape) {
    canvas#gameCanvas { width: auto !important; height: 100vh !important; }
    video#gameVideo { width: auto !important; height: 100vh !important; }
  }
  `;
  document.head.appendChild(style);
})();
