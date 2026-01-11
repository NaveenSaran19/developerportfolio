// ===== SERVICES PAGE JAVASCRIPT =====

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Copy Email Functionality
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function() {
      const email = 'naaveensaaran.01319@gmail.com';
      
      // Create temporary input element
      const tempInput = document.createElement('input');
      tempInput.value = email;
      document.body.appendChild(tempInput);
      tempInput.select();
      
      try {
        document.execCommand('copy');
        
        // Change button text temporarily
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Email Copied!';
        this.style.background = 'rgba(34, 197, 94, 0.2)';
        this.style.borderColor = '#22c55e';
        this.style.color = '#22c55e';
        
        setTimeout(() => {
          this.innerHTML = originalHTML;
          this.style.background = '';
          this.style.borderColor = '';
          this.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
        alert('Email: ' + email);
      }
      
      document.body.removeChild(tempInput);
    });
  }

  // Mobile Menu Toggle (if needed in future)
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll animation to service tags
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe service tags for animation
  const serviceTags = document.querySelectorAll('.service-tag');
  serviceTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = `all 0.5s ease ${index * 0.05}s`;
    observer.observe(tag);
  });

  // Observe FAQ items for animation
  const faqItemsForAnimation = document.querySelectorAll('.faq-item');
  faqItemsForAnimation.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
  });

  // Add parallax effect to hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroSection.style.opacity = 1 - (scrolled / 500);
    }
  });

  // Service tag click animation
  serviceTags.forEach(tag => {
    tag.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .cta-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add dynamic greeting based on time
  const hour = new Date().getHours();
  let greeting = 'Hello';
  
  if (hour < 12) {
    greeting = 'Good Morning';
  } else if (hour < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  // Console welcome message
  console.log(`%c${greeting}! Welcome to Naveen's Services Page`, 
    'color: #3B82F6; font-size: 20px; font-weight: bold;');
  console.log('%cLooking for a developer? Let\'s work together!', 
    'color: #00ffcc; font-size: 14px;');

  // Preload images for better performance
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  button, .btn-primary, .btn-secondary, .cta-btn {
    position: relative;
    overflow: hidden;
  }
  
  body {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
`;
document.head.appendChild(style);
