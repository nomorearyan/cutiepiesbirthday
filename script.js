// ========== SPARKLES ANIMATION ==========
function createSparkles() {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'sparkles';
    document.body.appendChild(sparklesContainer);
    // Lighter performance-friendly sparkle cadence
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparklesContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3500);
    }, 800);
}

// (Removed timezone, countdown, and distance to keep online-only theme)

// ========== TIMELINE FILTERING ==========
function filterTimeline(category) {
    const items = document.querySelectorAll('.timeline-item');
    const buttons = document.querySelectorAll('.milestone-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        items.forEach(item => item.style.display = 'block');
    } else {
        items.forEach(item => {
            if (item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// ========== INTERACTIVE FEATURES ==========
function openReasons() {
    openModal('featureModal');
    let content = '<h2>Why I Choose You Every Day 💖</h2><div class="reasons-list">';
    const reasons = generateFullReasons();
    reasons.forEach((reason, i) => {
        content += `<div class="reason-item"><span class="reason-number">${i + 1}</span><p class="reason-text">${reason}</p></div>`;
    });
    content += '</div>';
    document.getElementById('featureContent').innerHTML = content;
}

// ========== PHOTO WHEEL ==========
const wheelPhotos = [
    'images/wheel/photo1.jpg',
    'images/wheel/photo2.jpg',
    'images/wheel/photo3.jpg',
    'images/wheel/photo4.jpg',
    'images/wheel/photo5.jpg',
    'images/wheel/photo6.jpg',
    'images/wheel/photo7.jpg',
    'images/wheel/photo8.jpg'
];

function openPhotoWheel() {
    openModal('photoWheelModal');
    const wheel = document.getElementById('photoWheel');
    wheel.innerHTML = '';
    wheel.style.transform = 'rotate(0deg)';
    
    // Create circular photo wheel
    wheelPhotos.forEach((photo, index) => {
        const angle = (360 / wheelPhotos.length) * index;
        const photoElement = document.createElement('div');
        photoElement.className = 'wheel-photo';
        photoElement.style.transform = `rotate(${angle}deg) translateY(-150px) rotate(-${angle}deg)`;
        photoElement.innerHTML = `<img src="${photo}" alt="Photo ${index + 1}">`;
        wheel.appendChild(photoElement);
    });
    
    // Hide selected photo display and reset
    const display = document.getElementById('selectedPhotoDisplay');
    display.style.display = 'none';
}

function spinPhotoWheel() {
    const wheel = document.getElementById('photoWheel');
    const display = document.getElementById('selectedPhotoDisplay');
    
    // Hide previous result
    display.style.display = 'none';
    
    // Get current rotation
    const currentRotation = wheel.style.transform.match(/rotate\(([^)]+)deg\)/);
    const currentDeg = currentRotation ? parseFloat(currentRotation[1]) : 0;
    
    // Add random spins (4-6 full rotations + random position)
    const additionalSpins = (Math.floor(Math.random() * 3) + 4) * 360;
    const randomPosition = Math.floor(Math.random() * 360);
    const newRotation = currentDeg + additionalSpins + randomPosition;
    
    // Calculate which photo will be selected
    const normalizedRotation = newRotation % 360;
    const selectedIndex = Math.floor(normalizedRotation / (360 / wheelPhotos.length));
    const actualIndex = (wheelPhotos.length - selectedIndex) % wheelPhotos.length;
    
    // Spin the wheel
    wheel.style.transition = 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)';
    wheel.style.transform = `rotate(${newRotation}deg)`;
    
    // Show selected photo after spin
    setTimeout(() => {
        const selectedPhoto = document.getElementById('selectedPhoto');
        selectedPhoto.src = wheelPhotos[actualIndex];
        display.style.display = 'block';
        createHeartBurst();
    }, 3000);
}

function spinLoveWheel() {
    openModal('wheelModal');
    const messages = [
        "You're the best thing that ever happened to me 💕",
        "I'm so proud of you! 🌟",
        "You make me want to be better every day 💪",
        "Distance means so little when someone means so much 🌍",
        "I miss your laugh right now 😊",
        "Can't wait to hold you again 🤗",
        "You're my favorite notification 📱",
        "Thinking about you makes me smile 😄",
        "You're worth every mile between us ✈️",
        "I love you more than words can say 💖"
    ];
    
    window.spinWheel = function() {
        const messageEl = document.getElementById('wheelMessage');
        let spins = 0;
        const maxSpins = 20;
        
        const spinInterval = setInterval(() => {
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            messageEl.textContent = randomMsg;
            spins++;
            
            if (spins >= maxSpins) {
                clearInterval(spinInterval);
                createConfetti(window.innerWidth / 2, window.innerHeight / 2);
            }
        }, 100);
    };
}

function openLoveQuiz() {
    openModal('quizModal');
    
    const questions = [
        {
            question: "When did we have our first video call?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 0
        },
        {
            question: "What's my favorite thing about you?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct: 1
        }
        // Add more questions...
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    function showQuestion() {
        const q = questions[currentQuestion];
        document.getElementById('quizQuestion').innerHTML = 
            `<h3>Question ${currentQuestion + 1}/${questions.length}</h3><p>${q.question}</p>`;
        
        let optionsHTML = '';
        q.options.forEach((opt, i) => {
            optionsHTML += `<div class="quiz-option" onclick="checkAnswer(${i})">${opt}</div>`;
        });
        document.getElementById('quizOptions').innerHTML = optionsHTML;
        document.getElementById('quizScore').textContent = '';
    }
    
    window.checkAnswer = function(selected) {
        const q = questions[currentQuestion];
        if (selected === q.correct) {
            score++;
            createConfetti(window.innerWidth / 2, window.innerHeight / 2);
        }
        
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(showQuestion, 1000);
        } else {
            document.getElementById('quizQuestion').innerHTML = '<h2>Quiz Complete!</h2>';
            document.getElementById('quizOptions').innerHTML = '';
            document.getElementById('quizScore').textContent = 
                `You scored ${score}/${questions.length}! 💕`;
        }
    };
    
    showQuestion();
}

function openMoodboard() {
    openModal('featureModal');
    const foodPhotos = [];
    for (let i = 1; i <= 18; i++) {
        foodPhotos.push(`<img src="images/foodboard/food${i}.jpg" alt="Food ${i}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; box-shadow: 0 3px 10px rgba(0,0,0,0.2);">`);
    }
    
    document.getElementById('featureContent').innerHTML = `
        <h2>Our TG Foodboard 🍕</h2>
        <div class="moodboard-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0;">
            ${foodPhotos.join('')}
        </div>
    `;
}

// (Removed Next Trip Plans to keep digital-only focus)

function openPlaylist() {
    openModal('featureModal');
    document.getElementById('featureContent').innerHTML = `
        <h2>Our Shared Playlist 🎵</h2>
        <div style="padding: 2rem;">
            <p style="margin-bottom: 2rem; color: #8d5a73;">Songs that remind us of each other...</p>
            <div class="playlist">
                <div class="song-item" style="padding: 1rem; margin: 1rem 0; background: rgba(255,255,255,0.8); border-radius: 10px;">
                    🎵 Song Title 1 - Artist
                </div>
                <div class="song-item" style="padding: 1rem; margin: 1rem 0; background: rgba(255,255,255,0.8); border-radius: 10px;">
                    🎵 Song Title 2 - Artist
                </div>
                <div class="song-item" style="padding: 1rem; margin: 1rem 0; background: rgba(255,255,255,0.8); border-radius: 10px;">
                    🎵 Song Title 3 - Artist
                </div>
            </div>
            <p style="margin-top: 2rem; text-align: center; color: #a87d91;">
                Add Spotify/YouTube embed here
            </p>
        </div>
    `;
}

function openDreamHome() {
    openModal('featureModal');
    document.getElementById('featureContent').innerHTML = `
        <h2>Our Dream Home 🏡</h2>
        <div style="padding: 2rem;">
            <p style="margin-bottom: 2rem; color: #8d5a73;">The future we're building together...</p>
            <div class="dream-features" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;">
                <div style="padding: 1.5rem; background: rgba(255,255,255,0.8); border-radius: 15px;">
                    🛋️ Cozy living room with huge windows
                </div>
                <div style="padding: 1.5rem; background: rgba(255,255,255,0.8); border-radius: 15px;">
                    🌿 Balcony garden with plants
                </div>
                <div style="padding: 1.5rem; background: rgba(255,255,255,0.8); border-radius: 15px;">
                    📚 Library corner for reading
                </div>
                <div style="padding: 1.5rem; background: rgba(255,255,255,0.8); border-radius: 15px;">
                    🍳 Kitchen where we cook together
                </div>
            </div>
        </div>
    `;
}

// ========== OPEN WHEN LETTERS ==========
function openLetter(type) {
    openModal('letterModal');
    
    const letters = {
        'miss-me': {
            title: 'Open When You Miss Me 🥺',
            content: `My Love,

I know the distance is hard sometimes. When you miss me, close your eyes and remember that I'm missing you just as much. Think about all our video calls, all our laughs, all the times we've stayed up too late talking about everything and nothing.

The miles between us are temporary, but what we have is forever. I'm working every day to close this distance. Until then, know that you're always in my heart, in my thoughts, in every moment of my day.

I love you across every mile.

Forever yours, ❤️`
        },
        'sad': {
            title: 'Open When You\'re Sad 😢',
            content: `My Dearest,

Whatever is making you sad, I wish I could be there to hold you right now. But even though I'm miles away, please know that you're not alone. I'm here, always.

Remember: You are so strong. You are so loved. You are so important to me. This hard moment will pass, and I'll be right here waiting to celebrate with you when things get better.

You've got this, and you've got me.

All my love, ❤️`
        },
        'happy': {
            title: 'Open When You\'re Happy 😊',
            content: `My Sunshine,

I'm so glad you're happy! Your happiness is my happiness, even from miles away. I wish I could see your smile right now, the one that lights up your whole face.

Celebrate this moment! You deserve all the joy in the world. I'm so proud of you and everything you do.

Can't wait to celebrate with you in person soon!

Love always, ❤️`
        },
        'sleep': {
            title: 'Open When You Can\'t Sleep 😴',
            content: `My Love,

I know those sleepless nights when your mind won't quiet down. I wish I could be there to hold you until you fall asleep.

Close your eyes. Take deep breaths. Think about all our happy memories. Imagine me right there next to you, keeping you safe and warm.

Soon we won't have to imagine anymore. Sweet dreams, my love.

Always yours, ❤️`
        },
        'lonely': {
            title: 'Open When You Feel Lonely 💔',
            content: `My Everything,

Distance is so hard sometimes, isn't it? When you feel lonely, remember: you are never truly alone. I'm right here, thinking about you, loving you with everything I have.

Look at our photos. Read our old messages. Remember all the reasons we're doing this. We're building something beautiful, something worth every lonely moment.

I promise you, this distance is temporary. Our love is forever.

Missing you always, ❤️`
        },
        'proud': {
            title: 'I\'m So Proud of You! 🌟',
            content: `My Amazing Love,

I don't say it enough, but I am SO proud of you! Everything you do, everything you accomplish, every time you push through something difficult - I see it all, and my heart swells with pride.

You are incredible. You are capable of anything. You inspire me every single day to be better.

Keep shining, my star.

So proud, so in love, ❤️`
        },
        'birthday': {
            title: 'Happy Birthday My Love! 🎂',
            content: `Happy Birthday to the Love of My Life! 🎉

Another year of you being absolutely amazing! Even though we're apart today, my heart is right there with you, celebrating everything you are.

Thank you for another year of loving me, supporting me, and being my person. I can't wait to celebrate many more birthdays together - in person.

This is your day. You deserve the world and more.

Happy Birthday, my beautiful love! ❤️

Forever yours`
        },
        'random': {
            title: 'Just Because I Love You 💕',
            content: `Hey You,

No special reason for this letter. Just wanted to remind you that I love you. Today, tomorrow, always.

You're the best thing in my life, and I'm grateful for you every single day.

That's all. Just love.

Yours forever, ❤️`
        }
    };
    
    const letter = letters[type];
    document.getElementById('letterContent').innerHTML = `
        <h2>${letter.title}</h2>
        <div style="white-space: pre-wrap; margin-top: 2rem;">
            ${letter.content}
        </div>
    `;
}

// ========== PROMISE WALL ==========
function addPromise() {
    const promise = prompt('Add your promise:');
    if (promise) {
        const promises = JSON.parse(localStorage.getItem('promises') || '[]');
        promises.push(promise);
        localStorage.setItem('promises', JSON.stringify(promises));
        renderPromises();
    }
}

function renderPromises() {
    const container = document.querySelector('.promise-container');
    if (!container) return;
    // Remove previously rendered dynamic promises
    container.querySelectorAll('.promise-card.dynamic').forEach(el => el.remove());
    const stored = JSON.parse(localStorage.getItem('promises') || '[]');
    stored.forEach(p => {
        const card = document.createElement('div');
        card.className = 'promise-card dynamic';
        card.innerHTML = `<span class="promise-icon">💝</span><p>"${p}"</p>`;
        container.appendChild(card);
    });
}

// ========== WHAT I MISS TODAY ==========
function generateMissMessage() {
    const missings = [
        "your voice on late-night calls",
        "the way you say good morning",
        "laughing together over chat",
        "our BGMI duo wins",
        "your random midnight texts",
        "sending you memes and seeing you react",
        "sharing songs and listening together",
        "your sleepy voice on morning calls",
        "the way you type my name",
        "our inside jokes that no one else gets"
    ];
    
    const random = missings[Math.floor(Math.random() * missings.length)];
    document.getElementById('missToday').innerHTML = `
        <p>Right now, I really miss ${random} 💭</p>
    `;
}

// ========== REASONS GENERATOR ==========
function generateFullReasons() {
    return [
        "you're my baby",
        "you make me feel home",
        "you're v sweet to me",
        "the way you sweetly call me your baby",
        "you're the best thing that ever happened to me",
        "your toes",
        "you never judge my overthinking",
        "your face",
        "you celebrate my small wins",
        "you make silence feel safe",
        "your laugh through the mic",
        "The comfort of our shared playlist",
        "the way you say 'haina' between your story",
        "The way you type ‘hiiiiiiiii’ differently when excited",
        "you read my mood from one text",
        "youtreat my feelings seriously",
        "you never make me feel needy",
        "your emotional maturity",
        "you make ordinary days special",
        "you sleep on calls w me ",
        "You send random reassurance",
        "you listen even when I'm not clear",
        "you trust me completely",
        "you are consistent",
        "you dont laugh at my bad jokes (honesty)",
        "you dont remember important dates(bcs you're cute n you wont cheat either)",
        "you accept my flaws",
        "you inspire me to grow",
        "You make effort without being asked",
        "You send the perfect reaction emojis",
        "You never weaponize distance",
        "You make me feel chosen",
        "You let me vent safely",
        "You ask if I’ve eaten",
        "You see beyond my words",
        "You appreciate my effort",
        "You encourage rest",
        "You hype me up before challenges",
        "You respect my boundaries",
        "You share vulnerable thoughts",
        "You make future feel real",
        "You don’t disappear when stressed",
        "You notice changes in my tone",
        "You send voice notes I replay",
        "You help me regulate emotions",
        "You make me feel emotionally safe",
        "You’re intentional with energy",
        "You don’t take me for granted",
        "You make effort feel mutual",
        "You care about my sleep schedule",
        "You send comforting silence",
        "You make digital feel intimate",
        "You ask how I really am",
        "You let me be quiet",
        "You handle conflict gently",
        "You grow with me",
        "You appreciate slow progress",
        "You remind me I’m enough",
        "You let me feel deeply",
        "You trust my decisions",
        "You protect my mental space",
        "You notice my patterns",
        "You adapt without resentment",
        "You remind me of balance",
        "You make emotional closeness effortless",
        "You connect through time zones gracefully",
        "You make distance poetic",
        "You are patient with my spirals",
        "You don’t rush healing",
        "You let me process",
        "You bring emotional clarity",
        "You give grounding responses",
        "You feel like home online",
        "You value emotional precision",
        "You nurture stability",
        "You honor promises",
        "You reassure without being asked",
        "You don’t perform affection—you live it",
        "You make me feel wanted",
        "You help me breathe easier",
        "You understand my attachment style",
        "You let me rewrite old fears",
        "You bring calm to anxiety",
        "You expand my emotional vocabulary",
        "You don’t minimize pain",
        "You radiate quiet loyalty",
        "You make constancy romantic",
        "You show up on hard days",
        "You feel emotionally fluent",
        "You respond instead of react",
        "You help me be kinder to myself",
        "You model emotional health",
        "You anchor me when scattered",
        "You feel like safe permanence",
        "You are soft where I am guarded",
        "You help me trust timing",
        "You make commitment feel organic",
        "You choose depth over performance",
        "You and I are a quiet miracle",
        "You are my favorite emotional space"
    ];
}

function loadReasons() {
    const reasons = generateFullReasons();
    
    const grid = document.getElementById('reasonsGrid');
    grid.innerHTML = '';
    
    reasons.forEach((reason, i) => {
        const item = document.createElement('div');
        item.className = 'reason-item';
        item.innerHTML = `
            <div class="reason-number">${i + 1}</div>
            <div class="reason-text">${reason}</div>
        `;
        grid.appendChild(item);
    });
}

// ========== MEMORY DETAIL ==========
function openMemoryDetail(type) {
    openModal('featureModal');
    const content = {
        'video-moments': {
            title: 'Video Call Moments 🎥',
            text: 'All those hours on video calls, seeing your face, hearing your laugh...',
            image: 'images/memories/video-moments.jpg'
        },
        'voice-notes': {
            title: 'Voice Notes 🎤',
            text: 'Your good morning messages, your sleepy voice, the way you say "I love you"... These voice notes mean everything to me.',
            audio: 'images/memories/voice-note.mp3.opus'
        },
        'chat-screenshots': {
            title: 'Our Chats 💬',
            text: 'Remember these conversations? The ones that made us laugh until we cried?',
            image: 'images/memories/chat-screenshots.jpg'
        },
        'late-night': {
            title: 'Late Night Talks 🌙',
            text: 'Those 2 AM hearts-open conversations that made everything feel lighter and safe.',
            image: 'images/memories/late-night.jpg'
        }
    };
    const data = content[type] || { title: 'Memory', text: 'Add your memories here!' };
    
    let mediaHTML = '';
    if (data.image) {
        mediaHTML = `<img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 500px; object-fit: contain; border-radius: 15px; margin: 2rem 0; box-shadow: 0 8px 25px rgba(255, 141, 199, 0.3);">`;
    } else if (data.audio) {
        mediaHTML = `<audio controls style="width: 100%; margin: 2rem 0; border-radius: 25px;">
            <source src="${data.audio}" type="audio/ogg; codecs=opus">
            Your browser does not support the audio element.
        </audio>`;
    }
    
    document.getElementById('featureContent').innerHTML = `
        <h2>${data.title}</h2>
        <p style="margin: 2rem 0; font-size: 1.2rem; color: #8d5a73;">${data.text}</p>
        ${mediaHTML}
    `;
}

// ========== MODAL FUNCTIONS ==========
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// ========== SURPRISE POPUP ==========
function triggerSurprise() {
    const messages = [
        "I'm proud of you! 💪",
        "You're the best thing in my life 💕",
        "I love you more every day ❤️",
        "You make me so happy 😊",
        "Can't wait for our next call 📱",
        "You're amazing, never forget that! 🌟"
    ];
    
    const random = messages[Math.floor(Math.random() * messages.length)];
    const popup = document.getElementById('surprisePopup');
    document.getElementById('surpriseMessage').textContent = random;
    popup.style.display = 'block';
    
    createConfetti(window.innerWidth - 60, window.innerHeight - 60);
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 4000);
}

function closeSurprise() {
    document.getElementById('surprisePopup').style.display = 'none';
}

// ========== GALLERY & LIGHTBOX ==========
let currentImageIndex = 0;
const images = [
    'images/gallery/photo1.jpg',
    'images/gallery/photo2.jpg',
    'images/gallery/photo3.jpg',
    'images/gallery/photo4.jpg',
    'images/gallery/photo5.jpg',
    'images/gallery/photo6.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[index];
    lightbox.style.display = 'flex';
    document.getElementById('lightbox-caption').textContent = `Photo ${index + 1} of ${images.length}`;
    
    // Create heart burst effect
    createHeartBurst();
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentImageIndex];
    document.getElementById('lightbox-caption').textContent = `Photo ${currentImageIndex + 1} of ${images.length}`;
}

// ========== HEART BURST ==========
function createHeartBurst() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${20 + Math.random() * 30}px;
            pointer-events: none;
            z-index: 10003;
            transition: all 1.5s ease-out;
        `;
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / 40;
        const distance = 200 + Math.random() * 200;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        setTimeout(() => {
            heart.style.left = endX + 'px';
            heart.style.top = endY + 'px';
            heart.style.opacity = '0';
            heart.style.transform = 'scale(1.5)';
        }, 50);
        
        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
}

// ========== CONFETTI ==========
function createConfetti(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${['#ff6ba8', '#ff8dc7', '#ffb3de', '#ffd6eb'][Math.floor(Math.random() * 4)]};
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10002;
        `;
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 5 + Math.random() * 5;
        let posX = x;
        let posY = y;
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;
        
        const animation = setInterval(() => {
            vy += 0.5; // gravity
            posX += vx;
            posY += vy;
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            
            if (posY > window.innerHeight) {
                clearInterval(animation);
                confetti.remove();
            }
        }, 20);
    }
}

