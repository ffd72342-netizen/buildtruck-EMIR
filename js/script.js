// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Simple validation
    if (!name.value.trim()) {
      alert('Please enter your name');
      isValid = false;
    }
    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
      alert('Please enter a valid email');
      isValid = false;
    }
    if (!message.value.trim()) {
      alert('Please enter a message');
      isValid = false;
    }

    if (isValid) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }
  });
}

// Service Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const serviceItems = document.querySelectorAll('.service-item');

if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      serviceItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// Timeline Interaction
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
  timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      timelineItems.forEach(i => i.classList.remove('active'));
      for (let i = 0; i <= index; i++) {
        timelineItems[i].classList.add('active');
      }
    });
  });
}

// Cost Calculator
const calcType = document.getElementById('calc-type');
const calcPages = document.getElementById('calc-pages');
const calcComplexity = document.getElementById('calc-complexity');
const calcTimeline = document.getElementById('calc-timeline');
const totalCost = document.getElementById('total-cost');
const costBreakdown = document.getElementById('cost-breakdown');
const pagesValue = document.getElementById('pages-value');
const complexityValue = document.getElementById('complexity-value');
const timelineValue = document.getElementById('timeline-value');

function updateCalculator() {
  if (!calcPages) return;
  
  const type = calcType.value;
  const pages = parseInt(calcPages.value);
  const complexity = parseInt(calcComplexity.value);
  const timeline = parseInt(calcTimeline.value);
  
  // Update display values
  pagesValue.textContent = pages;
  complexityValue.textContent = complexity === 1 ? 'Simple' : complexity === 2 ? 'Medium' : 'Complex';
  timelineValue.textContent = timeline;
  
  // Calculate costs
  let baseCost = 1000;
  switch (type) {
    case 'web-design': baseCost = 1500; break;
    case 'web-development': baseCost = 3000; break;
    case 'ecommerce': baseCost = 4000; break;
    case 'marketing': baseCost = 2000; break;
  }
  
  const pageCost = pages * 200;
  const complexityMultiplier = complexity === 1 ? 0.8 : complexity === 2 ? 1 : 1.5;
  const timelineDiscount = timeline <= 4 ? 1.2 : timeline <= 8 ? 1 : 0.9;
  
  const finalCost = Math.round((baseCost + pageCost) * complexityMultiplier * timelineDiscount);
  
  totalCost.textContent = `$${finalCost.toLocaleString()}`;
  costBreakdown.textContent = `Base: $${baseCost} | Pages: $${pageCost} | Complexity: ${Math.round(complexityMultiplier * 100)}% | Timeline: ${Math.round(timelineDiscount * 100)}%`;
}

if (calcType) {
  [calcType, calcPages, calcComplexity, calcTimeline].forEach(element => {
    element.addEventListener('input', updateCalculator);
    element.addEventListener('change', updateCalculator);
  });
  updateCalculator();
}

// Animated Counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;

    const updateCount = () => {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Trigger counters when section is in view
const statsSection = document.getElementById('stats-grid');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(statsSection);
}

// Quiz Logic
let quizStep = 1;
let quizAnswers = {};

function showQuestion(step) {
  document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
  document.getElementById(`question-${step}`).style.display = 'block';
}

function nextQuestion(answer) {
  quizAnswers[`q${quizStep}`] = answer;
  quizStep++;

  if (quizStep <= 3) {
    showQuestion(quizStep);
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quiz-questions').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';

  let recommendation = '';

  if (quizAnswers.q1 === 'web-design' && quizAnswers.q2 === 'starter') {
    recommendation = 'Our Starter Web Design package - perfect for getting your business online quickly and affordably.';
  } else if (quizAnswers.q1 === 'ecommerce' && quizAnswers.q2 === 'professional') {
    recommendation = 'Our Professional E-commerce package with advanced features and marketing integration.';
  } else if (quizAnswers.q3 === 'urgent') {
    recommendation = 'We can accommodate urgent timelines. Contact us for a custom quote and expedited service.';
  } else {
    recommendation = 'Based on your needs, we recommend our Professional package. Let\'s discuss your project in detail.';
  }

  document.getElementById('recommendation').textContent = recommendation;
}

if (document.getElementById('start-quiz')) {
  document.getElementById('start-quiz').addEventListener('click', () => {
    document.getElementById('quiz-start').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    showQuestion(1);
  });

  document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
      nextQuestion(option.getAttribute('data-value'));
    });
  });

  document.getElementById('retake-quiz').addEventListener('click', () => {
    quizStep = 1;
    quizAnswers = {};
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-start').style.display = 'block';
  });
}

// Simple Chatbot
const chatbot = document.getElementById('chatbot');
const chatToggle = document.getElementById('chat-toggle');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input').querySelector('input');

let chatStep = 0;
const chatFlow = [
  { message: "Hi! I'm your digital assistant. How can I help you today?", type: 'bot' },
  { message: "Are you interested in web design, development, or digital marketing?", type: 'bot', options: ['Web Design', 'Development', 'Marketing', 'Other'] },
  { message: "Great! What's your budget range?", type: 'bot', options: ['Under $5K', '$5K-$15K', '$15K+', 'Not sure'] },
  { message: "Thanks! We'll get back to you soon. In the meantime, check out our services page for more details.", type: 'bot' }
];

function addMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showOptions(options) {
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'quiz-option';
    button.textContent = option;
    button.style.width = 'auto';
    button.style.display = 'inline-block';
    button.style.margin = '5px';
    button.addEventListener('click', () => {
      addMessage(option, 'user');
      chatStep++;
      if (chatStep < chatFlow.length) {
        setTimeout(() => {
          addMessage(chatFlow[chatStep].message, 'bot');
          if (chatFlow[chatStep].options) {
            showOptions(chatFlow[chatStep].options);
          }
        }, 1000);
      }
    });
    chatMessages.appendChild(button);
  });
}

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    chatbot.classList.toggle('show');
    if (chatbot.classList.contains('show') && chatMessages.children.length === 0) {
      addMessage(chatFlow[0].message, 'bot');
      showOptions(chatFlow[1].options);
      chatStep = 1;
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
      addMessage(chatInput.value, 'user');
      chatInput.value = '';
      // Simple echo response
      setTimeout(() => {
        addMessage("Thanks for your message! Our team will respond soon.", 'bot');
      }, 1000);
    }
  });
}