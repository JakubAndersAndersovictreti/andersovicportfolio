/**
 * PORTFOLIO - JAKUB ANDERS
 * Vanilla JavaScript pro dynamické efekty, navigaci, hravé prvky a interakce
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. ZÁKLADNÍ DOM ELEMENTY
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinksList = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  // 2. STICKY HLAVIČKA PŘI SCROLLOVÁNÍ
  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // 3. MOBILNÍ HAMBURGER MENU
  if (mobileToggle && navLinksList) {
    const toggleMenu = (forceClose = false) => {
      const isOpen = forceClose ? false : !navLinksList.classList.contains('active');
      mobileToggle.classList.toggle('active', isOpen);
      navLinksList.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    // Zavření menu po kliknutí na libovolný navigační odkaz
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    // Zavření kliknutím mimo menu na mobilu
    document.addEventListener('click', (event) => {
      if (
        navLinksList.classList.contains('active') &&
        !navLinksList.contains(event.target) &&
        !mobileToggle.contains(event.target)
      ) {
        toggleMenu(true);
      }
    });
  }

  // 4. SCROLLSPY - AKTIVNÍ ODKAZ V NAVIGACI PODLE VIDITELNÉ SEKCE
  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => scrollSpyObserver.observe(section));

  // 5. SCROLL-REVEAL ANIMACE (POSTUPNÉ VZPLYNUTÍ PRVKŮ)
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. PŘEPÍNAČ BAREVNÝCH MOTIVŮ (AURA SWITCHER)
  const themeDots = document.querySelectorAll('.theme-dot');
  const savedTheme = localStorage.getItem('ja_portfolio_theme') || 'cyan';

  const applyTheme = (themeName) => {
    if (themeName === 'cyan') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }

    themeDots.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-theme') === themeName);
    });

    localStorage.setItem('ja_portfolio_theme', themeName);
  };

  applyTheme(savedTheme);

  themeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const theme = dot.getAttribute('data-theme');
      applyTheme(theme);
    });
  });

  // 7. DYNAMICKÝ PSACÍ STROJ V HERO SEKCI (TYPEWRITER)
  const typewriterText = document.getElementById('typewriterText');
  if (typewriterText) {
    const phrases = [
      'moderní webové aplikace ⚡',
      'automatizace a skripty v Pythonu 🐍',
      'interaktivní mapy & Mapbox API 🗺️',
      'dynamický střih v DaVinci Resolve 🎬',
      'digitální zážitky s wow efektem ✨'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2200; // Pauza na konci slova
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Krátká pauza před dalším slovem
      }

      setTimeout(typeLoop, typingSpeed);
    };

    setTimeout(typeLoop, 500);
  }

  // 8. INTERAKTIVNÍ TERMINÁL V HERO SEKCI (SPUSTIT KÓD)
  const terminalRunBtn = document.getElementById('terminalRunBtn');
  const runBtnText = document.getElementById('runBtnText');
  const terminalConsoleOutput = document.getElementById('terminalConsoleOutput');

  if (terminalRunBtn && terminalConsoleOutput) {
    let isRunning = false;
    let hasRun = false;

    const logMessages = [
      '> Inicializuji profil: jakub_anders.run()...',
      '> Testuji Front-End stack: HTML5, CSS3, JS ES6+ [OK]',
      '> Navazuji spojení s Mapbox GL JS engine [PŘIPOJENO]',
      '> Optimalizuji Python pipeline & automatizace [HOTOVO]',
      '> Render videa: DaVinci Resolve 4K timeline [PŘIPRAVENO]',
      '🚀 Výsledek: Jakub Anders je připraven pro váš projekt!'
    ];

    terminalRunBtn.addEventListener('click', () => {
      if (isRunning) return;

      if (hasRun) {
        // Reset stavu
        terminalConsoleOutput.innerHTML = '<span class="console-prompt">// Klikněte na \'Spustit kód ▶\' pro interaktivní simulaci</span>';
        if (runBtnText) runBtnText.textContent = 'Spustit kód ▶';
        terminalRunBtn.classList.remove('running');
        hasRun = false;
        return;
      }

      isRunning = true;
      terminalRunBtn.classList.add('running');
      if (runBtnText) runBtnText.textContent = 'Běží... ⏳';
      terminalConsoleOutput.innerHTML = '';

      let msgIndex = 0;
      const interval = setInterval(() => {
        if (msgIndex < logMessages.length) {
          const isFinal = msgIndex === logMessages.length - 1;
          const logRow = document.createElement('span');
          logRow.className = isFinal ? 'console-log-success' : 'console-log-row';
          logRow.textContent = logMessages[msgIndex];
          terminalConsoleOutput.appendChild(logRow);
          terminalConsoleOutput.scrollTop = terminalConsoleOutput.scrollHeight;
          msgIndex++;
        } else {
          clearInterval(interval);
          isRunning = false;
          hasRun = true;
          if (runBtnText) runBtnText.textContent = 'Restartovat ↺';
        }
      }, 350);
    });
  }

  // 9. INTERAKTIVNÍ ZÁBAVNÉ REAKCE V SEKCI O MNĚ (CO MĚ POHÁNÍ)
  const passionPills = document.querySelectorAll('.passion-pill');
  passionPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const counterEl = pill.querySelector('.reaction-counter');
      if (counterEl) {
        let count = parseInt(counterEl.textContent, 10) || 0;
        count++;
        counterEl.textContent = count;
      }

      // Vytvoření plovoucího emoji
      const emoji = pill.getAttribute('data-emoji') || '✨';
      const floatingEl = document.createElement('span');
      floatingEl.className = 'floating-reaction-emoji';
      floatingEl.textContent = emoji;

      const rect = pill.getBoundingClientRect();
      floatingEl.style.left = `${e.clientX - rect.left - 12}px`;
      floatingEl.style.top = `${e.clientY - rect.top - 20}px`;

      pill.appendChild(floatingEl);

      setTimeout(() => {
        floatingEl.remove();
      }, 800);
    });
  });

  // 10. INTERAKTIVNÍ FILTROVÁNÍ PROJEKTŮ
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // 11. RYCHLÉ KOPÍROVÁNÍ E-MAILU DO SCHRÁNKY (KUBAANDERS@SEZNAM.CZ)
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const targetEmail = 'kubaanders@seznam.cz';

  if (copyEmailBtn && copyBtnText) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(targetEmail).then(() => {
        const originalText = copyBtnText.textContent;
        copyEmailBtn.classList.add('copied');
        copyBtnText.textContent = 'Zkopírováno! ✨';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyBtnText.textContent = originalText;
        }, 2500);
      }).catch(() => {
        // Fallback pro starší prohlížeče
        const textArea = document.createElement('textarea');
        textArea.value = targetEmail;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        copyEmailBtn.classList.add('copied');
        copyBtnText.textContent = 'Zkopírováno! ✨';
        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyBtnText.textContent = 'Kopírovat';
        }, 2500);
      });
    });
  }

  // 12. DYNAMICKÝ SPOTLIGHT EFEKT NA KARTÁCH (SLEDOVÁNÍ KURZORU)
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 13. KONTAKTNÍ FORMULÁŘ - INTERAKTIVNÍ VALIDACE A FEEDBACK
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const messageInput = document.getElementById('userMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Jednoduchá validace
      if (!name || !email || !message) {
        formStatus.textContent = 'Prosím, vyplňte všechna povinná pole (Jméno, E-mail a Zpráva).';
        formStatus.className = 'form-status-msg error';
        return;
      }

      // Validace formátu e-mailu
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.textContent = 'Prosím, zadejte platnou e-mailovou adresu.';
        formStatus.className = 'form-status-msg error';
        return;
      }

      // Vizuální simulace odesílání
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Odesílám zprávu...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Úspěšná zpráva s přímým odkazem na Jakuba
        formStatus.textContent = `Děkuji za zprávu, ${name}! Váš dotaz byl úspěšně zaznamenán. Jakub Anders se vám brzy ozve zpět na e-mail.`;
        formStatus.className = 'form-status-msg success';

        contactForm.reset();

        // Skrytí potvrzení po 8 sekundách
        setTimeout(() => {
          formStatus.className = 'form-status-msg';
        }, 8000);
      }, 700);
    });
  }
});
