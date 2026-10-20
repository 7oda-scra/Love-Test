// Love Website Configuration
// Personalized for Rana (Rony/MyR) from Mahmoud

const CONFIG = {
    // Partner's name & Pet name
    partnerName: "Rana",
    nickname: "Rony",
    petName: "MyR",
    
    // Your name
    yourName: "Mahmoud",
    
    // Relationship start date (for the live "Time Loving You" clock)
    // Starting from January 23, 2026 (23/1/2026) (~9 months)
    startDate: "2026-01-23T00:00:00",
    
    // Music Information
    music: {
        title: "Our Eternal Melody",
        artist: "Mahmoud & Rana 💕",
        src: "assets/audio/bgm.mp3"
    },
    
    // Custom messages
    messages: {
        subtitle: "You light up my world in ways words can't express ✨",
        loveNote: "Rony, you are the sunshine in my darkest days and the stars in my night sky. Every moment with you feels like magic, and I fall in love with you more each day. You're not just my partner, you're my best friend, my soulmate, and my everything. I love you beyond words! 💖",
        specialMessage: "You came into my life like a beautiful surprise, and now I can't imagine my world without you. Your smile brightens my darkest days, your laugh is my favorite melody, and your love is the greatest gift I've ever received.",
        specialMessage2: "Thank you for being you, for loving me, and for making every day feel like a celebration. I promise to love you, cherish you, and make you smile every single day of our lives together.",
        signature: "With all my love, Forever yours, Mahmoud 💕"
    },
    
    // Memory descriptions (backward compatibility)
    memories: {
        lateNight: "Those endless conversations that made us forget about time",
        firstMeeting: "I know the day we meet will be magical and unforgettable",
        care: "Your caring nature, sweet voice, and adorable cuteness"
    },
    
    // Character / Avatar descriptions
    characters: {
        partner: "My beautiful angel",
        you: "Forever yours"
    },
    
    // Interactive Relationship Timeline
    timeline: [
        {
            date: "The First Hello",
            tag: "Chapter I",
            title: "When Two Worlds Aligned",
            description: "A simple hello that unknowingly set into motion the greatest love story of my life. Like a bouquet of fresh white roses, you brought pure light into my world.",
            icon: "✨",
            image: "assets/images/rana-roses.jpg",
            imageCaption: "White roses blooming like my love for you"
        },
        {
            date: "Late Night Talks",
            tag: "Chapter II",
            title: "Hours That Felt Like Minutes",
            description: "Talking past 1 AM, laughing at silly things, sharing our secrets, and realizing that no matter how late it got, I never wanted to hang up.",
            icon: "🌙",
            image: "assets/images/rana-late-night.jpg",
            imageCaption: "1:17 AM whispers and sweetest smiles"
        },
        {
            date: "The Moment I Knew",
            tag: "Chapter III",
            title: "My Heart Chose You",
            description: "It wasn't a sudden storm; it was the quiet realization that every thought, every dream, and every tomorrow belongs with you, Rony.",
            icon: "💖",
            image: "assets/images/couple-mirror-adoration.jpg",
            imageCaption: "The way I look at you says everything"
        },
        {
            date: "Under The Night Sky",
            tag: "Chapter IV",
            title: "Reflections Under the Stars",
            description: "Wrapping my arms around you in the quiet evening, feeling your head rest softly against my chest. In that sacred moment, I found my eternal home.",
            icon: "💫",
            image: "assets/images/couple-street-mirror.jpg",
            imageCaption: "Our hearts beating as one under the stars"
        },
        {
            date: "Forever & Always",
            tag: "Infinity",
            title: "To Every Tomorrow",
            description: "Standing tall together through every season, conquering every storm, and loving you deeper with every passing breath for all of eternity.",
            icon: "♾️",
            image: "assets/images/couple-night-water.jpg",
            imageCaption: "Hand in hand, into forever"
        }
    ],

    // "Reasons Why I Love You" Card Deck
    reasons: [
        {
            id: 1,
            title: "Your Sweet Laugh",
            text: "The way you laugh makes my darkest day immediately brighten. It is my favorite melody in the entire universe.",
            icon: "🌸"
        },
        {
            id: 2,
            title: "Your Caring Heart",
            text: "You care so genuinely and deeply. The gentleness in your soul makes me want to be the best version of myself.",
            icon: "🤍"
        },
        {
            id: 3,
            title: "The Sound of Your Voice",
            text: "Even through a million miles, hearing you talk brings an instant calm to my heart that nothing else can.",
            icon: "🎙️"
        },
        {
            id: 4,
            title: "How Cute You Are When You're Shy",
            text: "The little ways you get bashful and smile softly make my heart flutter like it's the very first day.",
            icon: "🎀"
        },
        {
            id: 5,
            title: "Your Unmatched Beauty",
            text: "Inside and out, you are pure art. Looking at you makes me wonder how I got so incredibly lucky in this lifetime.",
            icon: "👑"
        },
        {
            id: 6,
            title: "You Are My Safe Haven",
            text: "No matter how chaotic the world gets outside, talking with you feels like wrapping myself in warm sunlight.",
            icon: "🏡"
        },
        {
            id: 7,
            title: "Your Adorable Pouts",
            text: "Even when you pretend to be mad or make that cute pouty face, all I want to do is shower you with infinite hugs.",
            icon: "🥺"
        },
        {
            id: 8,
            title: "Our Silly Inside Jokes",
            text: "We can share a glance or a word and burst out laughing when nobody else understands. You are my best friend.",
            icon: "✨"
        },
        {
            id: 9,
            title: "Your Support & Faith in Me",
            text: "When I doubt myself, your belief gives me wings. Having you in my corner is my greatest superpower.",
            icon: "🛡️"
        },
        {
            id: 10,
            title: "The Warmth in Your Words",
            text: "The sweet morning texts and sleepy goodnight whispers that anchor my days and give me sweet dreams.",
            icon: "💌"
        },
        {
            id: 11,
            title: "The Future We Dream Of",
            text: "Thinking about our future home, our trips, our adventures, and growing old holding your hand excites my soul.",
            icon: "🌅"
        },
        {
            id: 12,
            title: "Simply Because You Are You",
            text: "I don't just love things about you; I love the entire soul that is Rana. You are my once-in-a-lifetime miracle.",
            icon: "♾️"
        }
    ],

    // "Open When..." Secret Envelopes
    openWhen: [
        {
            id: "miss",
            emoji: "💌",
            preview: "Open When...",
            title: "You Miss Me",
            photo: "assets/images/couple-street-mirror.jpg",
            letter: "My sweet Rony,\n\nClose your eyes for a moment. Take a deep breath and place your hand on your heart. Can you feel that steady beat? That is me thinking of you right now. Distance may keep us apart physically for now, but my heart is permanently with you. I am counting down every second until I can hold your hand, hug you tight, and never let go. You are always on my mind, my angel."
        },
        {
            id: "sleep",
            emoji: "🌙",
            preview: "Open When...",
            title: "You Can't Sleep",
            photo: "assets/images/rana-late-night.jpg",
            letter: "Dearest Rana,\n\nLook up at the moon tonight. It's the exact same moon looking down on both of us. Imagine my arms wrapped softly around you, pulling you close, whispering that everything is alright. Let go of all the worries of today. Dream of our happiest memories and our beautiful future. Sleep peacefully, my love. I will meet you in our dreams."
        },
        {
            id: "stressed",
            emoji: "🌧️",
            preview: "Open When...",
            title: "You Feel Stressed or Sad",
            photo: "assets/images/rana-roses.jpg",
            letter: "My precious MyR,\n\nTake a slow, deep breath. Whatever is weighing heavy on your shoulders right now, remember that you are never alone. I am here with you through every storm. You are stronger, braver, and more capable than you know. Don't be too hard on yourself. Sip some warm tea, wrap yourself in a soft blanket, and know that your Mahmoud loves you unconditionally."
        },
        {
            id: "doubt",
            emoji: "💫",
            preview: "Open When...",
            title: "You Need A Reminder of My Love",
            photo: "assets/images/couple-mirror-adoration.jpg",
            letter: "To my favorite person in the world,\n\nIf ever the world makes you feel small or you wonder how much you mean to someone: listen to me carefully. You are the most important person in my life. Out of 8 billion people on this planet, my heart chose you without a single hesitation. You are cherished, you are adored, and my love for you will only grow stronger with each passing day. Forever yours."
        }
    ],

    // Extended Memories Gallery for the Lightbox & Interactive Polaroid Wall
    gallery: [
        {
            id: 1,
            src: "assets/images/couple-night-water.jpg",
            title: "By the Still Waters",
            category: "together",
            categoryLabel: "Us Together 💕",
            date: "Magical Evening",
            caption: "Standing beside you, looking out over the water. Wrapped in your love, every step with you feels like walking through a dream I never want to wake from.",
            icon: "✨",
            featured: true
        },
        {
            id: 2,
            src: "assets/images/couple-street-mirror.jpg",
            title: "Reflections Under the Stars",
            category: "together",
            categoryLabel: "Us Together 💕",
            date: "Our Quiet Haven",
            caption: "Resting your head against my chest under the evening sky. In that moment, the entire world melted away, and all that existed was the beat of our hearts.",
            icon: "🌌",
            featured: true
        },
        {
            id: 3,
            src: "assets/images/rana-portrait.jpg",
            title: "Royal Radiance in Rose",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "My Angel Rony",
            caption: "Effortlessly enchanting, glowing in silk, with that captivating smile that completely steals my breath away every single time.",
            icon: "👑",
            featured: true
        },
        {
            id: 4,
            src: "assets/images/rana-roses.jpg",
            title: "White Roses for My Queen",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "Pure Romance",
            caption: "Even a thousand pure white roses could never rival the warmth, elegance, and celestial sweetness of your radiant smile.",
            icon: "🌹",
            featured: true
        },
        {
            id: 5,
            src: "assets/images/couple-mirror-adoration.jpg",
            title: "The Look of Pure Devotion",
            category: "together",
            categoryLabel: "Us Together 💕",
            date: "Our Favorite Day",
            caption: "The way I look at you says everything words never could. You are my greatest joy, my sweetest blessing, and my forever girl.",
            icon: "💖",
            featured: true
        },
        {
            id: 6,
            src: "assets/images/rana-late-night.jpg",
            title: "1:17 AM Sweet Whispers",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "1:17 AM • Late Nights",
            caption: "When the clock strikes past 1 AM and the entire world is fast asleep, your voice and your smile are the only peace my heart ever seeks.",
            icon: "🌙",
            featured: true
        },
        {
            id: 7,
            src: "assets/images/mahmoud-portrait.jpg",
            title: "The Boy Who Fell For You",
            category: "mahmoud",
            categoryLabel: "Mahmoud 🛡️",
            date: "Forever Yours",
            caption: "A man whose greatest purpose, deepest devotion, and happiest moments will always begin and end with you, Rana.",
            icon: "🛡️",
            featured: false
        },
        {
            id: 8,
            src: "assets/images/rana-sunshine.jpg",
            title: "Sunshine & Soft Curls",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "Gentle Morning Warmth",
            caption: "Your natural glow, soft curls, and that gentle smile that warms my entire heart from miles away.",
            icon: "☀️",
            featured: false
        },
        {
            id: 9,
            src: "assets/images/rana-adventurer.jpg",
            title: "My Playful Adventurer",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "Silly & Adorable",
            caption: "That cute bashful smile and playful spirit that makes me laugh out loud and fall in love with you all over again.",
            icon: "🎀",
            featured: false
        },
        {
            id: 10,
            src: "assets/images/rana-silk-glance.jpg",
            title: "Silk & Sweet Serenade",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "Graceful Heart",
            caption: "Every quiet gesture of yours radiates beauty, elegance, and a gentleness that soothes my entire soul.",
            icon: "🌸",
            featured: false
        },
        {
            id: 11,
            src: "assets/images/rana-overalls.jpg",
            title: "Enchanting Gaze",
            category: "rana",
            categoryLabel: "My Queen Rana 👑",
            date: "Treasured Moment",
            caption: "Looking up with those enchanting eyes that completely captured my soul from the very beginning.",
            icon: "💫",
            featured: false
        }
    ],

    // Eternal Love Certificate
    certificate: {
        title: "Certificate of Eternal Love",
        subtitle: "Inscribed in the Stars & Sealed by the Heart",
        statement: "This document certifies that Mahmoud and Rana (Rony) are bound by unconditional love, endless laughter, infinite virtual kisses, and a promise to cherish each other through every chapter of this lifetime and beyond.",
        date: "Certified for Eternity",
        witness: "The Universe & Stars"
    },
    
    // Special messages for different kiss counts
    kissMessages: {
        10: "10 kisses! You're so sweet, MyR! 💕",
        25: "25 kisses! My heart is racing for you! 💖",
        50: "50 kisses! I'm falling deeper in love! 💘",
        75: "75 kisses! Can't wait to kiss you in real life! 💋",
        100: "100 kisses! You're my everything, Rony! 💍✨"
    },
    
    // Character interaction messages
    characterMessages: {
        partner: "Rana, you're the most beautiful person in the world! 💕",
        you: "I'm so lucky to have you in my life! 💖"
    },
    
    // Memory effect messages
    memoryMessages: {
        lateNight: "Those late nights talking with you are my favorite memories 🌙✨",
        firstMeeting: "I know the day we meet will be magical and unforgettable 💫💕",
        care: "Your caring nature, sweet voice, and adorable cuteness melt my heart 💕😍"
    }
};

// Make config available globally
window.CONFIG = CONFIG;
