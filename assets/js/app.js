// Main Application JavaScript
class MBTILoveApp {
    constructor() {
        this.currentTab = 'compatibility';
        this.currentQuestion = 0;
        this.gameAnswers = [];
        this.balanceQuestions = [
            {
                question: "Which would you prefer for a weekend date?",
                choiceA: "Spontaneous adventure exploring the city",
                choiceB: "Planned visit to a museum or cultural event",
                typeA: "P",
                typeB: "J"
            },
            {
                question: "How do you prefer to resolve relationship conflicts?",
                choiceA: "Talk through feelings and emotions",
                choiceB: "Analyze the situation logically",
                typeA: "F",
                typeB: "T"
            },
            {
                question: "At a party, you would rather:",
                choiceA: "Meet new people and socialize",
                choiceB: "Have deep conversations with close friends",
                typeA: "E",
                typeB: "I"
            },
            {
                question: "When making relationship decisions, you trust:",
                choiceA: "Your gut feelings and intuition",
                choiceB: "Facts and past experiences",
                typeA: "N",
                typeB: "S"
            },
            {
                question: "Your ideal romantic evening is:",
                choiceA: "Trying a new restaurant neither of you has been to",
                choiceB: "Cooking together at your favorite home spot",
                typeA: "P",
                typeB: "J"
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDatingStyles();
        this.loadConversationContent();
        this.setupModals();
    }

    setupEventListeners() {
        // Logo link to home
        document.getElementById('logo-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.switchTab('compatibility');
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Compatibility checker
        const checkBtn = document.getElementById('checkCompatibility');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => this.checkCompatibility());
        }

        // MBTI test modal
        const mbtiTestBtn = document.getElementById('openMbtiTest');
        if (mbtiTestBtn) {
            mbtiTestBtn.addEventListener('click', () => this.openModal('mbti-test-modal'));
        }

        // Ideal type selector
        const idealTypeSelect = document.getElementById('idealTypeSelect');
        if (idealTypeSelect) {
            idealTypeSelect.addEventListener('change', (e) => this.showIdealMatches(e.target.value));
        }

        // Balance game
        const startGameBtn = document.getElementById('start-game');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => this.startBalanceGame());
        }

        const nextQuestionBtn = document.getElementById('next-question');
        if (nextQuestionBtn) {
            nextQuestionBtn.addEventListener('click', () => this.nextQuestion());
        }

       

    switchTab(tabName) {
        // Hide all content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected content and activate tab
        const selectedContent = document.getElementById(tabName);
        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        
        if (selectedContent && selectedTab) {
            selectedContent.classList.add('active');
            selectedTab.classList.add('active');
            this.currentTab = tabName;
        }
    }

