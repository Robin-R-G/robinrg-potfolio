/* ============================================
   Robin R G — Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Cursor Glow Effect ──
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section detection
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ── Mobile Navigation ──
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        });

        // Close mobile nav on link click
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Scroll Reveal Animations ──
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ── Counter Animation ──
    const statNumbers = document.querySelectorAll('.stat-count[data-count], .stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            } else {
                if (entry.target.animationId) {
                    cancelAnimationFrame(entry.target.animationId);
                    entry.target.animationId = null;
                }
                entry.target.textContent = '0';
            }
        });
    }, { threshold: 0.1 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 1500;
        const startTime = performance.now();
        
        if (element.animationId) {
            cancelAnimationFrame(element.animationId);
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            element.textContent = current;

            if (progress < 1) {
                element.animationId = requestAnimationFrame(update);
            } else {
                element.textContent = target;
                element.animationId = null;
            }
        }

        element.animationId = requestAnimationFrame(update);
    }

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // ── Track Card Click -> Spotify ──
    const trackCards = document.querySelectorAll('.track-card');
    const spotifyUrls = [
        'https://open.spotify.com/track/7FpTazeDWvIbrIRNUOjd35',
        'https://open.spotify.com/track/7GO2kEjLLce5Nk8VqGrGIj',
        'https://open.spotify.com/track/5ql9mNtRdjrHSo7gOAlvYC',
        'https://open.spotify.com/track/73h3EfglyGoJdlBPhhsWwk',
        'https://open.spotify.com/track/2D4HxSYf8PIs9Mu45bV4uv',
    ];

    trackCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (spotifyUrls[index]) {
                window.open(spotifyUrls[index], '_blank', 'noopener');
            }
        });
    });

    // ── Contact Form ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('formName').value;
            const email = document.getElementById('formEmail').value;
            const message = document.getElementById('formMessage').value;
            
            const btn = document.getElementById('submitBtn');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                Opening WhatsApp...
            `;
            btn.disabled = true;
            
            // Construct the WhatsApp text
            const whatsappText = `Hi Robin, my name is ${name} (${email}). Here is my message:\n\n${message}`;
            const whatsappUrl = `https://wa.me/917736129782?text=${encodeURIComponent(whatsappText)}`;
            
            setTimeout(() => {
                // Open WhatsApp link in a new tab
                window.open(whatsappUrl, '_blank', 'noopener');
                
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-right:8px;">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                    Sent via WhatsApp!
                `;
                btn.style.background = '#128C7E';
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1000);
        });
    }

    // ── Parallax effect on hero orbs ──
    if (window.matchMedia('(pointer: fine)').matches) {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', (e) => {
                const rect = hero.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                const orbs = hero.querySelectorAll('.hero-orb');
                orbs.forEach((orb, i) => {
                    const speed = (i + 1) * 15;
                    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });
            });
        }
    }

    // ── Tilt effect on hero image ──
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper && window.matchMedia('(pointer: fine)').matches) {
        heroImageWrapper.addEventListener('mousemove', (e) => {
            const rect = heroImageWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            heroImageWrapper.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });

        heroImageWrapper.addEventListener('mouseleave', () => {
            heroImageWrapper.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            heroImageWrapper.style.transition = 'transform 0.5s ease-out';
            setTimeout(() => {
                heroImageWrapper.style.transition = '';
            }, 500);
        });
    }

    // ── Dynamic CSS spin keyframes for form button ──
    const style = document.createElement('style');
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);

    // ── Typed effect for hero subtitle (optional subtle touch) ──
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(10px)';
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease-out';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300);
    }

    // ── Easter egg: Konami Code ──
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                document.body.style.transition = 'filter 0.5s';
                document.body.style.filter = 'hue-rotate(90deg)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 3000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // ── Live Stats Fetcher ──
    function setStatCount(statKey, count) {
        const elements = document.querySelectorAll(`[data-stat="${statKey}"]`);
        elements.forEach(el => {
            const oldTarget = parseInt(el.dataset.count);
            if (oldTarget === count) return;
            el.dataset.count = count;
            if (el.textContent !== '0') {
                animateCounter(el);
            }
        });
    }

    async function updateLiveStats() {
        // 1. GitHub (Direct API fetch)
        try {
            const res = await fetch('https://api.github.com/users/Robin-R-G');
            if (res.ok) {
                const data = await res.json();
                if (data.followers !== undefined) {
                    setStatCount('github-followers', data.followers);
                }
                if (data.public_repos !== undefined) {
                    setStatCount('github-repos', data.public_repos);
                }
            }
        } catch (e) {
            console.warn('Could not fetch live GitHub stats:', e);
        }

        // Helper to fetch and parse via allorigins proxy
        async function fetchViaProxy(targetUrl) {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error(`Proxy fetch failed for ${targetUrl}`);
            const data = await res.json();
            return data.contents;
        }

        // 2. Spotify
        try {
            const html = await fetchViaProxy('https://open.spotify.com/artist/6SaA1ADzXWprxPQKBVqjNL');
            const followersMatch = html.match(/Artist\s*·\s*([\d,]+)\s*followers/i) || html.match(/"followers"\s*:\s*\{\s*"total"\s*:\s*(\d+)/i);
            if (followersMatch) {
                const count = parseInt(followersMatch[1].replace(/,/g, ''));
                setStatCount('spotify-followers', count);
            }
            const listenersMatch = html.match(/([\d,]+)\s*monthly\s*listeners/i) || html.match(/"monthlyListeners"\s*:\s*(\d+)/i);
            if (listenersMatch) {
                const count = parseInt(listenersMatch[1].replace(/,/g, ''));
                setStatCount('spotify-listeners', count);
            }
        } catch (e) {
            console.warn('Could not fetch live Spotify stats:', e);
        }

        // 3. YouTube
        try {
            const html = await fetchViaProxy('https://www.youtube.com/@TheRobinRG');
            const subMatch = html.match(/"subscriberCountText"\s*:\s*\{\s*"simpleText"\s*:\s*"([^"]+)"/i) || html.match(/([\d,.]+K?)\s*subscribers/i);
            if (subMatch) {
                let subsText = subMatch[1].replace(/subscribers/i, '').trim();
                let subs = parseFloat(subsText.replace(/,/g, ''));
                if (subsText.toLowerCase().includes('k')) {
                    subs = Math.round(subs * 1000);
                } else if (subsText.toLowerCase().includes('m')) {
                    subs = Math.round(subs * 1000000);
                }
                if (!isNaN(subs)) {
                    setStatCount('youtube-subscribers', subs);
                }
            }
        } catch (e) {
            console.warn('Could not fetch live YouTube stats:', e);
        }

        // 4. Instagram
        try {
            const html = await fetchViaProxy('https://www.instagram.com/me.robinrg/');
            const followersMatch = html.match(/(?:content=["']|description" content=["'])([\d,.]+K?)\s*Followers/i) || html.match(/([\d,.]+K?)\s*Followers/i);
            if (followersMatch) {
                let followersText = followersMatch[1].trim();
                let followers = parseFloat(followersText.replace(/,/g, ''));
                if (followersText.toLowerCase().includes('k')) {
                    followers = Math.round(followers * 1000);
                }
                if (!isNaN(followers)) {
                    setStatCount('instagram-followers', followers);
                }
            }
        } catch (e) {
            console.warn('Could not fetch live Instagram stats:', e);
        }

        // 5. LinkedIn
        try {
            const html = await fetchViaProxy('https://in.linkedin.com/in/robinrg');
            const connMatch = html.match(/([\d,]+)\s*followers/i) || html.match(/([\d,]+)\s*connections/i);
            if (connMatch) {
                const conns = parseInt(connMatch[1].replace(/,/g, ''));
                setStatCount('linkedin-followers', conns);
            }
        } catch (e) {
            console.warn('Could not fetch live LinkedIn stats:', e);
        }
    }

    updateLiveStats();

});
