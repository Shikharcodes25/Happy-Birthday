/**
 * HAPPY 17TH BIRTHDAY GUDIYA! 🥰💗
 * Clean, emotional, interactive script:
 * - Web Audio API Music Box (Sound praised by user)
 * - Enhanced Cake Candle Blowing with Confetti
 * - Memory Photograph Upload & LocalStorage Persistence
 * - Interactive Amazon Gift Card Scratch Off
 * - Confetti Salvos & Hug Counter
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. DYNAMIC BACKGROUND STARS
  // ==========================================
  const starsContainer = document.getElementById('starsContainer');

  const starIcons = ['✨', '⭐', '🌟', '💖'];
  for (let i = 0; i < 35; i++) {
    const star = document.createElement('div');
    star.className = 'twinkle-star';
    star.textContent = starIcons[Math.floor(Math.random() * starIcons.length)];
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.fontSize = `${10 + Math.random() * 14}px`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    if (starsContainer) starsContainer.appendChild(star);
  }

  // ==========================================
  // 2. WEB AUDIO SYNTHESIZER (MUSIC BOX & SFX)
  // Clean chime tones, zero external mp3 files
  // ==========================================
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicTimeout = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playChimeNote(freq, duration = 0.5, type = 'sine', gainVal = 0.2) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio not supported yet', e);
    }
  }

  function playPopSound() {
    initAudio();
    playChimeNote(523.25 + Math.random() * 200, 0.25, 'triangle', 0.25);
  }

  function playBlowSound() {
    initAudio();
    playChimeNote(300, 0.4, 'sine', 0.15);
    setTimeout(() => playChimeNote(400, 0.4, 'sine', 0.12), 100);
    setTimeout(() => playChimeNote(600, 0.6, 'triangle', 0.2), 250);
  }

  const melodyNotes = [
    { f: 261.63, d: 0.35 },
    { f: 261.63, d: 0.35 },
    { f: 293.66, d: 0.7 },
    { f: 261.63, d: 0.7 },
    { f: 349.23, d: 0.7 },
    { f: 329.63, d: 1.2 },

    { f: 261.63, d: 0.35 },
    { f: 261.63, d: 0.35 },
    { f: 293.66, d: 0.7 },
    { f: 261.63, d: 0.7 },
    { f: 392.00, d: 0.7 },
    { f: 349.23, d: 1.2 },

    { f: 261.63, d: 0.35 },
    { f: 261.63, d: 0.35 },
    { f: 523.25, d: 0.7 },
    { f: 440.00, d: 0.7 },
    { f: 349.23, d: 0.7 },
    { f: 329.63, d: 0.7 },
    { f: 293.66, d: 1.0 },

    { f: 466.16, d: 0.35 },
    { f: 466.16, d: 0.35 },
    { f: 440.00, d: 0.7 },
    { f: 349.23, d: 0.7 },
    { f: 392.00, d: 0.7 },
    { f: 349.23, d: 1.5 }
  ];

  let currentNoteIdx = 0;

  function playNextMelodyNote() {
    if (!isPlayingMusic) return;

    const note = melodyNotes[currentNoteIdx];
    playChimeNote(note.f, note.d * 1.2, 'sine', 0.18);
    playChimeNote(note.f * 2, note.d * 0.8, 'triangle', 0.06);

    currentNoteIdx = (currentNoteIdx + 1) % melodyNotes.length;
    const interval = (note.d * 650);
    const delay = (currentNoteIdx === 0) ? 2000 : interval;
    musicTimeout = setTimeout(playNextMelodyNote, delay);
  }

  function startMusic() {
    initAudio();
    if (isPlayingMusic) return;
    isPlayingMusic = true;
    currentNoteIdx = 0;
    playNextMelodyNote();
    updateMusicUI(true);
  }

  function stopMusic() {
    isPlayingMusic = false;
    clearTimeout(musicTimeout);
    updateMusicUI(false);
  }

  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicText = document.getElementById('musicText');

  function updateMusicUI(active) {
    if (musicToggleBtn) {
      if (active) {
        musicToggleBtn.classList.add('playing');
        if (musicText) musicText.textContent = 'Pause Melody';
      } else {
        musicToggleBtn.classList.remove('playing');
        if (musicText) musicText.textContent = 'Play Melody';
      }
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', () => {
      if (isPlayingMusic) {
        stopMusic();
      } else {
        startMusic();
      }
    });
  }

  // ==========================================
  // 3. CONFETTI ENGINE
  // ==========================================
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let confettiParticles = [];
  let isConfettiRunning = false;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const confettiColors = ['#FF6B8B', '#FFAAA6', '#FFD166', '#A2D2FF', '#CDB4DB', '#FFFFFF', '#D81159'];

  class Particle {
    constructor(x, y, isCannon = false) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 9 + 5;
      this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      
      const angle = isCannon ? (Math.random() * Math.PI * 2) : (Math.random() * Math.PI - Math.PI / 2);
      const speed = isCannon ? (Math.random() * 14 + 6) : (Math.random() * 8 + 2);
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - (isCannon ? 4 : 0);
      
      this.gravity = 0.28;
      this.drag = 0.96;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 12;
      this.opacity = 1;
      this.shape = Math.random() > 0.4 ? 'rect' : 'circle';
    }

    update() {
      this.vx *= this.drag;
      this.vy = this.vy * this.drag + this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.rotationSpeed;
      this.opacity -= 0.007;
    }

    draw(context) {
      context.save();
      context.translate(this.x, this.y);
      context.rotate((this.rotation * Math.PI) / 180);
      context.globalAlpha = Math.max(0, this.opacity);
      context.fillStyle = this.color;

      if (this.shape === 'rect') {
        context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
      } else {
        context.beginPath();
        context.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    }
  }

  function launchConfetti(originX, originY, count = 120) {
    if (!ctx) return;
    const x = originX !== undefined ? originX : window.innerWidth / 2;
    const y = originY !== undefined ? originY : window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      confettiParticles.push(new Particle(x, y, true));
    }

    if (!isConfettiRunning) {
      isConfettiRunning = true;
      requestAnimationFrame(renderConfetti);
    }
  }

  function renderConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.update();
      p.draw(ctx);

      if (p.opacity <= 0 || p.y > canvas.height + 50) {
        confettiParticles.splice(i, 1);
      }
    }

    if (confettiParticles.length > 0) {
      requestAnimationFrame(renderConfetti);
    } else {
      isConfettiRunning = false;
    }
  }

  function celebratoryConfettiSalvo() {
    launchConfetti(window.innerWidth * 0.3, window.innerHeight * 0.4, 90);
    setTimeout(() => launchConfetti(window.innerWidth * 0.7, window.innerHeight * 0.4, 90), 200);
    setTimeout(() => launchConfetti(window.innerWidth * 0.5, window.innerHeight * 0.3, 140), 450);
  }

  // ==========================================
  // 4. UNBOXING SURPRISE TRANSITION
  // ==========================================
  const introScreen = document.getElementById('introScreen');
  const giftBoxBtn = document.getElementById('giftBoxBtn');
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');
  const giftBox = document.querySelector('.gift-box');

  function openGiftSurprise() {
    initAudio();
    if (giftBox) giftBox.classList.add('opened');
    celebratoryConfettiSalvo();
    playChimeNote(523.25, 0.4, 'sine', 0.25);
    setTimeout(() => playChimeNote(659.25, 0.5, 'triangle', 0.25), 150);
    setTimeout(() => playChimeNote(783.99, 0.7, 'triangle', 0.3), 300);

    setTimeout(() => {
      if (introScreen) introScreen.classList.add('hidden');
      startMusic();
    }, 600);
  }

  if (giftBoxBtn) giftBoxBtn.addEventListener('click', openGiftSurprise);
  if (openSurpriseBtn) openSurpriseBtn.addEventListener('click', openGiftSurprise);

  if (giftBoxBtn) {
    giftBoxBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGiftSurprise();
      }
    });
  }

  // ==========================================
  // 5. CAKE & CANDLE BLOW INTERACTION
  // ==========================================
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const candlesWrapper = document.getElementById('candlesWrapper');
  const wishRevealBox = document.getElementById('wishRevealBox');
  let candlesBlown = false;

  if (blowCandleBtn) {
    blowCandleBtn.addEventListener('click', () => {
      if (!candlesBlown) {
        candlesBlown = true;
        playBlowSound();
        if (candlesWrapper) candlesWrapper.classList.add('candles-extinguished');

        const rect = blowCandleBtn.getBoundingClientRect();
        launchConfetti(rect.left + rect.width / 2, rect.top, 160);

        if (wishRevealBox) wishRevealBox.classList.add('show');
        blowCandleBtn.innerHTML = '<span>✨ Wish Sent to the Universe! 🌸</span>';
        blowCandleBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
      } else {
        candlesBlown = false;
        playPopSound();
        if (candlesWrapper) candlesWrapper.classList.remove('candles-extinguished');
        if (wishRevealBox) wishRevealBox.classList.remove('show');
        blowCandleBtn.innerHTML = '<span class="btn-icon">💨</span><span class="btn-text">Make a Wish & Blow Candles!</span>';
        blowCandleBtn.style.background = '';
      }
    });
  }

  // ==========================================
  // 6. PHOTOGRAPH UPLOAD & MULTI-FORMAT SUPPORT
  // ==========================================
  const photoUploadInput = document.getElementById('photoUploadInput');
  const sisterPhoto = document.getElementById('sisterPhoto');
  const photoPlaceholder = document.getElementById('photoPlaceholder');

  // 1. If embedded photo is available from photoData.js, use it directly!
  if (typeof EMBEDDED_PHOTO !== 'undefined' && EMBEDDED_PHOTO) {
    sisterPhoto.src = EMBEDDED_PHOTO;
    sisterPhoto.style.display = 'block';
    if (photoPlaceholder) photoPlaceholder.style.display = 'none';
  } else if (savedPhoto && sisterPhoto) {
    // 2. Otherwise if user previously uploaded via browser
    sisterPhoto.src = savedPhoto;
    sisterPhoto.style.display = 'block';
    if (photoPlaceholder) photoPlaceholder.style.display = 'none';
  } else if (sisterPhoto) {
    // 3. Otherwise try loading from candidate files (including photo.jpg and photo.jpg.jpg)
    const photoCandidates = [
      'photo.jpg', 'photo.jpg.jpg', 'photo.jpeg', 'photo.png', 'photo.webp',
      'photo.JPG', 'photo.JPEG', 'photo.PNG', 'photo.WEBP'
    ];
    let candidateIdx = 0;

    function tryNextCandidate() {
      if (candidateIdx < photoCandidates.length) {
        sisterPhoto.src = photoCandidates[candidateIdx++];
      } else {
        sisterPhoto.style.display = 'none';
        if (photoPlaceholder) photoPlaceholder.style.display = 'flex';
      }
    }

    sisterPhoto.addEventListener('error', tryNextCandidate);
    sisterPhoto.addEventListener('load', () => {
      sisterPhoto.style.display = 'block';
      if (photoPlaceholder) photoPlaceholder.style.display = 'none';
    });

    tryNextCandidate();
  }

  if (photoUploadInput) {
    photoUploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgData = event.target.result;
          if (sisterPhoto) {
            sisterPhoto.src = imgData;
            sisterPhoto.style.display = 'block';
          }
          if (photoPlaceholder) {
            photoPlaceholder.style.display = 'none';
          }
          try {
            localStorage.setItem('gudiya_memory_photo', imgData);
          } catch (err) {
            console.warn('Storage limit for image', err);
          }
          playPopSound();
          celebratoryConfettiSalvo();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==========================================
  // 7. WISH CARDS INTERACTION
  // ==========================================
  const wishCards = document.querySelectorAll('.wish-card');
  wishCards.forEach((card) => {
    card.addEventListener('click', () => {
      playPopSound();
      const rect = card.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);
    });
  });

  // ==========================================
  // 8. AMAZON GIFT VOUCHER SCRATCH CARD
  // ==========================================
  const scratchCanvas = document.getElementById('scratchCanvas');
  const scratchContainer = document.getElementById('scratchContainer');
  const quickRevealBtn = document.getElementById('quickRevealBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const voucherCodeText = document.getElementById('voucherCodeText');
  const scratchStatus = document.getElementById('scratchStatus');
  let isScratching = false;
  let isCardRevealed = false;

  if (scratchCanvas && scratchContainer) {
    const sCtx = scratchCanvas.getContext('2d');

    function initScratchCover() {
      const rect = scratchContainer.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      scratchCanvas.width = rect.width * dpr;
      scratchCanvas.height = rect.height * dpr;
      sCtx.scale(dpr, dpr);

      // Gold shimmer foil gradient
      const grad = sCtx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, '#FFE082');
      grad.addColorStop(0.3, '#FFD54F');
      grad.addColorStop(0.5, '#FFF8E1');
      grad.addColorStop(0.7, '#FFCA28');
      grad.addColorStop(1, '#FFB300');

      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, rect.width, rect.height);

      // Add sparkle dust / texture
      sCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const r = Math.random() * 2.5 + 1;
        sCtx.beginPath();
        sCtx.arc(x, y, r, 0, Math.PI * 2);
        sCtx.fill();
      }

      // Draw instruction text on canvas
      sCtx.fillStyle = '#5D4037';
      sCtx.font = 'bold 18px "Fredoka", sans-serif';
      sCtx.textAlign = 'center';
      sCtx.textBaseline = 'middle';
      sCtx.fillText('🎁 SCRATCH HERE TO UNWRAP! 🎁', rect.width / 2, rect.height / 2 - 12);

      sCtx.fillStyle = '#795548';
      sCtx.font = '13px "Nunito", sans-serif';
      sCtx.fillText('Rub with your finger or mouse ✨', rect.width / 2, rect.height / 2 + 16);
    }

    setTimeout(initScratchCover, 250);
    window.addEventListener('resize', () => {
      if (!isCardRevealed) {
        initScratchCover();
      }
    });

    function scratch(x, y) {
      if (isCardRevealed) return;
      sCtx.globalCompositeOperation = 'destination-out';
      sCtx.beginPath();
      sCtx.arc(x, y, 26, 0, Math.PI * 2);
      sCtx.fill();

      checkScratchPercentage();
    }

    let checkThrottle = 0;
    function checkScratchPercentage() {
      checkThrottle++;
      if (checkThrottle % 12 !== 0) return;

      const rect = scratchContainer.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.floor(rect.width * dpr);
      const h = Math.floor(rect.height * dpr);

      try {
        const imgData = sCtx.getImageData(0, 0, w, h);
        const data = imgData.data;
        let transparentPixels = 0;
        const step = 32;
        let totalSampled = 0;

        for (let i = 3; i < data.length; i += 4 * step) {
          totalSampled++;
          if (data[i] === 0) {
            transparentPixels++;
          }
        }

        const percent = (transparentPixels / totalSampled) * 100;
        if (percent > 35) {
          revealScratchCard();
        }
      } catch (e) {
        console.warn('Scratch check skipped', e);
      }
    }

    function revealScratchCard() {
      if (isCardRevealed) return;
      isCardRevealed = true;
      scratchCanvas.classList.add('fade-out');
      playChimeNote(659.25, 0.4, 'triangle', 0.25);
      setTimeout(() => playChimeNote(880, 0.6, 'sine', 0.25), 180);

      const rect = scratchContainer.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);

      if (scratchStatus) {
        scratchStatus.textContent = '🎉 Yay! Voucher Unwrapped! Enjoy, Gudiya! 🛍️💖';
        scratchStatus.style.color = '#D81159';
      }
    }

    function getPointerPos(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    }

    scratchCanvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      const pos = getPointerPos(e);
      scratch(pos.x, pos.y);
    });

    window.addEventListener('mouseup', () => {
      isScratching = false;
    });

    scratchCanvas.addEventListener('mousemove', (e) => {
      if (!isScratching) return;
      const pos = getPointerPos(e);
      scratch(pos.x, pos.y);
    });

    scratchCanvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      const pos = getPointerPos(e);
      scratch(pos.x, pos.y);
      if (e.cancelable) e.preventDefault();
    }, { passive: false });

    scratchCanvas.addEventListener('touchmove', (e) => {
      if (!isScratching) return;
      const pos = getPointerPos(e);
      scratch(pos.x, pos.y);
      if (e.cancelable) e.preventDefault();
    }, { passive: false });

    scratchCanvas.addEventListener('touchend', () => {
      isScratching = false;
      checkScratchPercentage();
    });

    if (quickRevealBtn) {
      quickRevealBtn.addEventListener('click', () => {
        revealScratchCard();
      });
    }
  }

  // Copy Voucher Code to Clipboard
  if (copyCodeBtn && voucherCodeText) {
    copyCodeBtn.addEventListener('click', () => {
      const code = voucherCodeText.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(handleCopied).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          handleCopied();
        } catch (err) {
          alert('Voucher Code: ' + code);
        }
        document.body.removeChild(textarea);
      }

      function handleCopied() {
        playPopSound();
        copyCodeBtn.classList.add('copied');
        copyCodeBtn.textContent = 'Copied! ✅';
        setTimeout(() => {
          copyCodeBtn.classList.remove('copied');
          copyCodeBtn.textContent = '📋 Copy Code';
        }, 2200);
      }
    });
  }

  // ==========================================
  // 9. HUG METER & BLESSING COUNTER
  // ==========================================
  const hugCounter = document.getElementById('hugCounter');
  const sendHugBtn = document.getElementById('sendHugBtn');
  const hugPopups = document.getElementById('hugPopups');
  let hugsCount = 17;

  const hugEmojis = ['🌸', '💮', '💖', '✨', '🤍', '🪷', '💐', '🥰'];

  function createFloatingHug(x, y) {
    if (!hugPopups) return;
    const emoji = document.createElement('div');
    emoji.className = 'floating-hug-emoji';
    emoji.textContent = hugEmojis[Math.floor(Math.random() * hugEmojis.length)];
    emoji.style.left = `${x || Math.random() * 80 + 10}%`;
    emoji.style.top = `${y || Math.random() * 30 + 50}%`;
    hugPopups.appendChild(emoji);

    setTimeout(() => emoji.remove(), 1800);
  }

  if (sendHugBtn) {
    sendHugBtn.addEventListener('click', () => {
      hugsCount++;
      if (hugCounter) {
        hugCounter.textContent = hugsCount;
        hugCounter.classList.add('bounce');
        setTimeout(() => hugCounter.classList.remove('bounce'), 200);
      }
      playPopSound();

      for (let i = 0; i < 4; i++) {
        setTimeout(() => createFloatingHug(), i * 80);
      }
    });
  }

  // ==========================================
  // 10. FOOTER ACTIONS
  // ==========================================
  const retriggerConfettiBtn = document.getElementById('retriggerConfettiBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (retriggerConfettiBtn) {
    retriggerConfettiBtn.addEventListener('click', () => {
      celebratoryConfettiSalvo();
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
