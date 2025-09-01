const questions = [
    {
        question: {
            en: "When meeting new people, what is your approach?",
            ja: "新しい人に会うとき、あなたのアプローチは？",
            ko: "새로운 사람을 만나는 자리에서 당신의 모습은 어떤가요?"
        },
        options: [
            {
                text: {
                    en: "I love socializing and take the lead in conversations.",
                    ja: "積極的に会話し、会話をリードするのが好きです。",
                    ko: "대화를 주도하고 새로운 사람들과 어울리는 것을 즐긴다."
                },
                scores: { E: 1, I: 0 }
            },
            {
                text: {
                    en: "I prefer to listen quietly and observe. I am more comfortable with familiar people.",
                    ja: "静かに耳を傾け、観察する方が好きです。慣れた人との方が楽です。",
                    ko: "조용히 경청하며 관찰하는 편이다. 익숙한 사람들과 소통하는 것이 편하다."
                },
                scores: { E: 0, I: 1 }
            }
        ]
    },
    {
        question: {
            en: "When planning a date, what is your tendency?",
            ja: "デートの計画を立てるとき、あなたの傾向は？",
            ko: "데이트 계획을 세울 때, 당신의 성향은?"
        },
        options: [
            {
                text: {
                    en: "I carefully plan the date in advance, from the restaurant to the activities.",
                    ja: "レストランからアクティビティまで、綿密に計画を立てます。",
                    ko: "식당부터 활동까지, 미리 꼼꼼하게 계획을 세우는 편이다."
                },
                scores: { J: 1, P: 0 }
            },
            {
                text: {
                    en: "I prefer a spontaneous and flexible date, going with the flow.",
                    ja: "その場の雰囲気に合わせて、柔軟で自発的なデートを好みます。",
                    ko: "즉흥적이고 자유로운 데이트를 선호한다. 상황에 맞춰 움직이는 것이 좋다."
                },
                scores: { J: 0, P: 1 }
            }
        ]
    },
    {
        question: {
            en: "What attracts you more in a partner?",
            ja: "パートナーに惹かれるのは、どんなところですか？",
            ko: "파트너에게 더 매력을 느끼는 부분은?"
        },
        options: [
            {
                text: {
                    en: "Their logical mind and ability to analyze situations objectively.",
                    ja: "論理的な思考と客観的に状況を分析する能力です。",
                    ko: "논리적으로 상황을 분석하고 문제를 해결하는 능력이다."
                },
                scores: { T: 1, F: 0 }
            },
            {
                text: {
                    en: "Their warm heart and ability to empathize with others' feelings.",
                    ja: "温かい心と、他人の感情に共感する能力です。",
                    ko: "따뜻한 마음과 타인의 감정에 공감하는 능력이다."
                },
                scores: { T: 0, F: 1 }
            }
        ]
    },
    {
        question: {
            en: "What's your focus when discussing a future date?",
            ja: "将来のデートについて話すとき、あなたの焦点は？",
            ko: "미래의 데이트에 대해 이야기할 때, 당신의 초점은?"
        },
        options: [
            {
                text: {
                    en: "I focus on a realistic and practical plan, like location and budget.",
                    ja: "場所や予算など、現実的で具体的な計画に焦点を当てます。",
                    ko: "장소, 예산 등 현실적이고 구체적인 계획을 세우는 데 집중한다."
                },
                scores: { S: 1, N: 0 }
            },
            {
                text: {
                    en: "I imagine the possibilities and the overall feeling of the experience.",
                    ja: "可能性やその経験の全体的な雰囲気を想像します。",
                    ko: "경험이 줄 수 있는 가능성과 전체적인 느낌을 상상한다."
                },
                scores: { S: 0, N: 1 }
            }
        ]
    }
];

