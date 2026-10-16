// Step 3: Add basic interactivity (Mobile menu toggle & Smooth scrolling)
const hamburger = document.querySelector('.hamburger-icon');
const navMenu = document.querySelector('nav ul');

function toggleMenu() {
  if (navMenu) {
    navMenu.classList.toggle('active');
  }
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Smooth scrolling for internal links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        // Close mobile menu after clicking a link if open
        if (navMenu) {
          navMenu.classList.remove('active');
        }
      }
    }
  });
});

// Step 4: Add interactivity to portfolio sections (Filter projects & Lightbox modal)
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-card');
  projects.forEach(project => {
    if (category === 'all' || project.dataset.category === category) {
      project.style.display = 'block';
    } else {
      project.style.display = 'none';
    }
  });
}

// Lightbox effect for project images
const modal = document.createElement('div');
modal.id = 'lightbox-modal';
modal.style.cssText = 'display:none; position:fixed; z-index:1000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); justify-content:center; align-items:center;';
modal.innerHTML = '<img id="lightbox-img" style="max-width:90%; max-height:90%; border-radius:4px;">';
document.body.appendChild(modal);

const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.project-card img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    modal.style.display = 'flex';
  });
});

modal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Step 5: Add form validation and real-time feedback for the Contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Create feedback element container
  const feedback = document.createElement('div');
  feedback.id = 'form-feedback';
  feedback.style.cssText = 'margin-top: 10px; font-weight: bold;';
  contactForm.appendChild(feedback);

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    let isValid = true;
    let errorMessage = '';

    if (!nameInput.value.trim()) {
      isValid = false;
      errorMessage = 'Please fill in your name.';
    } else if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    } else if (!messageInput.value.trim()) {
      isValid = false;
      errorMessage = 'Please enter your message.';
    }

    if (!isValid) {
      feedback.style.color = '#d9534f';
      feedback.textContent = errorMessage;
    } else {
      feedback.style.color = '#5cb85c';
      feedback.textContent = 'Thank you! Your message has been successfully sent.';
      contactForm.reset();
    }
  });
}