// Load and render content from JSON
async function loadContent() {
  try {
    const response = await fetch('content.json');
    const content = await response.json();

    // Set page title
    document.title = content.pageTitle;

    // Update container with content
    const container = document.querySelector('.container');
    container.innerHTML = '';

    content.sections.forEach((section) => {
      const heading = document.createElement('h2');
      heading.className = 'header' + (section.type === 'contact' ? ' contact' : '');
      heading.innerHTML = section.heading;
      container.appendChild(heading);

      section.paragraphs.forEach((para) => {
        const p = document.createElement('p');
        p.className = 'description';
        p.textContent = para;
        container.appendChild(p);
      });
    });
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);
