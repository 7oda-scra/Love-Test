document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // 1. Content Injection & Setup
    // -----------------------------------------
    if (window.CONFIG) {
        document.getElementById('subtitle').textContent = window.CONFIG.messages.subtitle;
        document.getElementById('partnerName').textContent = window.CONFIG.partnerName || "Your Love";
        document.getElementById('yourName').textContent = window.CONFIG.yourName || "You";
        document.getElementById('partnerDescription').textContent = window.CONFIG.characters.partner;
        document.getElementById('yourDescription').textContent = window.CONFIG.characters.you;
        document.getElementById('memoryLateNight').textContent = window.CONFIG.memories.lateNight;
        document.getElementById('memoryFirstMeeting').textContent = window.CONFIG.memories.firstMeeting;
        document.getElementById('memoryCare').textContent = window.CONFIG.memories.care;
        document.getElementById('specialMessageTitle').textContent = window.CONFIG.partnerName ? `To My Dearest ${window.CONFIG.partnerName}` : "To My Dearest Love";
        document.getElementById('specialMessage1').textContent = window.CONFIG.messages.specialMessage;
        document.getElementById('specialMessage2').textContent = window.CONFIG.messages.specialMessage2;
        document.getElementById('signature').textContent = window.CONFIG.messages.signature;
        document.getElementById('loveNoteText').textContent = window.CONFIG.messages.loveNote;
        document.getElementById('preloaderName').textContent = window.CONFIG.partnerName || "Welcome";
    }

    // -----------------------------------------
    // 2. Global Native Audio
    // -----------------------------------------
    const bgmAudio = document.getElementById('bgmAudio');
    bgmAudio.volume = 0; 
    const MAX_BGM_VOLUME = 0.15; 
    let isBgmMuted = false;
    let audioUnlocked = false;

    const hoverSound = new Audio('assets/audio/hover.mp3');
    hoverSound.volume = 0.2;
    const clickSound = new Audio('assets/audio/click.mp3');
    clickSound.volume = 0.5;

    const audioToggle = document.getElementById('audioToggle');
    audioToggle.addEventListener('click', () => {
        isBgmMuted = !isBgmMuted;
        bgmAudio.muted = isBgmMuted;
        audioToggle.textContent = isBgmMuted ? '🔇' : '🔊';
        if (audioUnlocked) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e=>{});
        }
    });

    // -----------------------------------------
    // 3. Luxurious Morphing Decode
    // -----------------------------------------
    const morphText = document.getElementById('morphText');
    const words = ["LOVE", "RONY"];
    const charsList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
    let wordIndex = 0;

    function morphNext() {
        if(!morphText) return;
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
                if(targetWord === "RONY") morphText.classList.add('morph-halo');
                
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(morphNext, 4500); 
            }
            iteration += 1 / 10; 
        }, 50); 
    }

    // -----------------------------------------
    // 4. Weighty Lenis Scroll
    // -----------------------------------------
    const lenis = new Lenis({ 
        duration: 2.5, 
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical', 
        smooth: true,
        lerp: 0.05 
    });
    lenis.stop();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    // -----------------------------------------
    // 5. Endless Drift Environmental Canvas
    // -----------------------------------------
    const driftCanvas = document.getElementById('driftCanvas');
    if (driftCanvas) {
        const driftCtx = driftCanvas.getContext('2d');
        let driftParticles = [];
        const resizeDriftCanvas = () => { driftCanvas.width = window.innerWidth; driftCanvas.height = window.innerHeight; };
        window.addEventListener('resize', resizeDriftCanvas);
        resizeDriftCanvas();
        
        class DriftParticle {
            constructor() {
                this.x = Math.random() * driftCanvas.width;
                this.y = driftCanvas.height + Math.random() * 500;
                this.vx = (Math.random() - 0.5) * 0.2;
                this.vy = (Math.random() * -0.5) - 0.2; 
                this.radius = Math.random() * 1.5 + 0.5;
                this.color = Math.random() > 0.5 ? 'rgba(255, 192, 203, 0.4)' : 'rgba(229, 192, 123, 0.2)';
            }
            update() {
                this.x += this.vx; this.y += this.vy;
                if(this.y < -10) {
                    this.y = driftCanvas.height + 10;
                    this.x = Math.random() * driftCanvas.width;
                }
            }
            draw() {
                driftCtx.beginPath(); driftCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                driftCtx.fillStyle = this.color; driftCtx.fill();
            }
        }
        for(let i=0; i<150; i++) driftParticles.push(new DriftParticle());
        function animateDrift() {
            driftCtx.clearRect(0, 0, driftCanvas.width, driftCanvas.height);
            driftParticles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateDrift);
        }
        animateDrift();
    }

    // -----------------------------------------
    // 6. Typographic Splitting & Initial States
    // -----------------------------------------
    let splitPreloader;
    if (typeof SplitType !== 'undefined' && typeof gsap !== 'undefined') {
        // Run all splits synchronously before any ScrollTrigger calculation
        splitPreloader = new SplitType('#preloaderName', { types: 'chars' });
        new SplitType('.split-title', { types: 'chars, words' });
        new SplitType('.split-text', { types: 'lines, chars, words' }); // Including chars for hover wave
        new SplitType('.memory-overlay p', { types: 'lines, chars, words' }); // Force split on target paragraphs

        // Set initial GSAP states programmatically to prevent CSS conflicts
        gsap.set(splitPreloader.chars, { opacity: 0, y: 50 });
        gsap.set('.split-title:not(.main-title) .char', { opacity: 0, y: 50, rotateX: -90 });
        gsap.set('.split-text:not(#subtitle, #loveNoteText, .special-message *) .word', { opacity: 0, y: 20 });

        // Cinematic Bloom initial states instantly preventing CSS fighting
        gsap.set('#specialMessageTitle .char', { opacity: 0, y: 15, filter: 'blur(12px)' });
        gsap.set('#specialMessage .message-body .line', { opacity: 0, y: 15, filter: 'blur(12px)' });
        gsap.set('#specialMessage .signature', { opacity: 0, y: 15, filter: 'blur(12px)' });
    }

    // -----------------------------------------
    // 7. Typography Hover Physics (Event Delegation)
    // -----------------------------------------
    // Wave Physics
    document.addEventListener('mousemove', (e) => {
        // Find if we are moving inside a subtitle, love note text, or memory overlay P
        const targetWaveContainer = e.target.closest('.subtitle, .memory-overlay p, #loveNoteText');
        if (targetWaveContainer) {
            const chars = targetWaveContainer.querySelectorAll('.char');
            chars.forEach(char => {
                const rect = char.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;
                
                const distX = e.clientX - charX;
                const distY = e.clientY - charY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                const maxDist = 80;
                if (distance < maxDist) {
                    const pull = ((maxDist - distance) / maxDist);
                    gsap.to(char, {
                        y: -8 * pull, // Subtler pull
                        color: '#FFC0CB',
                        textShadow: '0 0 10px rgba(255,192,203,0.4)', // Softer shadow
                        duration: 0.2,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                } else {
                    gsap.to(char, { y: 0, color: '', textShadow: 'none', duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
                }
            });
        }
    });

    // Reset Wave on leave via delegation
    document.addEventListener('mouseout', (e) => {
        const targetWaveContainer = e.target.closest('.subtitle, .memory-overlay p, #loveNoteText');
        if (targetWaveContainer && !targetWaveContainer.contains(e.relatedTarget)) {
            gsap.to(targetWaveContainer.querySelectorAll('.char'), {
                y: 0, color: '', textShadow: 'none', duration: 0.6, ease: 'elastic.out(1, 0.5)', stagger: 0.01, overwrite: 'auto'
            });
        }
    });

    // Static Illumination tracking for the Masterpiece Finale
    const specialMessageContainer = document.querySelector('#specialMessage .message-container');
    if (specialMessageContainer) {
        specialMessageContainer.addEventListener('mousemove', (e) => {
            const rect = specialMessageContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Pipe coordinates to CSS for Edge-less Spotlight
            specialMessageContainer.style.setProperty('--mouse-x', `${x}px`);
            specialMessageContainer.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // -----------------------------------------
    // 8. Preloader & GSAP Load Check
    // -----------------------------------------
    let progress = 0;
    const enterBtn = document.getElementById('enterBtn');

    const simulateLoading = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(simulateLoading);
            document.getElementById('preloaderCounter').textContent = '100%';
            enterBtn.classList.add('ready');
        } else {
            document.getElementById('preloaderCounter').textContent = progress + '%';
        }
    }, 40);

    enterBtn.addEventListener('click', () => {
        audioUnlocked = true;
        bgmAudio.play().then(() => {
            let vol = 0;
            const fadeInterval = setInterval(() => {
                if (isBgmMuted) return clearInterval(fadeInterval);
                if (vol < MAX_BGM_VOLUME) { vol += 0.01; bgmAudio.volume = Math.min(vol, MAX_BGM_VOLUME); } 
                else { clearInterval(fadeInterval); }
            }, 100);
        }).catch(e => console.warn("Auto-play blocked", e));
        
        clickSound.currentTime = 0; clickSound.play().catch(e=>{});

        const tl = gsap.timeline({
            onComplete: () => {
                document.querySelector('.preloader').style.display = 'none';
                lenis.start();
                morphNext();
                
                Promise.all(Array.from(document.images).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => { img.addEventListener('load', resolve); img.addEventListener('error', resolve); });
                })).then(() => {
                    initScrollAnimations();
                    if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
                });
            }
        });

        enterBtn.classList.remove('ready');
        tl.to(splitPreloader.chars, { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" })
          .to(['#preloaderCounter', '#preloaderName', '#enterBtn'], { opacity: 0, duration: 0.8, delay: 0.5 })
          .to('.preloader', { y: "-100%", duration: 1.2, ease: "expo.inOut" }, "-=0.2")
          .fromTo('.main-title', { opacity: 0 }, { opacity: 1, duration: 1.5 }, "-=0.5")
          .fromTo('.hero-arch', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }, "-=1")
          .fromTo('#subtitle .char', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.02, ease: "power3.out" }, "-=0.8");
    });

    // -----------------------------------------
    // 9. Scroll Interactions
    // -----------------------------------------
    function initScrollAnimations() {
        if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();

        document.querySelectorAll('.split-title:not(.main-title)').forEach(title => {
            gsap.to(title.querySelectorAll('.char'), {
                scrollTrigger: { trigger: title, start: "top 85%" },
                opacity: 1, y: 0, rotateX: 0, stagger: 0.05, duration: 1, ease: "back.out(1.7)"
            });
        });

        document.querySelectorAll('.split-text:not(#subtitle, #loveNoteText, .special-message *)').forEach(text => {
            gsap.to(text.querySelectorAll('.word'), {
                scrollTrigger: { trigger: text, start: "top 85%" },
                opacity: 1, y: 0, stagger: 0.02, duration: 0.8, ease: "power2.out"
            });
        });

        gsap.to('.display-heart', {
            scrollTrigger: { trigger: '.display-heart', start: "top 80%" },
            opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.3)",
            onComplete: () => gsap.to('.display-heart', { scale: 1.15, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" })
        });
        
        // Final Note - Golden Cascade Reveal (Bulletproof ScrollTrigger)
        const smContainer = document.getElementById('specialMessage');
        const smTitleChars = document.querySelectorAll('#specialMessageTitle .char');
        const smLines = document.querySelectorAll('#specialMessage .message-body .line');
        const smSignature = document.querySelector('#specialMessage .signature');

        if (smContainer && smTitleChars.length) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: smContainer,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.to(smContainer, { opacity: 1, duration: 1.5, ease: "power2.inOut" })
              .to(smTitleChars, { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.1, duration: 2.5, ease: "power4.out" }, "-=0.5")
              .to(smLines, { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.3, duration: 2.5, ease: "power4.out" }, "-=1.5")
              .to(smSignature, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 2.5, ease: "power4.out" }, "-=1.5");
        }
    }

    // -----------------------------------------
    // 10. Mouse Cursor & Glares
    // -----------------------------------------
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    let lastHoverTime = 0;
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    });

    document.querySelectorAll('.hover-trigger').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hovering');
            const now = Date.now();
            if (audioUnlocked && now - lastHoverTime > 150) { 
                hoverSound.currentTime = 0;
                hoverSound.play().catch(e=>{}); 
                lastHoverTime = now; 
            }
        });
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
    });

    document.querySelectorAll('.magical-artifact').forEach(artifact => {
        const glare = artifact.querySelector('.glare');
        artifact.addEventListener('mousemove', (e) => {
            const rect = artifact.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            if (glare) {
                glare.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`;
            }
        });
    });

    // -----------------------------------------
    // 11. Custom Canvas Surprise Loop
    // -----------------------------------------
    const canvas = document.getElementById('surpriseCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let surpriseParticles = [];
        let animationFrame;
        let surpriseRunning = false;
        window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;

        class SparkleParticle {
            constructor(x, y) {
                this.x = x; this.y = y;
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = (Math.random() - 0.5) * 4 - 2; 
                this.radius = Math.random() * 2 + 1;
                this.alpha = 1;
            }
            update() { this.x += this.vx; this.y += this.vy; this.alpha -= 0.005; }
            draw() {
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#E5C07B'; ctx.shadowBlur = 10; ctx.shadowColor = '#FFC0CB'; ctx.fill();
            }
        }

        const loveButton = document.getElementById('loveButton');
        const loveNote = document.getElementById('loveNote');
        let noteOpen = false;

        if (loveButton && loveNote) {
            // Ensure love note has SplitType if populated later (which it isn't here, but good practice if dynamc)
            loveButton.addEventListener('click', (e) => {
                if (audioUnlocked) { clickSound.currentTime = 0; clickSound.play().catch(e=>{}); }
                
                noteOpen = !noteOpen;
                if (noteOpen) {
                    loveButton.textContent = "Close surprise 💝";
                    loveNote.style.display = 'block';
                    // Subtly ensure SplitType handles love note before GSAP reveals it if it wasn't split
                    if(!loveNote.querySelector('.char')){
                        new SplitType('#loveNoteText', {types: 'chars, words'});
                    }
                    gsap.fromTo(loveNote, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", onComplete: () => {if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();} });
                    
                    if(!surpriseRunning) {
                        surpriseRunning = true; surpriseParticles = [];
                        for(let i=0; i<150; i++) surpriseParticles.push(new SparkleParticle(e.clientX, e.clientY));
                        function animateSurprise() {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            surpriseParticles.forEach(p => { p.update(); p.draw(); });
                            surpriseParticles = surpriseParticles.filter(p => p.alpha > 0);
                            if(surpriseParticles.length > 0) animationFrame = requestAnimationFrame(animateSurprise);
                            else { surpriseRunning = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }
                        }
                        animateSurprise();
                    }
                } else {
                    loveButton.textContent = "Click for a surprise 💝";
                    gsap.to(loveNote, { opacity: 0, y: 20, duration: 0.5, ease: "power2.in", onComplete: () => { loveNote.style.display = 'none'; if(typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();} });
                }
            });
        }
    }

    // -----------------------------------------
    // 12. Contextual Kiss Feature
    // -----------------------------------------
    const romanticMessages = {
        10: "Ten kisses... and it still feels like the first time.",
        20: "Twenty kisses... my heart races every single time.",
        30: "Thirty kisses... I could do this forever, Rony.",
        40: "Forty kisses... you are my dream come true.",
        50: "Fifty kisses... falling deeper in love with every second.",
        60: "Sixty kisses... your love is my greatest treasure.",
        70: "Seventy kisses... I am hopelessly obsessed with you.",
        80: "Eighty kisses... my soulmate, my best friend, my everything.",
        90: "Ninety kisses... life is so incredibly beautiful with you.",
        100: "A hundred kisses... and a million more to go. I love you infinitely."
    };

    const kissButton = document.getElementById('kissButton');
    const kissCountDisplay = document.getElementById('kissCount');
    const toastContainer = document.getElementById('toastContainer');
    let kissCount = 0;

    if (kissButton && kissCountDisplay && toastContainer) {
        kissButton.addEventListener('click', () => {
            kissCount++;
            kissCountDisplay.textContent = kissCount;
            gsap.fromTo(kissCountDisplay, { scale: 1.5 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
            if (audioUnlocked) { clickSound.currentTime = 0; clickSound.play().catch(e=>{}); }

            if (kissCount % 10 === 0) {
                const level = Math.min(Math.floor(kissCount / 10) * 10, 100);
                const msg = romanticMessages[level] || `So many kisses... I love you!`;
                
                const toast = document.createElement('div');
                toast.classList.add('toast-glass');
                toast.textContent = msg;
                toastContainer.appendChild(toast);
                gsap.fromTo(toast, { opacity: 0, x: 50, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" });
                setTimeout(() => { gsap.to(toast, { opacity: 0, x: 50, scale: 0.9, duration: 0.5, ease: "power2.in", onComplete: () => toast.remove() }); }, 5000);
            }
        });
    }
});