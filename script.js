// Halloween Scavenger Hunt Cards JavaScript

class ScavengerHunt {
    constructor() {
        this.clues = [];
        this.currentOrder = [];
        this.revealedAnswers = new Set();
        this.currentLanguage = 'en';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.setupEventListeners();
        this.setLanguage(this.currentLanguage);
        this.renderCards();
        this.generatePrintCards();
    }

    async loadTranslations() {
        try {
            const response = await fetch('languages.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.translations = await response.json();
            console.log('Translations loaded successfully');
        } catch (error) {
            console.error('Error loading translations:', error);
            console.log('Using fallback English translations');
            this.translations = this.getFallbackTranslations();
        }
    }

    getFallbackTranslations() {
        // Fallback to English only if translations file can't load
        return {
            en: {
                title: "🎃 Halloween Scavenger Hunt Cards 🎃",
                buttons: {
                    shuffle: "🔀 Shuffle Cards",
                    print: "🖨️ Print Cards",
                    reset: "🔄 Reset Hunt",
                    setup: "📋 Setup Guide"
                },
                cardAnswer: "Click to reveal answer",
                notifications: {
                    shuffled: "Cards shuffled! 🔀",
                    reset: "Hunt reset! 🔄",
                    fallback: "📁 Using built-in cards",
                    newClue: "New clue added! ✨",
                    exported: "Hunt exported! 📁"
                },
                clues: this.getFallbackClues()
            }
        };
    }

    getFallbackClues() {
        return [
            {
                id: 1,
                emoji: "🥣",
                clue: "Find your very first treat, I'm where you get food to eat.",
                answer: "Kitchen/Bowl",
                location: "kitchen"
            },
            {
                id: 2,
                emoji: "🍬",
                clue: "If you want to find a candy, early. You must look under your dinner.",
                answer: "Under dinner table",
                location: "dining_room"
            },
            {
                id: 3,
                emoji: "🎃",
                clue: "It's too early to quit. Sit on something you sit.",
                answer: "Chair/Couch",
                location: "living_room"
            },
            {
                id: 4,
                emoji: "🧪",
                clue: "It's time to stop for a drink. Now I'm close to the sink.",
                answer: "Kitchen sink",
                location: "kitchen"
            },
            {
                id: 5,
                emoji: "🐸",
                clue: "You still have more clues. The next one is by your shoes.",
                answer: "Shoe rack/Closet",
                location: "entryway"
            },
            {
                id: 6,
                emoji: "💀",
                clue: "I might be hard to see. But I'm close to your TV.",
                answer: "Near television",
                location: "living_room"
            },
            {
                id: 7,
                emoji: "👻",
                clue: "No need to check outside, I'm right at your bedside.",
                answer: "Bedside table",
                location: "bedroom"
            },
            {
                id: 8,
                emoji: "☠️",
                clue: "Now I'm in your bed! I'm under where you put your head.",
                answer: "Under pillow",
                location: "bedroom"
            },
            {
                id: 9,
                emoji: "🦇",
                clue: "The next clue is what you need. I'm near the books you read.",
                answer: "Bookshelf/Library",
                location: "study"
            },
            {
                id: 10,
                emoji: "🧙‍♀️",
                clue: "Find the next clue, if you dare. I'm where you keep your underwear.",
                answer: "Dresser drawer",
                location: "bedroom"
            },
            {
                id: 11,
                emoji: "🧙‍♂️",
                clue: "Now if you follow this path, You'll find me where you take a bath.",
                answer: "Bathroom/Bathtub",
                location: "bathroom"
            },
            {
                id: 12,
                emoji: "🧹",
                clue: "This is your last clue. There won't be anymore. For your final treat, check the front door.",
                answer: "Front door",
                location: "entryway"
            },
            {
                id: 13,
                emoji: "🕷️",
                clue: "Don't be scared of the dark, I'm hiding where clothes get their spark!",
                answer: "Washing machine/Laundry room",
                location: "laundry"
            },
            {
                id: 14,
                emoji: "🎭",
                clue: "When you're feeling quite cold, I'm where warmth takes hold.",
                answer: "Fireplace/Heater",
                location: "living_room"
            },
            {
                id: 15,
                emoji: "🔮",
                clue: "Look where time ticks away, your next clue waits there all day.",
                answer: "Clock/Watch area",
                location: "any_room"
            },
            {
                id: 16,
                emoji: "🕯️",
                clue: "I'm cold and quite tall, keeping your food from going bad at all.",
                answer: "Refrigerator",
                location: "kitchen"
            },
            {
                id: 17,
                emoji: "🧛‍♂️",
                clue: "Where you hang your clothes so neat, check the place that can't be beat!",
                answer: "Closet/Wardrobe",
                location: "bedroom"
            },
            {
                id: 18,
                emoji: "🌙",
                clue: "When you look at yourself each day, I reflect back in every way.",
                answer: "Mirror/Bathroom mirror",
                location: "bathroom"
            },
            {
                id: 19,
                emoji: "🎪",
                clue: "I have steps but I don't walk, I help you reach up high without talk.",
                answer: "Stairs/Staircase",
                location: "hallway"
            },
            {
                id: 20,
                emoji: "🦴",
                clue: "Where dishes get clean and sparkly bright, check this spot both day and night.",
                answer: "Dishwasher",
                location: "kitchen"
            },
            {
                id: 21,
                emoji: "🔮",
                clue: "I'm the guardian of your home so dear, I keep the weather from getting too near.",
                answer: "Windows/Window sill",
                location: "any_room"
            },
            {
                id: 22,
                emoji: "🧟‍♀️",
                clue: "When the day is done and you need some rest, look where pillows are at their best.",
                answer: "Couch cushions/Sofa",
                location: "living_room"
            }
        ];
    }

    setupEventListeners() {
        document.getElementById('shuffleBtn').addEventListener('click', () => this.shuffleCards());
        document.getElementById('printBtn').addEventListener('click', () => this.printCards());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetHunt());
        document.getElementById('setupGuideBtn').addEventListener('click', () => this.showSetupGuide());
        document.getElementById('closeGuideBtn').addEventListener('click', () => this.hideSetupGuide());
        document.getElementById('languageSelect').addEventListener('change', (e) => this.setLanguage(e.target.value));
        
        // Close setup guide when clicking outside
        document.getElementById('setupGuide').addEventListener('click', (e) => {
            if (e.target.id === 'setupGuide') {
                this.hideSetupGuide();
            }
        });
    }

