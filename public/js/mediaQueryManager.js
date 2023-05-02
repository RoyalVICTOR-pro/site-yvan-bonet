// Create a condition that targets viewports at least 768px wide
window.onload = function () {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  const headerElement = document.getElementById('header');
  
  function handleTabletChange(e) {
    // Check if the media query is true
    if (e.matches) {
      // Then log the following message to the console
      headerElement.classList.add('desktop');
      headerElement.classList.remove('mobile');
    } else {
      headerElement.classList.add('mobile');
      headerElement.classList.remove('desktop');
      
    }
  }
  
  // Register event listener
  mediaQuery.addListener(handleTabletChange);
  
  // Initial check
  handleTabletChange(mediaQuery);  
}
