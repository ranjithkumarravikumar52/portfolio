// Load and render content from JSON
async function loadContent() {
  try {
    const response = await fetch('content.json');
    const content = await response.json();

    // Set page title
    document.title = content.pageTitle;

    // Create a map for quick link lookup
    const linkMap = {};
    content.links.forEach(link => {
      linkMap[link.name] = link;
    });

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
        
        // Check if this section has link references
        if (section.linkRefs && section.linkRefs.length > 0) {
          // Create a fragment to hold text and links
          let html = para;
          
          // Replace link references with actual anchor tags
          section.linkRefs.forEach(linkRef => {
            if (linkMap[linkRef]) {
              const link = linkMap[linkRef];
              const anchorTag = `<a href="${link.url}" target="_blank">${link.text}</a>`;
              html = html.replace(link.text, anchorTag);
            }
          });
          
          p.innerHTML = html;
        } else {
          p.textContent = para;
        }
        
        container.appendChild(p);
      });
    });
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);