    setLanguage(langCode) {
        this.currentLanguage = langCode;
        
        if (!this.translations[langCode]) {
            console.warn(`Language ${langCode} not found, falling back to English`);
            langCode = 'en';
        }

        const t = this.translations[langCode];
        
        // Update UI elements
        document.getElementById('mainTitle').textContent = t.title;
        document.getElementById('shuffleBtn').textContent = t.buttons.shuffle;
        document.getElementById('printBtn').textContent = t.buttons.print;
        document.getElementById('resetBtn').textContent = t.buttons.reset;
        document.getElementById('setupGuideBtn').textContent = t.buttons.setup;
        
        // Update language selector
        document.getElementById('languageSelect').value = this.currentLanguage;
        
        // Update clues and setup guide
        this.clues = t.clues || [];
        this.currentOrder = [...this.clues];
        this.renderCards();
        this.generatePrintCards();
        this.updateSetupGuide(t);
    }

    updateSetupGuide(t) {
        if (!t.setupGuide) return;
        
        document.getElementById('setupTitle').textContent = t.setupGuide.title;
        document.getElementById('tipsTitle').textContent = t.setupGuide.tips.title;
        
        // Update steps
        const stepsContainer = document.getElementById('setupSteps');
        stepsContainer.innerHTML = '';
        
        t.setupGuide.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'step';
            stepElement.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <h3>${step.title}</h3>
                    <p>${step.content}</p>
                </div>
            `;
            stepsContainer.appendChild(stepElement);
        });
        
        // Update tips
        const tipsContainer = document.getElementById('tipsList');
        tipsContainer.innerHTML = '';
        
        t.setupGuide.tips.items.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsContainer.appendChild(li);
        });
    }

    renderCards() {
        const cardsGrid = document.getElementById('cardsGrid');
        cardsGrid.innerHTML = '';

        this.currentOrder.forEach((clue, index) => {
            const cardElement = this.createCardElement(clue, index + 1);
            cardsGrid.appendChild(cardElement);
        });
    }

    createCardElement(clue, displayNumber) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.clueId = clue.id;

        const isRevealed = this.revealedAnswers.has(clue.id);
        const t = this.translations[this.currentLanguage];
        const answerText = isRevealed ? clue.answer : (t?.cardAnswer || 'Click to reveal answer');
        
        card.innerHTML = `
            <div class="card-content">
                <div class="card-number">${displayNumber}</div>
                <div class="card-emoji">${clue.emoji}</div>
                <div class="card-clue">${clue.clue}</div>
                <div class="card-answer ${isRevealed ? 'revealed' : ''}" onclick="scavengerHunt.toggleAnswer(${clue.id})">
                    ${answerText}
                </div>
            </div>
        `;

        // Add click event for card interaction
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-answer')) {
                this.animateCard(card);
            }
        });

        return card;
    }

    toggleAnswer(clueId) {
        if (this.revealedAnswers.has(clueId)) {
            this.revealedAnswers.delete(clueId);
        } else {
            this.revealedAnswers.add(clueId);
        }
        this.renderCards();
    }

    animateCard(cardElement) {
        cardElement.style.transform = 'scale(1.05) rotate(2deg)';
        setTimeout(() => {
            cardElement.style.transform = '';
        }, 200);
    }

    shuffleCards() {
        // Fisher-Yates shuffle algorithm
        const shuffled = [...this.clues];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        this.currentOrder = shuffled;
        this.renderCards();
        this.generatePrintCards();
        
        // Show feedback
        const t = this.translations[this.currentLanguage];
        this.showNotification(t?.notifications?.shuffled || 'Cards shuffled! 🔀');
    }

    resetHunt() {
        this.revealedAnswers.clear();
        this.currentOrder = [...this.clues];
        this.renderCards();
        const t = this.translations[this.currentLanguage];
        this.showNotification(t?.notifications?.reset || 'Hunt reset! 🔄');
    }

    generatePrintCards() {
        const printSection = document.getElementById('printSection');
        printSection.innerHTML = '<div class="print-cards"></div>';
        
        const printCards = printSection.querySelector('.print-cards');
        
        this.currentOrder.forEach((clue, index) => {
            const printCard = document.createElement('div');
            printCard.className = 'print-card';
            printCard.innerHTML = `
                <div class="print-card-number">${index + 1}</div>
                <div class="print-card-emoji">${clue.emoji}</div>
                <div class="print-card-clue">${clue.clue}</div>
            `;
            printCards.appendChild(printCard);
        });
    }

    printCards() {
        this.generatePrintCards();
        window.print();
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: bold;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    showSetupGuide() {
        document.getElementById('setupGuide').style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    hideSetupGuide() {
        document.getElementById('setupGuide').style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Method to add new clues dynamically
    addClue(emoji, clue, answer, location) {
        const newId = Math.max(...this.clues.map(c => c.id)) + 1;
        const newClue = {
            id: newId,
            emoji: emoji,
            clue: clue,
            answer: answer,
            location: location
        };
        
        this.clues.push(newClue);
        this.currentOrder.push(newClue);
        this.renderCards();
        this.generatePrintCards();
        
        this.showNotification('New clue added! ✨');
    }

    // Method to export current hunt configuration
    exportHunt() {
        const huntData = {
            clues: this.clues,
            currentOrder: this.currentOrder.map(clue => clue.id)
        };
        
        const dataStr = JSON.stringify(huntData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'halloween-scavenger-hunt.json';
        link.click();
        
        this.showNotification('Hunt exported! 📁');
    }
}

// Initialize the scavenger hunt when DOM is loaded
let scavengerHunt;
document.addEventListener('DOMContentLoaded', () => {
    scavengerHunt = new ScavengerHunt();
});

// Add some fun Easter eggs and interactions
document.addEventListener('keydown', (e) => {
    // Konami code: ↑↑↓↓←→←→BA
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                       'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                       'KeyB', 'KeyA'];
    
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            document.body.style.filter = 'hue-rotate(180deg)';
            scavengerHunt.showNotification('👻 Spooky mode activated! 👻');
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});