// ========== FLOATING HEARTS ==========
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        bottom: -50px;
        font-size: ${20 + Math.random() * 30}px;
        pointer-events: none;
        z-index: 9998;
        animation: float-up ${5 + Math.random() * 3}s linear;
    `;
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
}

// Add CSS for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% { bottom: -50px; opacity: 1; transform: translateX(0); }
        100% { bottom: 100vh; opacity: 0; transform: translateX(${Math.random() * 200 - 100}px); }
    }
`;
document.head.appendChild(style);

// ========== SMOOTH SCROLLING ==========
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ========== SCROLL ANIMATIONS ==========
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

// ========== RELATIONSHIP COUNTER ==========
function updateRelationshipCounter() {
    const startDate = new Date('2025-03-27T00:00:00');
    const now = new Date();
    
    const diff = now - startDate;
    
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(totalDays / 30);
    const days = totalDays % 30;
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    
    if (monthsEl) monthsEl.textContent = months;
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    createSparkles();
    setInterval(createFloatingHeart, 3500);
    updateRelationshipCounter();
    setInterval(updateRelationshipCounter, 60000); // Update every minute
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
    });
    renderPromises();
});

// ========== TIMELINE MEMORY POPUP ==========
function openMemory(type) {
    const memoryImages = {
        'first-call': 'images/timeline/memories/first-call-memory.jpg',
        'knew-i-loved': 'images/timeline/memories/knew-i-loved-memory.jpg',
        'video-call': 'images/timeline/memories/video-call-memory.jpg'
    };
    
    const modal = document.getElementById('memoryModal');
    const img = document.getElementById('memoryImage');
    
    if (memoryImages[type]) {
        img.src = memoryImages[type];
        modal.style.display = 'flex';
        createHeartBurst();
    }
}

