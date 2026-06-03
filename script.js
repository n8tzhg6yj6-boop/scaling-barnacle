// ===== AMPHITHÉÂTRE D'AOSTE — JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initCounterAnimation();
    initParticles();
    initQuiz();
    initQRCode();
    initShareSection();
});
// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    if (!nav || !mobileBtn || !navLinks || links.length === 0) return;
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        updateActiveLink();
    });
    // Mobile menu
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        mobileBtn.classList.toggle('active');
    });
    // Close mobile on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            mobileBtn.classList.remove('active');
        });
    });
    // Active link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id], header[id]');
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}
// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    reveals.forEach(el => observer.observe(el));
}
// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => observer.observe(el));
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            if (target >= 10000) {
                el.textContent = current.toLocaleString('fr-FR');
            } else {
                el.textContent = current;
            }
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }
}
// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        particle.style.opacity = 0.1 + Math.random() * 0.3;
        particle.style.width = (2 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}
// ===== QUIZ =====
function initQuiz() {
    const form = document.getElementById('quiz-form');
    const submitBtn = document.getElementById('quiz-submit');
    const resetBtn = document.getElementById('quiz-reset');
    const resultsDiv = document.getElementById('quiz-results');
    if (!form || !submitBtn || !resetBtn || !resultsDiv) return;
    // Correct answers
    const answers = {
        q1: 'b',   // Augusta Praetoria Salassorum
        q2: 'b',   // 25 av. J.-C.
        q3: 'b',   // 60 arcs
        q4: 'b',   // Col du Grand-Saint-Bernard
        q5: 'b',   // Le bardiglio
        q6: 'b',   // 8 arches visibles aujourd'hui
        q7: 'b',   // Col du Grand-Saint-Bernard
        q8: 'b',   // Un verger
        q9: 'b',   // 8 arches
        q10: 'b'   // Combats de gladiateurs et chasses
    };
    const questionCards = Array.from(form.querySelectorAll('.quiz-question-card'));
    const totalQuestions = questionCards.length;
    const activeAnswers = questionCards.reduce((acc, card) => {
        const key = `q${card.dataset.question}`;
        if (answers[key]) acc[key] = answers[key];
        return acc;
    }, {});
    const explanations = {
        q1: 'La ville romaine d\'Aoste s\'appelait Augusta Praetoria Salassorum, fondée en l\'honneur de l\'empereur Auguste.',
        q2: 'La ville a été fondée en 25-24 av. J.-C. après la conquête des Salasses par le général Aulus Terentius Varro Murena.',
        q3: 'La façade extérieure était composée de 60 arcs en plein cintre répartis sur deux niveaux.',
        q4: 'Le Col du Grand-Saint-Bernard était le passage alpin stratégique contrôlé par Aoste pour rejoindre la Gaule et la Germanie.',
        q5: 'Le bardiglio est un marbre gris local extrait près de Villeneuve, un matériau unique dans le monde romain.',
        q6: '60 arcs en plein cintre formaient la façade extérieure sur deux niveaux.',
        q7: 'Le Col du Grand-Saint-Bernard (Alpis Poenina) menait vers la Gaule et la Germanie.',
        q8: 'Aujourd\'hui, l\'arène est occupée par le verger (frutteto) du couvent des sœurs de Saint-Joseph.',
        q9: 'Il ne reste que 8 arches du secteur nord-ouest, intégrées dans les murs du couvent.',
        q10: 'L\'amphithéâtre accueillait des combats de gladiateurs (munera) et des chasses d\'animaux sauvages (venationes).'
    };
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let score = 0;
        let allAnswered = true;
        // Check each question
        Object.keys(activeAnswers).forEach(q => {
            const selected = form.querySelector(`input[name="${q}"]:checked`);
            const card = form.querySelector(`[data-question="${q.replace('q', '')}"]`);
            const feedback = card.querySelector('.question-feedback');
            if (!selected) {
                allAnswered = false;
                card.style.borderLeftColor = '#ff9800';
                return;
            }
            feedback.classList.add('show');
            if (selected.value === answers[q]) {
                score++;
                card.classList.add('correct');
                card.classList.remove('incorrect');
                feedback.className = 'question-feedback show correct-feedback';
                feedback.innerHTML = `✅ Correct ! ${explanations[q]}`;
            } else {
                card.classList.add('incorrect');
                card.classList.remove('correct');
                feedback.className = 'question-feedback show incorrect-feedback';
                feedback.innerHTML = `❌ Incorrect. ${explanations[q]}`;
            }
            // Disable options after submission
            card.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = true;
            });
        });
        if (!allAnswered) {
            alert('Veuillez répondre à toutes les questions avant de soumettre.');
            return;
        }
        // Show results
        resultsDiv.style.display = 'block';
        const scoreValue = document.getElementById('score-value');
        const scoreTotal = document.getElementById('score-total');
        const barFill = document.getElementById('results-bar-fill');
        const message = document.getElementById('results-message');
        scoreTotal.textContent = totalQuestions;
        // Animate score
        animateScore(scoreValue, score);
        // Animate bar
        setTimeout(() => {
            barFill.style.width = (score / totalQuestions * 100) + '%';
        }, 300);
        // Message based on score
        if (score === totalQuestions) {
            message.textContent = '🎉 Parfait ! Vous êtes un expert de l\'amphithéâtre d\'Aoste ! Félicitations !';
            barFill.style.background = 'linear-gradient(90deg, #4caf50, #8bc34a, #cddc39)';
        } else if (score >= Math.ceil(totalQuestions * 0.7)) {
            message.textContent = '👏 Très bien ! Vous avez de bonnes connaissances sur l\'amphithéâtre. Continuez comme ça !';
            barFill.style.background = 'linear-gradient(90deg, #673ab7, #9c27b0, #e040fb)';
        } else if (score >= Math.ceil(totalQuestions * 0.5)) {
            message.textContent = '📚 Pas mal ! Mais il y a encore des choses à apprendre. Relisez la présentation !';
            barFill.style.background = 'linear-gradient(90deg, #ff9800, #ffc107)';
        } else {
            message.textContent = '📖 Il faut réviser ! Relisez attentivement la présentation et réessayez.';
            barFill.style.background = 'linear-gradient(90deg, #f44336, #ff5722)';
        }
        // Hide submit, show reset
        submitBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    // Reset quiz
    resetBtn.addEventListener('click', () => {
        form.reset();
        resultsDiv.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
        document.querySelectorAll('.quiz-question-card').forEach(card => {
            card.classList.remove('correct', 'incorrect');
            card.style.borderLeftColor = 'transparent';
            card.querySelectorAll('input[type="radio"]').forEach(input => {
                input.disabled = false;
            });
            const feedback = card.querySelector('.question-feedback');
            feedback.classList.remove('show', 'correct-feedback', 'incorrect-feedback');
            feedback.innerHTML = '';
        });
        const barFill = document.getElementById('results-bar-fill');
        barFill.style.width = '0%';
        // Scroll to quiz top
        document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
    });
    function animateScore(el, target) {
        let current = 0;
        const interval = setInterval(() => {
            current++;
            el.textContent = current;
            if (current >= target) {
                clearInterval(interval);
            }
        }, 100);
    }
}
// ===== QR CODE =====
function initQRCode() {
    const canvas = document.getElementById('qr-canvas');
    const downloadBtn = document.getElementById('download-qr');
    if (!canvas || !downloadBtn) return;
    const currentUrl = window.location.href;
    const isLocalFile = currentUrl.startsWith('file:');
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const pageName = window.location.pathname.split('/').pop() || 'index(fr).html';
    const quizUrl = isLocalFile
        ? `${pageName}#quiz-section`
        : `${window.location.protocol}//${window.location.host}${window.location.pathname}#quiz-section`;
    const qrUrlEl = document.getElementById('qr-url');
    const qrWarningEl = document.getElementById('qr-warning');
    if (qrUrlEl) {
        qrUrlEl.textContent = `URL du QR : ${quizUrl}`;
    }
    if (qrWarningEl) {
        if (isLocalFile) {
            qrWarningEl.textContent = '⚠️ Cette page est ouverte en local depuis votre ordinateur. Le QR ne fonctionnera pas sur un téléphone.';
        } else if (isLocalhost) {
            qrWarningEl.textContent = '⚠️ Cette adresse utilise localhost. Pour scanner depuis un téléphone, ouvrez la page avec l’adresse IP de votre ordinateur sur le réseau local et actualisez la page.';
        } else {
            qrWarningEl.textContent = '';
        }
    }
    function generateQR() {
        if (typeof qrcode === 'undefined') {
            setTimeout(generateQR, 200);
            return;
        }
        try {
            const qr = qrcode(0, 'H');
            qr.addData(quizUrl);
            qr.make();
            const dataUrl = qr.createDataURL(8, 2);
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const size = Math.min(canvas.width, canvas.height);
                const offsetX = (canvas.width - size) / 2;
                const offsetY = (canvas.height - size) / 2;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, offsetX, offsetY, size, size);
            };
            image.src = dataUrl;
        } catch (error) {
            console.error('QR Code generation failed:', error);
            generateFallbackQR(canvas, quizUrl);
        }
    }
    generateQR();
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'qr-quiz-amphitheatre-aoste.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}
function generateFallbackQR(canvas, url) {
    const ctx = canvas.getContext('2d');
    canvas.width = 250;
    canvas.height = 250;
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 250, 250);
    // Simple hash-based pattern
    const size = 10;
    const modules = 25;
    ctx.fillStyle = '#1a1a28';
    // Create a deterministic pattern from URL
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        hash = ((hash << 5) - hash) + url.charCodeAt(i);
        hash |= 0;
    }
    for (let y = 0; y < modules; y++) {
        for (let x = 0; x < modules; x++) {
            // Position detection patterns
            if ((x < 7 && y < 7) || (x >= modules - 7 && y < 7) || (x < 7 && y >= modules - 7)) {
                const isOuter = x === 0 || x === 6 || y === 0 || y === 6 ||
                    x === modules - 7 || x === modules - 1 || y === modules - 7 || y === modules - 1;
                const isInner = (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
                    (x >= modules - 5 && x <= modules - 3 && y >= 2 && y <= 4) ||
                    (x >= 2 && x <= 4 && y >= modules - 5 && y <= modules - 3);
                if (isOuter || isInner) {
                    ctx.fillRect(x * size, y * size, size, size);
                }
            } else {
                // Data pattern
                const seed = (hash + x * 31 + y * 37) % 100;
                if (seed < 40) {
                    ctx.fillRect(x * size, y * size, size, size);
                }
            }
        }
    }
    // Add text below
    ctx.fillStyle = '#666';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
}

