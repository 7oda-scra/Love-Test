document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. Data Initialization & Config Hydration
    // =========================================
    const cfg = window.CONFIG || {};
    const messages = cfg.messages || {};
    const partnerName = cfg.partnerName || "Rana";
    const yourName = cfg.yourName || "Mahmoud";
    const nickname = cfg.nickname || "Rony";

    // Text Injections
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text) el.textContent = text;
    };

    setText('preloaderName', partnerName);
    setText('subtitle', messages.subtitle);
    setText('partnerName', partnerName);
    setText('yourName', yourName);
    setText('partnerDescription', cfg.characters ? cfg.characters.partner : "My beautiful angel");
    setText('yourDescription', cfg.characters ? cfg.characters.you : "Forever yours");
    setText('loveNoteText', messages.loveNote);
    setText('specialMessageTitle', `To My Dearest ${nickname || partnerName}`);
    setText('specialMessage1', messages.specialMessage);
    setText('specialMessage2', messages.specialMessage2);
    setText('signature', messages.signature);
    setText('heroBadgeText', `${yourName.toUpperCase()} & ${partnerName.toUpperCase()} • ETERNAL DEVOTION`);

    if (cfg.music) {
        setText('audioTrackTitle', cfg.music.title || "Our Eternal Melody");
        setText('audioTrackArtist', cfg.music.artist || `${yourName} & ${partnerName} 💕`);
    }

    if (cfg.certificate) {
        setText('certTitle', cfg.certificate.title || "Certificate of Eternal Love");
        setText('certSubtitle', cfg.certificate.subtitle || "Inscribed in the Stars & Sealed by the Heart");
        setText('certStatement', cfg.certificate.statement);
        setText('certDate', cfg.certificate.date || "Certified for Eternity");
    }

    // =========================================
    // 2. Audio Architecture
    // =========================================
    const bgmAudio = document.getElementById('bgmAudio');
    const audioPlayerWidget = document.getElementById('audioPlayerWidget');
    const audioToggle = document.getElementById('audioToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    let isPlaying = false;
    let audioUnlocked = false;

    const hoverSound = new Audio('assets/audio/hover.mp3');
    hoverSound.volume = 0.15;
    const clickSound = new Audio('assets/audio/click.mp3');
    clickSound.volume = 0.4;

    const playSound = (sound) => {
        if (!audioUnlocked) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    };

    const updateAudioState = (playing) => {
        isPlaying = playing;
        if (playing) {
            audioToggle.textContent = '🔊';
            audioPlayerWidget.classList.add('is-playing');
        } else {
            audioToggle.textContent = '🔇';
            audioPlayerWidget.classList.remove('is-playing');
        }
    };

    if (audioToggle && bgmAudio) {
        audioToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            playSound(clickSound);
            if (bgmAudio.paused) {
                bgmAudio.play().then(() => updateAudioState(true)).catch(() => {});
            } else {
                bgmAudio.pause();
                updateAudioState(false);
            }
        });
    }

    if (volumeSlider && bgmAudio) {
        volumeSlider.addEventListener('input', (e) => {
            bgmAudio.volume = parseFloat(e.target.value);
            if (bgmAudio.volume === 0) {
                audioToggle.textContent = '🔇';
            } else if (isPlaying) {
                audioToggle.textContent = '🔊';
            }
        });
    }

    // =========================================
    // 3. Weighty Lenis Smooth Scroll
    // =========================================
    const lenis = new Lenis({
        duration: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        lerp: 0.06
    });
    lenis.stop();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    // Floating Nav Dock Active State Tracker
    const dockItems = document.querySelectorAll('.dock-item');
    dockItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            playSound(clickSound);
            const targetId = item.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                lenis.scrollTo(targetEl, { offset: -50, duration: 1.8 });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('header, section');
        const scrollY = window.pageYOffset + 250;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                dockItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    });

    // =========================================
    // 4. Ambient Drifting Canvas (Stardust & Stars)
    // =========================================
    const driftCanvas = document.getElementById('driftCanvas');
    if (driftCanvas) {
        const ctx = driftCanvas.getContext('2d');
        let particles = [];

        const resize = () => {
            driftCanvas.width = window.innerWidth;
            driftCanvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset(true);
            }
            reset(initial = false) {
                this.x = Math.random() * driftCanvas.width;
                this.y = initial ? Math.random() * driftCanvas.height : driftCanvas.height + 20;
                this.vx = (Math.random() - 0.5) * 0.3;
                this.vy = -(Math.random() * 0.5 + 0.2);
                this.radius = Math.random() * 1.8 + 0.4;
                this.alpha = Math.random() * 0.6 + 0.2;
                this.twinkle = Math.random() * 0.02 + 0.005;
                this.color = Math.random() > 0.4 ? 'rgba(255, 192, 203,' : 'rgba(229, 192, 123,';
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.alpha += Math.sin(Date.now() * this.twinkle) * 0.01;
                if (this.y < -20 || this.x < -20 || this.x > driftCanvas.width + 20) {
                    this.reset(false);
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} ${Math.max(0.1, Math.min(0.9, this.alpha))})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 140; i++) particles.push(new Particle());

        function animateDrift() {
            ctx.clearRect(0, 0, driftCanvas.width, driftCanvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateDrift);
        }
        animateDrift();
    }

    // =========================================
    // 5. Interactive Heart Burst Cannon Canvas
    // =========================================
    const heartCanvas = document.getElementById('heartCanvas');
    let heartCtx, heartParticles = [];

    if (heartCanvas) {
        heartCtx = heartCanvas.getContext('2d');
        const resizeHearts = () => {
            heartCanvas.width = window.innerWidth;
            heartCanvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeHearts);
        resizeHearts();

        class HeartParticle {
            constructor(x, y, vx, vy, size, emoji) {
                this.x = x;
                this.y = y;
                this.vx = vx || (Math.random() - 0.5) * 6;
                this.vy = vy || (Math.random() * -7 - 3);
                this.size = size || Math.random() * 18 + 14;
                this.alpha = 1;
                this.decay = Math.random() * 0.012 + 0.008;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.08;
                this.emoji = emoji || (Math.random() > 0.4 ? '💕' : (Math.random() > 0.5 ? '💖' : '💋'));
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.vy += 0.12; // gentle gravity
                this.alpha -= this.decay;
                this.rotation += this.rotationSpeed;
            }
            draw() {
                if (this.alpha <= 0) return;
                heartCtx.save();
                heartCtx.globalAlpha = Math.max(0, this.alpha);
                heartCtx.translate(this.x, this.y);
                heartCtx.rotate(this.rotation);
                heartCtx.font = `${this.size}px serif`;
                heartCtx.textAlign = 'center';
                heartCtx.textBaseline = 'middle';
                heartCtx.fillText(this.emoji, 0, 0);
                heartCtx.restore();
            }
        }

        window.spawnHearts = (x, y, count = 15, emoji = null) => {
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
                const speed = Math.random() * 5 + 3;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed - 3;
                heartParticles.push(new HeartParticle(x, y, vx, vy, Math.random() * 16 + 14, emoji));
            }
        };

        function animateHeartCanvas() {
            heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
            for (let i = heartParticles.length - 1; i >= 0; i--) {
                const p = heartParticles[i];
                p.update();
                p.draw();
                if (p.alpha <= 0) heartParticles.splice(i, 1);
            }
            requestAnimationFrame(animateHeartCanvas);
        }
        animateHeartCanvas();
    }

    // =========================================
    // 6. Live "Time Spent Loving You" Heartbeat Clock
    // =========================================
    const startDate = new Date(cfg.startDate || "2023-11-01T00:00:00");
    const elDays = document.getElementById('timeDays');
    const elHours = document.getElementById('timeHours');
    const elMinutes = document.getElementById('timeMinutes');
    const elSeconds = document.getElementById('timeSeconds');
    const elTotalText = document.getElementById('heartbeatTotalText');

    function updateLoveClock() {
        const now = new Date();
        const diffMs = Math.max(0, now - startDate);

        const totalSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (elDays) elDays.textContent = String(days).padStart(3, '0');
        if (elHours) elHours.textContent = String(hours).padStart(2, '0');
        if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
        if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');

        if (elTotalText) {
            elTotalText.textContent = `Over ${days.toLocaleString()} days of endless smiles, laughs, and pure love ✨`;
        }
    }
    updateLoveClock();
    setInterval(updateLoveClock, 1000);

    // =========================================
    // 7. Morphing Decode Title
    // =========================================
    const morphText = document.getElementById('morphText');
    const words = ["LOVE", nickname.toUpperCase() || "RONY", "MY ANGEL", "SOULMATE"];
    const charsList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*✦";
    let wordIndex = 0;

    function morphNext() {
        if (!morphText) return;
        const targetWord = words[wordIndex];
        let iteration = 0;
        morphText.classList.remove('morph-halo');

        const scrambleInterval = setInterval(() => {
            morphText.innerText = targetWord.split("").map((letter, index) => {
                if (index < iteration) return targetWord[index];
                return charsList[Math.floor(Math.random() * charsList.length)];
            }).join("");

            if (iteration >= targetWord.length) {
                clearInterval(scrambleInterval);
                morphText.innerText = targetWord;
                if (targetWord === nickname.toUpperCase() || targetWord === "RONY") {
                    morphText.classList.add('morph-halo');
                }
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(morphNext, 4500);
            }
            iteration += 1 / 8;
        }, 45);
    }

    // =========================================
    // 8. Interactive 3D Wax Seal Envelope
    // =========================================
    const waxEnvelope = document.getElementById('waxEnvelope');
    const waxSeal = document.getElementById('waxSeal');
    const loveButton = document.getElementById('loveButton');
    const closeLetterBtn = document.getElementById('closeLetterBtn');

    function toggleLetter(open) {
        playSound(clickSound);
        if (open) {
            waxEnvelope.classList.add('is-open');
            if (loveButton) loveButton.textContent = "Close Letter ✉️";
            const rect = waxEnvelope.getBoundingClientRect();
            if (window.spawnHearts) {
                window.spawnHearts(rect.left + rect.width / 2, rect.top + 100, 25, '💌');
            }
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#E5C07B', '#FFC0CB', '#FFFFFF']
                });
            }
        } else {
            waxEnvelope.classList.remove('is-open');
            if (loveButton) loveButton.textContent = "Open My Love Letter 💝";
        }
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }

    if (waxSeal) waxSeal.addEventListener('click', () => toggleLetter(true));
    if (loveButton) {
        loveButton.addEventListener('click', () => {
            const isOpen = waxEnvelope.classList.contains('is-open');
            toggleLetter(!isOpen);
        });
    }
    if (closeLetterBtn) closeLetterBtn.addEventListener('click', () => toggleLetter(false));

    // Interactive Avatars Sweet Whispers
    const partnerCard = document.getElementById('partnerCard');
    const yourCard = document.getElementById('yourCard');

    function showToast(msg) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast-glass';
        toast.textContent = msg;
        toastContainer.appendChild(toast);

        gsap.fromTo(toast, { opacity: 0, y: 30, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" });
        setTimeout(() => {
            gsap.to(toast, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in", onComplete: () => toast.remove() });
        }, 4500);
    }

    if (partnerCard) {
        partnerCard.addEventListener('click', (e) => {
            playSound(clickSound);
            const msg = cfg.characterMessages ? cfg.characterMessages.partner : `${partnerName}, you are the love of my life! 💕`;
            showToast(msg);
            if (window.spawnHearts) window.spawnHearts(e.clientX, e.clientY, 15, '🌸');
        });
    }

    if (yourCard) {
        yourCard.addEventListener('click', (e) => {
            playSound(clickSound);
            const msg = cfg.characterMessages ? cfg.characterMessages.you : `I'm so lucky to have you in my life, ${partnerName}! 💖`;
            showToast(msg);
            if (window.spawnHearts) window.spawnHearts(e.clientX, e.clientY, 15, '🛡️');
        });
    }

    // =========================================
    // 9. Celestial Timeline Generation
    // =========================================
    const timelineContainer = document.getElementById('timelineContainer');
    if (timelineContainer && cfg.timeline) {
        timelineContainer.innerHTML = '';
        cfg.timeline.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.innerHTML = `
                <div class="timeline-marker hover-trigger">${item.icon || '✦'}</div>
                <div class="timeline-card glass-panel hover-trigger">
                    <div class="timeline-header">
                        <span class="timeline-tag">${item.tag || `CHAPTER ${index + 1}`}</span>
                        <span class="timeline-date">${item.date || ''}</span>
                    </div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-desc">${item.description}</p>
                </div>
            `;
            timelineContainer.appendChild(el);
        });
    }

    // =========================================
    // 10. "Reasons Why I Love You" Interactive Deck
    // =========================================
    const reasons = cfg.reasons || [];
    let currentReasonIdx = 0;

    const elReasonIcon = document.getElementById('reasonIcon');
    const elReasonNumber = document.getElementById('reasonNumber');
    const elReasonTitle = document.getElementById('reasonTitle');
    const elReasonText = document.getElementById('reasonText');
    const elReasonCounter = document.getElementById('reasonsCounterBadge');
    const activeReasonCard = document.getElementById('activeReasonCard');

    function renderReason(index, direction = 1) {
        if (!reasons.length || !activeReasonCard) return;
        currentReasonIdx = (index + reasons.length) % reasons.length;
        const item = reasons[currentReasonIdx];

        gsap.to(activeReasonCard, {
            opacity: 0,
            x: direction * -40,
            rotateY: direction * 15,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                elReasonIcon.textContent = item.icon || '💖';
                elReasonNumber.textContent = `REASON #${item.id || currentReasonIdx + 1}`;
                elReasonTitle.textContent = item.title;
                elReasonText.textContent = item.text;
                if (elReasonCounter) {
                    elReasonCounter.textContent = `${currentReasonIdx + 1} / ${reasons.length}`;
                }

                gsap.fromTo(activeReasonCard,
                    { opacity: 0, x: direction * 40, rotateY: direction * -15 },
                    { opacity: 1, x: 0, rotateY: 0, duration: 0.35, ease: "power2.out" }
                );
            }
        });
    }

    const prevReasonBtn = document.getElementById('prevReasonBtn');
    const nextReasonBtn = document.getElementById('nextReasonBtn');
    const randomReasonBtn = document.getElementById('randomReasonBtn');

    if (prevReasonBtn) {
        prevReasonBtn.addEventListener('click', () => {
            playSound(clickSound);
            renderReason(currentReasonIdx - 1, -1);
        });
    }

    if (nextReasonBtn) {
        nextReasonBtn.addEventListener('click', () => {
            playSound(clickSound);
            renderReason(currentReasonIdx + 1, 1);
        });
    }

    if (randomReasonBtn) {
        randomReasonBtn.addEventListener('click', (e) => {
            playSound(clickSound);
            let nextRnd = Math.floor(Math.random() * reasons.length);
            if (nextRnd === currentReasonIdx) nextRnd = (currentReasonIdx + 1) % reasons.length;
            renderReason(nextRnd, 1);
            if (window.spawnHearts) window.spawnHearts(e.clientX, e.clientY, 15, '✨');
        });
    }

    // =========================================
    // 11. "Open When..." Letters Grid & Modal
    // =========================================
    const openWhenGrid = document.getElementById('openWhenGrid');
    const openWhenModal = document.getElementById('openWhenModal');
    const openWhenBackdrop = document.getElementById('openWhenBackdrop');
    const openWhenClose = document.getElementById('openWhenClose');
    const modalEmoji = document.getElementById('modalEmoji');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalLetterText = document.getElementById('modalLetterText');

    if (openWhenGrid && cfg.openWhen) {
        openWhenGrid.innerHTML = '';
        cfg.openWhen.forEach((item) => {
            const card = document.createElement('div');
            card.className = 'open-when-card glass-panel hover-trigger';
            card.innerHTML = `
                <div class="open-when-emoji">${item.emoji || '💌'}</div>
                <span class="open-when-preview">${item.preview || 'Open When...'}</span>
                <h3 class="open-when-card-title">${item.title}</h3>
                <span class="open-when-action-hint">Unfold Letter →</span>
            `;
            card.addEventListener('click', () => {
                playSound(clickSound);
                modalEmoji.textContent = item.emoji || '💌';
                modalTag.textContent = item.preview || 'Open When...';
                modalTitle.textContent = item.title;
                modalLetterText.textContent = item.letter;
                openWhenModal.classList.add('is-active');
            });
            openWhenGrid.appendChild(card);
        });
    }

    const closeOpenWhen = () => {
        playSound(clickSound);
        openWhenModal.classList.remove('is-active');
    };
    if (openWhenBackdrop) openWhenBackdrop.addEventListener('click', closeOpenWhen);
    if (openWhenClose) openWhenClose.addEventListener('click', closeOpenWhen);

    // =========================================
    // 12. Polaroid Lightbox Modal for Memories
    // =========================================
    const galleryItems = cfg.gallery || [
        { src: "assets/images/photo4.jpg", title: "Late Night Talks", date: "Endless Whispers", caption: "Those endless conversations that made us forget about time..." },
        { src: "assets/images/photo5.jpg", title: "The Day We Meet", date: "Our Destined Day", caption: "I know the day we meet will be magical and unforgettable..." },
        { src: "assets/images/photo1.jpg", title: "Your Care & Voice", date: "Sweetest Melody", caption: "Your caring nature melts my heart every single day..." }
    ];

    let currentGalleryIdx = 0;
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDate = document.getElementById('lightboxDate');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCount = document.getElementById('lightboxCount');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    function openLightbox(index) {
        playSound(clickSound);
        currentGalleryIdx = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentGalleryIdx];

        lightboxImg.src = item.src;
        lightboxTitle.textContent = item.title;
        lightboxDate.textContent = item.date;
        lightboxCaption.textContent = item.caption;
        lightboxCount.textContent = `${currentGalleryIdx + 1} / ${galleryItems.length}`;
        lightboxModal.classList.add('is-active');
    }

    function closeLightbox() {
        playSound(clickSound);
        lightboxModal.classList.remove('is-active');
    }

    document.querySelectorAll('.editorial-memory-card').forEach((card, idx) => {
        card.addEventListener('click', () => openLightbox(idx));
    });

    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(currentGalleryIdx - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(currentGalleryIdx + 1);
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeOpenWhen();
        } else if (lightboxModal.classList.contains('is-active')) {
            if (e.key === 'ArrowLeft') openLightbox(currentGalleryIdx - 1);
            if (e.key === 'ArrowRight') openLightbox(currentGalleryIdx + 1);
        }
    });

    // =========================================
    // 13. Virtual Kiss Cannon & Milestone Engine
    // =========================================
    const kissButton = document.getElementById('kissButton');
    const kissBlowButton = document.getElementById('kissBlowButton');
    const kissCountDisplay = document.getElementById('kissCount');
    const kissMilestoneFill = document.getElementById('kissMilestoneFill');
    const kissNextMilestone = document.getElementById('kissNextMilestone');
    let kissCount = 0;

    const milestones = [10, 25, 50, 75, 100];
    const romanticMilestoneMsgs = cfg.kissMessages || {
        10: "10 kisses! You're so sweet, MyR! 💕",
        25: "25 kisses! My heart is racing for you! 💖",
        50: "50 kisses! I'm falling deeper in love! 💘",
        75: "75 kisses! Can't wait to kiss you in real life! 💋",
        100: "100 kisses! You're my everything, Rony! 💍✨"
    };

    function triggerKiss(e, isShower = false) {
        playSound(clickSound);
        const kissesAdded = isShower ? 5 : 1;
        kissCount += kissesAdded;
        kissCountDisplay.textContent = kissCount;

        gsap.fromTo(kissCountDisplay, { scale: 1.4, color: '#FF758C' }, { scale: 1, color: '#E5C07B', duration: 0.5, ease: "elastic.out(1, 0.3)" });

        const clientX = e ? e.clientX : window.innerWidth / 2;
        const clientY = e ? e.clientY : window.innerHeight / 2;

        if (window.spawnHearts) {
            window.spawnHearts(clientX, clientY, isShower ? 30 : 12, isShower ? '💋' : '💕');
        }

        // Calculate progress to next milestone
        const nextTarget = milestones.find(m => m > kissCount) || (Math.ceil(kissCount / 50) * 50);
        const prevTarget = [...milestones].reverse().find(m => m <= kissCount) || 0;
        const progressPct = Math.min(100, Math.round(((kissCount - prevTarget) / (nextTarget - prevTarget)) * 100));

        if (kissMilestoneFill) kissMilestoneFill.style.width = `${progressPct}%`;
        if (kissNextMilestone) kissNextMilestone.textContent = `Next milestone surprise at ${nextTarget} kisses ✨`;

        // Check if just reached or crossed a milestone
        milestones.forEach(m => {
            if (kissCount >= m && kissCount - kissesAdded < m) {
                const celebrationMsg = romanticMilestoneMsgs[m] || `${m} kisses! You mean the world to me! 💖`;
                showToast(celebrationMsg);

                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 80,
                        origin: { y: 0.5 },
                        colors: ['#FF758C', '#E5C07B', '#FFC0CB', '#FFFFFF']
                    });
                }
            }
        });
    }

    if (kissButton) kissButton.addEventListener('click', (e) => triggerKiss(e, false));
    if (kissBlowButton) kissBlowButton.addEventListener('click', (e) => triggerKiss(e, true));

    // =========================================
    // 14. Certificate of Eternal Love - Interactive Wax Stamp
    // =========================================
    const stampBtn = document.getElementById('stampBtn');
    const stampRingFill = document.getElementById('stampRingFill');
    const stampLabel = document.getElementById('stampLabel');
    const stampIcon = document.getElementById('stampIcon');
    let stampHoldTimer = null;
    let stampProgress = 0;
    const HOLD_TIME_MS = 1400;

    if (stampBtn && stampRingFill) {
        const circumference = 2 * Math.PI * 40; // ~251.2

        const startHold = (e) => {
            e.preventDefault();
            playSound(clickSound);
            if (stampBtn.classList.contains('is-sealed')) return;

            const startTime = Date.now();
            stampHoldTimer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                stampProgress = Math.min(1, elapsed / HOLD_TIME_MS);
                const offset = circumference * (1 - stampProgress);
                stampRingFill.style.strokeDashoffset = offset;

                if (stampProgress >= 1) {
                    clearInterval(stampHoldTimer);
                    sealCertificate();
                }
            }, 20);
        };

        const stopHold = () => {
            if (stampBtn.classList.contains('is-sealed')) return;
            if (stampHoldTimer) clearInterval(stampHoldTimer);
            stampProgress = 0;
            stampRingFill.style.strokeDashoffset = circumference;
        };

        function sealCertificate() {
            stampBtn.classList.add('is-sealed');
            stampLabel.textContent = "SEALED";
            stampIcon.textContent = "💍";
            showToast("✦ Our eternal love is officially sealed in the stars! ✦");

            if (typeof confetti === 'function') {
                const count = 200;
                const defaults = { origin: { y: 0.7 } };
                function fire(particleRatio, opts) {
                    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
                }
                fire(0.25, { spread: 26, startVelocity: 55, colors: ['#E5C07B', '#FFC0CB'] });
                fire(0.2, { spread: 60, colors: ['#FF758C', '#FFFFFF'] });
                fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
                fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#E5C07B', '#FF758C'] });
            }
        }

        stampBtn.addEventListener('mousedown', startHold);
        window.addEventListener('mouseup', stopHold);
        stampBtn.addEventListener('touchstart', startHold, { passive: false });
        window.addEventListener('touchend', stopHold);
    }

    // =========================================
    // 15. Masterpiece Finale Illumination Tracking
    // =========================================
    const specialMessageContainer = document.querySelector('#specialMessage .message-container');
    if (specialMessageContainer) {
        specialMessageContainer.addEventListener('mousemove', (e) => {
            const rect = specialMessageContainer.getBoundingClientRect();
            specialMessageContainer.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            specialMessageContainer.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    }

    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            playSound(clickSound);
            lenis.scrollTo(0, { duration: 2.2 });
        });
    }

    // =========================================
    // 16. Custom Dual-Ring Cursor
    // =========================================
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let lastHoverTime = 0;

    document.addEventListener('mousemove', (e) => {
        if (cursorDot) {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        }
        if (cursorOutline) {
            gsap.to(cursorOutline, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out"
            });
        }
    });

    document.querySelectorAll('.hover-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) cursorOutline.classList.add('hovering');
            const now = Date.now();
            if (audioUnlocked && now - lastHoverTime > 160) {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
                lastHoverTime = now;
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursorOutline) cursorOutline.classList.remove('hovering');
        });
    });

    // 3D Glare Parallax on Artifacts
    document.querySelectorAll('.magical-artifact, .hero-arch').forEach(card => {
        const glare = card.querySelector('.glare');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--glare-x', `${x}%`);
            card.style.setProperty('--glare-y', `${y}%`);
            if (glare) glare.style.opacity = '1';
        });
        card.addEventListener('mouseleave', () => {
            if (glare) glare.style.opacity = '0';
        });
    });

    // =========================================
    // 17. Cinematic Preloader & GSAP Load Check
    // =========================================
    let progress = 0;
    const enterBtn = document.getElementById('enterBtn');
    const preloaderCounter = document.getElementById('preloaderCounter');
    const preloaderFill = document.getElementById('preloaderFill');

    const simulateLoading = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(simulateLoading);
            if (preloaderCounter) preloaderCounter.textContent = '100%';
            if (preloaderFill) preloaderFill.style.width = '100%';
            if (enterBtn) enterBtn.classList.add('ready');
        } else {
            if (preloaderCounter) preloaderCounter.textContent = `${progress}%`;
            if (preloaderFill) preloaderFill.style.width = `${progress}%`;
        }
    }, 35);

    enterBtn.addEventListener('click', () => {
        audioUnlocked = true;
        bgmAudio.play().then(() => {
            updateAudioState(true);
            let vol = 0;
            const targetVol = 0.25;
            const fadeInterval = setInterval(() => {
                if (vol < targetVol) {
                    vol += 0.015;
                    bgmAudio.volume = Math.min(vol, targetVol);
                } else {
                    clearInterval(fadeInterval);
                }
            }, 80);
        }).catch(() => {});

        playSound(clickSound);

        const tl = gsap.timeline({
            onComplete: () => {
                document.querySelector('.preloader').style.display = 'none';
                lenis.start();
                morphNext();
                initScrollAnimations();
                if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            }
        });

        enterBtn.classList.remove('ready');
        tl.to('.preloader-progress-wrap, #enterBtn', { opacity: 0, duration: 0.6 })
          .to('.preloader', { y: "-100%", duration: 1.2, ease: "expo.inOut" })
          .fromTo('.header .hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
          .fromTo('.main-title', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1.2 }, "-=0.6")
          .fromTo('.hero-arch', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.8")
          .fromTo('.subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.6")
          .fromTo('.audio-player-pill, .floating-dock', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });

    // =========================================
    // 18. ScrollTrigger Entrance Animations
    // =========================================
    function initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        // Animate section headings & cards
        document.querySelectorAll('section').forEach(sec => {
            gsap.from(sec.querySelectorAll('.section-badge, .section-title, .section-subtitle'), {
                scrollTrigger: { trigger: sec, start: "top 85%" },
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });
        });

        // Time cards
        gsap.from('.time-card', {
            scrollTrigger: { trigger: '.time-grid', start: "top 85%" },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.5)"
        });

        // Characters
        gsap.from('.character', {
            scrollTrigger: { trigger: '.characters-section', start: "top 80%" },
            opacity: 0,
            y: 50,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out"
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            gsap.from(item, {
                scrollTrigger: { trigger: item, start: "top 85%" },
                opacity: 0,
                x: item.offsetLeft < window.innerWidth / 2 ? -50 : 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // Open When cards
        gsap.from('.open-when-card', {
            scrollTrigger: { trigger: '.open-when-grid', start: "top 85%" },
            opacity: 0,
            y: 40,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out"
        });

        // Special Message Bloom
        const smContainer = document.getElementById('specialMessage');
        if (smContainer) {
            gsap.fromTo(smContainer,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: { trigger: smContainer, start: "top 75%" },
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
        }
    }
});