// ========== FUN FACT VIDEO ==========
function openFunFact() {
    const modal = document.getElementById('funFactModal');
    const video = document.getElementById('funFactVideo');
    modal.style.display = 'flex';
    video.play();
    createHeartBurst();
}

// Make functions available globally
window.scrollToSection = scrollToSection;
window.openMemory = openMemory;
window.filterTimeline = filterTimeline;
window.openMemoryDetail = openMemoryDetail;
window.openFunFact = openFunFact;
window.openPhotoWheel = openPhotoWheel;
window.spinPhotoWheel = spinPhotoWheel;
window.openReasons = openReasons;
window.openSurprise = openSurprise;
window.spinLoveWheel = spinLoveWheel;
window.openLoveQuiz = openLoveQuiz;
window.openMoodboard = openMoodboard;
// Removed window.openFuturePlans (feature deprecated)
window.renderPromises = renderPromises;
window.openPlaylist = openPlaylist;
window.openDreamHome = openDreamHome;
window.openLetter = openLetter;
window.addPromise = addPromise;
window.generateMissMessage = generateMissMessage;
window.loadReasons = loadReasons;
window.openModal = openModal;
window.closeModal = closeModal;
window.triggerSurprise = triggerSurprise;
window.closeSurprise = closeSurprise;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeImage = changeImage;