    checkCompatibility() {
        const yourMbti = document.getElementById('yourMbti').value;
        const partnerMbti = document.getElementById('partnerMbti').value;
        const resultContainer = document.getElementById('compatibility-result');

        if (!yourMbti || !partnerMbti) {
            alert(translations[currentLanguage].select_both_types || 'Please select both MBTI types.');
            return;
        }

        const compatibility = MBTIData.getCompatibility(yourMbti, partnerMbti);
        
        resultContainer.innerHTML = `
            <div class="compatibility-score">
                <div class="score-circle ${this.getScoreClass(compatibility.score)}">
                    ${compatibility.score}%
                </div>
                <h3>${compatibility.title}</h3>
            </div>
            <div class="compatibility-details">
                <h4>Compatibility Analysis</h4>
                <p>${compatibility.description}</p>
                <h4>Strengths</h4>
                <ul>
                    ${compatibility.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
                <h4>Challenges</h4>
                <ul>
                    ${compatibility.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                </ul>
                <h4>Tips for Success</h4>
                <ul>
                    ${compatibility.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        resultContainer.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth' });
    }

    getScoreClass(score) {
        if (score >= 85) return 'score-excellent';
        if (score >= 70) return 'score-good';
        return 'score-average';
    }

    loadDatingStyles() {
        const container = document.getElementById('dating-styles-content');
        if (!container) return;

        const datingStyles = MBTIData.getDatingStyles();
        
        container.innerHTML = Object.entries(datingStyles).map(([type, style]) => `
            <div class="dating-style-card">
                <h3>${type} - ${style.title}</h3>
                <p><strong>Dating Approach:</strong> ${style.approach}</p>
                <p><strong>Communication Style:</strong> ${style.communication}</p>
                <p><strong>Relationship Values:</strong> ${style.values}</p>
                <p><strong>Red Flags:</strong> ${style.redFlags}</p>
            </div>
        `).join('');
    }

    showIdealMatches(selectedType) {
        const container = document.getElementById('ideal-matches');
        if (!selectedType || !container) return;

        const matches = MBTIData.getIdealMatches(selectedType);
        
        container.innerHTML = `
            <h3>Best Matches for ${selectedType}</h3>
            <div class="ideal-matches-grid">
                ${matches.map(match => `
                    <div class="match-card">
                        <div class="match-percentage">${match.percentage}%</div>
                        <h4>${match.type}</h4>
                        <p>${match.reason}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    loadConversationContent() {
        const container = document.getElementById('conversation-content');
        if (!container) return;

        const conversationStyles = MBTIData.getConversationStyles();
        
        container.innerHTML = Object.entries(conversationStyles).map(([category, styles]) => `
            <div class="conversation-category">
                <h3>${category}</h3>
                <div class="conversation-styles">
                    ${styles.map(style => `
                        <div class="conversation-card">
                            <h4>${style.types.join(', ')}</h4>
                            <p><strong>Communication:</strong> ${style.communication}</p>
                            <p><strong>Conflict Resolution:</strong> ${style.conflict}</p>
                            <p><strong>Tips:</strong> ${style.tips}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    startBalanceGame() {
        this.currentQuestion = 0;
        this.gameAnswers = [];
        document.getElementById('start-game').classList.add('hidden');
        document.getElementById('game-result').classList.add('hidden');
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.balanceQuestions.length) {
            this.showGameResult();
            return;
        }

        const question = this.balanceQuestions[this.currentQuestion];
        document.getElementById('question-title').textContent = question.question;
        
        const choiceA = document.getElementById('choice-a');
        const choiceB = document.getElementById('choice-b');
        
        choiceA.textContent = question.choiceA;
        choiceB.textContent = question.choiceB;
        
        // Remove previous selections
        choiceA.classList.remove('selected');
        choiceB.classList.remove('selected');
        
        // Add click handlers
        choiceA.onclick = () => this.selectChoice('A');
        choiceB.onclick = () => this.selectChoice('B');
        
        document.getElementById('next-question').classList.add('hidden');
    }

    selectChoice(choice) {
        const question = this.balanceQuestions[this.currentQuestion];
        const choiceA = document.getElementById('choice-a');
        const choiceB = document.getElementById('choice-b');
        
        // Visual feedback
        choiceA.classList.remove('selected');
        choiceB.classList.remove('selected');
        
        if (choice === 'A') {
            choiceA.classList.add('selected');
            this.gameAnswers.push(question.typeA);
        } else {
            choiceB.classList.add('selected');
            this.gameAnswers.push(question.typeB);
        }
        
        document.getElementById('next-question').classList.remove('hidden');
    }

    nextQuestion() {
        this.currentQuestion++;
        this.showQuestion();
    }

    showGameResult() {
        const resultContainer = document.getElementById('game-result');
        const preferences = this.analyzeAnswers();
        
        resultContainer.innerHTML = `
            <h3>Your Personality Preferences</h3>
            <div class="preference-results">
                <p><strong>Energy:</strong> ${preferences.E > preferences.I ? 'Extroversion (E)' : 'Introversion (I)'}</p>
                <p><strong>Information:</strong> ${preferences.N > preferences.S ? 'Intuition (N)' : 'Sensing (S)'}</p>
                <p><strong>Decisions:</strong> ${preferences.F > preferences.T ? 'Feeling (F)' : 'Thinking (T)'}</p>
                <p><strong>Lifestyle:</strong> ${preferences.P > preferences.J ? 'Perceiving (P)' : 'Judging (J)'}</p>
            </div>
            <p>Based on your choices, you tend toward these personality preferences. Take a full MBTI test for a complete assessment!</p>
            <button class="btn-primary" onclick="app.startBalanceGame()">Play Again</button>
        `;
        
        resultContainer.classList.remove('hidden');
        document.getElementById('start-game').classList.remove('hidden');
    }

    analyzeAnswers() {
        const counts = { E: 0, I: 0, N: 0, S: 0, F: 0, T: 0, P: 0, J: 0 };
        
        this.gameAnswers.forEach(answer => {
            counts[answer]++;
        });
        
        return counts;
    }

    setupModals() {
        // Close modals when clicking the X or outside
        document.querySelectorAll('.modal').forEach(modal => {
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.onclick = () => this.closeModal(modal.id);
            }
            
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            };
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new MBTILoveApp();
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.style.display === 'block') {
                window.app.closeModal(modal.id);
            }
        });
    }
});