// ===== SHARE SECTION =====
function initShareSection() {
    const shareInput = document.getElementById('share-link');
    const copyBtn = document.getElementById('copy-link-btn');
    const shareCanvas = document.getElementById('share-qr-canvas');
    const downloadShareBtn = document.getElementById('download-share-qr');
    if (!shareInput || !copyBtn || !shareCanvas) return;
    const shareUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    shareInput.value = shareUrl;
    copyBtn.addEventListener('click', () => {
        shareInput.select();
        document.execCommand('copy');
        copyBtn.classList.add('copied');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copie!';
        setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = originalHTML;
        }, 2000);
    });
    function generateShareQR() {
        if (typeof qrcode === 'undefined') {
            setTimeout(generateShareQR, 200);
            return;
        }
        try {
            const qr = qrcode(0, 'H');
            qr.addData(shareUrl);
            qr.make();
            const dataUrl = qr.createDataURL(8, 2);
            const ctx = shareCanvas.getContext('2d');
            const image = new Image();
            image.onload = function() {
                ctx.clearRect(0, 0, shareCanvas.width, shareCanvas.height);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, shareCanvas.width, shareCanvas.height);
                ctx.drawImage(image, 0, 0, shareCanvas.width, shareCanvas.height);
            };
            image.src = dataUrl;
        } catch (error) {
            console.error('Share QR generation failed:', error);
        }
    }
    generateShareQR();
    if (downloadShareBtn) {
        downloadShareBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.download = 'qr-amphitheatre-aoste-partage.png';
            link.href = shareCanvas.toDataURL('image/png');
            link.click();
        });
    }
}
