export const handleResolutionChange = (e) => {
  const headerElement = document.getElementById('header');
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    headerElement.classList.add('desktop');
    headerElement.classList.remove('mobile');
  } else {
    headerElement.classList.add('mobile');
    headerElement.classList.remove('desktop');    
  }
};