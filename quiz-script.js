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
                    en: "I prefer to set specific plans. I feel a sense of security when things go according to the schedule.",
                    ja: "具体的な場所や時間を決めておきたいです。計画通りに進むと安心します。",
                    ko: "구체적인 장소와 시간, 할 일을 정해두는 것을 선호한다. 계획대로 진행될 때 안정감을 느낀다."
                },
                scores: { S: 1, N: 0 }
            },
            {
                text: {
                    en: "I prefer spontaneous dates. I want a free-flowing atmosphere rather than being tied to a plan.",
                    ja: "サプライズや自由なデートが好きです。計画に縛られたくないです。",
                    ko: "즉흥적으로 데이트를 즐기는 것이 좋다. 계획에 얽매이기보다 자유로운 분위기를 원한다."
                },
                scores: { S: 0, N: 1 }
            }
        ]
    },
    {
        question: {
            en: "When your date shares a concern, how do you react?",
            ja: "デート相手が悩みを打ち明けたとき、どう反応しますか？",
            ko: "데이트 상대가 고민을 털어놓을 때, 당신의 반응은?"
        },
        options: [
            {
                text: {
                    en: "I empathize with their feelings and offer emotional support. I value harmony in the relationship.",
                    ja: "相手の気持ちに共感し、慰めます。関係の調和を大切にします。",
                    ko: "상대방의 감정에 공감하고 위로해준다. 관계의 조화를 중요하게 생각한다."
                },
                scores: { T: 0, F: 1 }
            },
            {
                text: {
                    en: "I try to find a logical solution and offer practical advice. I focus on problem-solving.",
                    ja: "論理的な解決策を探し、現実的なアドバイスをします。問題解決に焦点を当てます。",
                    ko: "논리적인 해결책을 찾아 제시한다. 문제 해결에 초점을 맞춘다."
                },
                scores: { T: 1, F: 0 }
            }
        ]
    },
    {
        question: {
            en: "After a date, what is your mindset?",
            ja: "デートの後、あなたの考え方は？",
            ko: "데이트 후 당신의 마음가짐은?"
        },
        options: [
            {
                text: {
                    en: "I plan for our next meeting. I want the relationship to continuously grow.",
                    ja: "次のデートの計画を立てます。関係が継続的に発展することを望みます。",
                    ko: "데이트 후 다음 만남을 위한 계획을 세우는 편이다. 관계가 지속적으로 발전하길 바란다."
                },
                scores: { J: 1, P: 0 }
            },
            {
                text: {
                    en: "I don't make any specific plans. I just wait for the next time we naturally meet.",
                    ja: "特に計画は立てません。自然な再会を待ちます。",
                    ko: "딱히 계획을 세우지 않는다. 자연스러운 만남을 기다린다."
                },
                scores: { J: 0, P: P: 1 }
            }
        ]
    }
];

// Language-specific texts for the result and start-over button
const resultTexts = {
    en: {
        title: "Your Dating Style is {mbti}!",
        description: "The {mbti} type... (Add description for each type here)",
        restart: "Start Over"
    },
    ja: {
        title: "あなたのデートスタイルは{mbti}です！",
        description: "{mbti}タイプは...（ここにタイプ別の説明を追加してください）",
        restart: "もう一度始める"
    },
    ko: {
        title: "당신의 데이트 스타일은 {mbti}입니다!",
        description: "{mbti} 유형은... (이곳에 유형별 설명을 추가하세요)",
        restart: "다시 시작하기"
    }
};

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
let selectedOption = null;

const quizArea = document.getElementById('quiz-area');
const nextBtn = document.getElementById('next-btn');
const resultArea = document.getElementById('result-area');

function getCurrentLanguage() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

function showQuestion() {
    quizArea.innerHTML = '';
    resultArea.style.display = 'none';
    
    const lang = getCurrentLanguage();
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.createElement('h3');
    questionElement.className = 'question';
    questionElement.textContent = currentQuestion.question[lang];
    quizArea.appendChild(questionElement);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option.text[lang];
        button.addEventListener('click', () => selectOption(button, option.scores));
        optionsContainer.appendChild(button);
    });

    quizArea.appendChild(optionsContainer);
    nextBtn.style.display = 'none';
}

function selectOption(button, optionScores) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    button.classList.add('selected');
    
    selectedOption = optionScores;
    nextBtn.style.display = 'block';
}

function handleNextButton() {
    if (selectedOption) {
        for (const [trait, value] of Object.entries(selectedOption)) {
            scores[trait] += value;
        }

        selectedOption = null;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }
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
        quizArea.style.display = 'block';
        resultArea.innerHTML = '';
        showQuestion();
    });
    resultArea.appendChild(restartBtn);
}

nextBtn.addEventListener('click', handleNextButton);
document.addEventListener('DOMContentLoaded', showQuestion);