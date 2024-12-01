document.addEventListener("DOMContentLoaded", function () {
  const words = ["Software Developer", "Full Stack Developer", "Web Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let currentWord = '';
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const newWordDelay = 2000;
  const typingElement = document.querySelector('.typing-animation');

  function type() {
    if (charIndex < words[wordIndex].length) {
      currentWord += words[wordIndex].charAt(charIndex);
      typingElement.textContent = currentWord;
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, newWordDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      currentWord = currentWord.slice(0, -1);
      typingElement.textContent = currentWord;
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typingSpeed + 1100);
    }
  }

  // Start typing effect when the element scrolls into view
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        type();
        observer.disconnect(); // Run typing only once
      }
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  if (typingElement) {
    observer.observe(typingElement);
  }

  // Animate progress bars on scroll
  const progressBars = document.querySelectorAll('.progress-done');
  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute('data-done') + '%';
          bar.style.opacity = 1;
        }
      });
    },
    { threshold: 0.5 }
  );

  progressBars.forEach(bar => progressObserver.observe(bar));

  // Animate circular skills on scroll
  const circles = document.querySelectorAll('.circle');
  const circleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const percent = circle.getAttribute('data-percent');
          circle.style.setProperty('--percent', percent);
        }
      });
    },
    { threshold: 0.5 }
  );

  circles.forEach(circle => circleObserver.observe(circle));
});
