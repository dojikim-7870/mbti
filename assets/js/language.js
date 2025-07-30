// Language management system
let currentLanguage = 'en';

class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'en';
        this.init();
    }

    init() {
        this.setupLanguageButtons();
        this.applyLanguage(this.currentLang);
    }

    setupLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    switchLanguage(lang) {
        if (!translations[lang]) return;
        
        this.currentLang = lang;
        currentLanguage = lang;
        localStorage.setItem('preferred-language', lang);
        
        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        const langData = translations[lang];
        if (!langData) return;

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });

        // Update placeholders and other attributes
        this.updateDynamicContent(lang);
        
        // Reload dynamic content that depends on language
        if (window.app) {
            window.app.loadDatingStyles();
            window.app.loadConversationContent();
        }
    }

    updateDynamicContent(lang) {
        const langData = translations[lang];
        
        // Update select options
        const yourMbti = document.getElementById('yourMbti');
        const partnerMbti = document.getElementById('partnerMbti');
        const idealTypeSelect = document.getElementById('idealTypeSelect');
        
        if (yourMbti && langData.select_your_mbti) {
            yourMbti.options[0].textContent = langData.select_your_mbti;
        }
        
        if (partnerMbti && langData.select_partner_mbti) {
            partnerMbti.options[0].textContent = langData.select_partner_mbti;
        }
        
        if (idealTypeSelect && langData.select_your_type) {
            idealTypeSelect.options[0].textContent = langData.select_your_type;
        }

        // Update page title
        if (langData.page_title) {
            document.title = langData.page_title;
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && langData.meta_description) {
            metaDesc.setAttribute('content', langData.meta_description);
        }
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});