const resultTexts = {
    en: {
        title: "Your MBTI Dating Style: {mbti}",
        description: "Your personality type gives you a unique approach to love and relationships. Your dating style is characterized by your core preferences. Understanding your type is the first step to finding a compatible partner and building a strong, lasting relationship.",
        restart: "Take the Quiz Again"
    },
    ja: {
        title: "あなたのMBTIデートスタイル: {mbti}",
        description: "あなたの性格タイプは、愛と人間関係への独自のアプローチを与えます。あなたのデートスタイルは、あなたのコアな好みに特徴づけられます。あなたのタイプを理解することは、相性の良いパートナーを見つけ、強固で長続きする関係を築くための第一歩です。",
        restart: "もう一度クイズを受ける"
    },
    ko: {
        title: "당신의 MBTI 연애 스타일: {mbti}",
        description: "당신의 성격 유형은 사랑과 관계에 대한 독특한 접근 방식을 제공합니다. 당신의 데이트 스타일은 핵심적인 선호도에 의해 특징지어집니다. 당신의 유형을 이해하는 것은 잘 맞는 파트너를 찾고, 강하고 오래가는 관계를 구축하는 첫걸음입니다.",
        restart: "퀴즈 다시 하기"
    }
};

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const nextBtn = document.getElementById('next-btn');
const langButtons = document.querySelectorAll('.lang-btn');

function getCurrentLanguage() {
    const activeLangBtn = document.querySelector('.lang-btn.active');
    return activeLangBtn ? activeLangBtn.getAttribute('onclick').match(/'([^']+)'/)[1] : 'en';
}

function renderQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    const lang = getCurrentLanguage();

    quizArea.innerHTML = ''; // Clear previous question
    nextBtn.style.display = 'none';

    const questionTitle = document.createElement('h3');
    questionTitle.className = 'question';
    questionTitle.textContent = questionData.question[lang];
    quizArea.appendChild(questionTitle);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    questionData.options.forEach((option, index) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option';
        optionBtn.textContent = option.text[lang];
        optionBtn.onclick = () => selectOption(option.scores);
        optionsContainer.appendChild(optionBtn);
    });

    quizArea.appendChild(optionsContainer);
}

function selectOption(optionScores) {
    // Add scores from the selected option
    for (const key in optionScores) {
        scores[key] += optionScores[key];
    }
    
    // Visually mark the selected option (optional)
    const options = quizArea.querySelectorAll('.option');
    options.forEach(opt => opt.style.pointerEvents = 'none'); // Disable clicking after selection
    
    nextBtn.style.display = 'block';
}

function calculateMBTI() {
    let mbti = '';
    mbti += scores.E > scores.I ? 'E' : 'I';
    mbti += scores.S > scores.N ? 'S' : 'N';
    mbti += scores.T > scores.F ? 'T' : 'F';
    mbti += scores.J > scores.P ? 'J' : 'P';
    return mbti;
}

function showResult() {
    quizArea.style.display = 'none';
    nextBtn.style.display = 'none';
    resultArea.style.display = 'block';
    
    const lang = getCurrentLanguage();
    const mbtiType = calculateMBTI();
    
    const resultTitle = resultTexts[lang].title.replace('{mbti}', mbtiType);
    const resultDescription = resultTexts[lang].description.replace('{mbti}', mbtiType);

    const resultText = document.createElement('h2');
    resultText.className = 'result-mbti';
    resultText.textContent = resultTitle;
    resultArea.appendChild(resultText);

    const description = document.createElement('p');
    description.textContent = resultDescription;
    resultArea.appendChild(description);
    
    const restartBtn = document.createElement('button');
    restartBtn.id = 'start-over-btn';
    restartBtn.textContent = resultTexts[lang].restart;
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        resultArea.innerHTML = '';
        resultArea.style.display = 'none';
        quizArea.style.display = 'block';
        renderQuestion();
    });
    resultArea.appendChild(restartBtn);
}

// Event listeners to run the quiz
document.addEventListener('DOMContentLoaded', () => {
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });
    
    renderQuestion(); // Initial render
});