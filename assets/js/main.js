/**
 * ArtVendor - Main JavaScript
 * Handles countdown timer, form submission, and animations
 */

// ========================================
// Countdown Timer
// ========================================

class CountdownTimer {
  constructor(targetDate, elements) {
    this.targetDate = new Date(targetDate).getTime();
    this.elements = elements;
    this.interval = null;
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.stop();
      this.displayExpired();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.display(days, hours, minutes, seconds);
  }

  display(days, hours, minutes, seconds) {
    if (this.elements.days) this.elements.days.textContent = String(days).padStart(2, '0');
    if (this.elements.hours) this.elements.hours.textContent = String(hours).padStart(2, '0');
    if (this.elements.minutes) this.elements.minutes.textContent = String(minutes).padStart(2, '0');
    if (this.elements.seconds) this.elements.seconds.textContent = String(seconds).padStart(2, '0');
  }

  displayExpired() {
    if (this.elements.days) this.elements.days.textContent = '00';
    if (this.elements.hours) this.elements.hours.textContent = '00';
    if (this.elements.minutes) this.elements.minutes.textContent = '00';
    if (this.elements.seconds) this.elements.seconds.textContent = '00';
  }
}

// ========================================
// Email Form Handler
// ========================================

class EmailFormHandler {
  constructor(formElement, successElement) {
    this.form = formElement;
    this.successMessage = successElement;
    this.isSubmitting = false;
  }

  init() {
    if (!this.form) return;
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    if (this.isSubmitting) return;
    
    const emailInput = this.form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!this.validateEmail(email)) {
      this.showError('Please enter a valid email address');
      return;
    }
    
    this.isSubmitting = true;
    this.setLoadingState(true);
    
    try {
      // Submit to MailerLite first
      const mailerliteSuccess = await this.submitToMailerLite(email);
      
      if (mailerliteSuccess) {
        this.showSuccess();
        this.form.reset();
      } else {
        // Fallback: save to localStorage if MailerLite fails
        console.log('MailerLite submission failed, saving to localStorage backup');
        this.saveToLocalStorage(email);
        this.showSuccess();
        this.form.reset();
      }
    } catch (error) {
      // If everything fails, save to localStorage as backup
      console.error('Error submitting email:', error);
      this.saveToLocalStorage(email);
      this.showSuccess();
      this.form.reset();
    } finally {
      this.isSubmitting = false;
      this.setLoadingState(false);
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  setLoadingState(isLoading) {
    const button = this.form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = isLoading;
      button.textContent = isLoading ? 'Submitting...' : 'Get Early Access';
    }
  }

  showSuccess() {
    if (this.successMessage) {
      this.successMessage.classList.add('visible');
      this.successMessage.textContent = 'Thank you! You\'ll be the first to know when we launch.';
    }
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      if (this.successMessage) {
        this.successMessage.classList.remove('visible');
      }
    }, 5000);
  }

  showError(message) {
    if (this.successMessage) {
      this.successMessage.classList.add('visible');
      this.successMessage.style.background = '#B15A36';
      this.successMessage.textContent = message;
      
      setTimeout(() => {
        this.successMessage.classList.remove('visible');
        this.successMessage.style.background = '';
      }, 3000);
    }
  }

  // Submit email to MailerLite using JSONP endpoint
  submitToMailerLite(email) {
    return new Promise((resolve) => {
      // Use the JSONP endpoint from the embed code
      const accountId = '2253811';
      const formId = '184187776467469556';
      const url = `https://assets.mailerlite.com/jsonp/${accountId}/forms/${formId}/subscribe`;
      
      // Create unique callback
      const callbackName = 'ml_callback_' + Date.now();
      
      // Define the callback function
      window[callbackName] = (response) => {
        // Clean up
        delete window[callbackName];
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        
        // Check if submission was successful
        if (response && response.success) {
          console.log('Email submitted to MailerLite successfully:', email);
          resolve(true);
        } else {
          console.warn('MailerLite submission failed:', response);
          resolve(false);
        }
      };
      
      // Create script element for JSONP request
      const script = document.createElement('script');
      script.src = `${url}?email=${encodeURIComponent(email)}&callback=${callbackName}`;
      script.onerror = () => {
        // Clean up on error
        delete window[callbackName];
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
        console.error('MailerLite JSONP request failed');
        resolve(false);
      };
      
      document.head.appendChild(script);
    });
  }

  // Save email to localStorage as backup
  saveToLocalStorage(email) {
    try {
      const timestamp = new Date().toISOString();
      const entry = { email, timestamp };
      
      // Get existing emails from localStorage
      let emails = [];
      const stored = localStorage.getItem('artvendoor_emails');
      if (stored) {
        emails = JSON.parse(stored);
      }
      
      // Add new email
      emails.push(entry);
      
      // Save back to localStorage
      localStorage.setItem('artvendoor_emails', JSON.stringify(emails));
      
      console.log('Email saved to localStorage backup:', email);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  // Export emails from localStorage (for admin use)
  static exportEmails() {
    const stored = localStorage.getItem('artvendoor_emails');
    if (!stored) {
      console.log('No emails in localStorage');
      return null;
    }
    return JSON.parse(stored);
  }
}

// ========================================
// Scroll Animations
// ========================================

class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll('.animate-on-scroll');
    this.observer = null;
  }

  init() {
    if (!this.elements.length) return;
    
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );
    
    this.elements.forEach((el) => this.observer.observe(el));
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// ========================================
// Initialize Everything
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize countdown timer
  // Launch date: May 15, 2026
  const launchDate = '2026-05-15T00:00:00';
  
  const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds'),
  };
  
  const countdown = new CountdownTimer(launchDate, countdownElements);
  countdown.start();
  
  // Initialize email forms
  const forms = document.querySelectorAll('.email-form');
  forms.forEach((form) => {
    const successMessage = form.nextElementSibling?.classList.contains('success-message')
      ? form.nextElementSibling
      : null;
    const handler = new EmailFormHandler(form, successMessage);
    handler.init();
  });
  
  // Initialize scroll animations
  const scrollAnimator = new ScrollAnimator();
  scrollAnimator.init();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Log initialization
  console.log('ArtVendor website initialized successfully');
});
