// Main Application JavaScript
const MBTIData = {
    // // MBTI compatibility and personality data
class MBTIData {
    static compatibilityMatrix = {
        // High compatibility pairings (85-98%)
        'ENFP-INFJ': { score: 98, title: 'Golden Pair - Perfect Match' },
        'ENTP-INFJ': { score: 96, title: 'Inspiring Connection' },
        'ENFJ-INFP': { score: 95, title: 'Harmonious Bond' },
        'ENTJ-INFP': { score: 94, title: 'Complementary Growth' },
        'ISTJ-ESFP': { score: 92, title: 'Stabilizing Balance' },
        'ISTP-ESFJ': { score: 90, title: 'Practical Harmony' },
        'INTJ-ENFP': { score: 89, title: 'Visionary Partnership' },
        'ISFJ-ESTP': { score: 88, title: 'Caring Adventure' },
        'INTP-ENFJ': { score: 87, title: 'Intellectual Warmth' },
        'ISFP-ESTJ': { score: 86, title: 'Gentle Structure' },
        
        // Good compatibility (70-84%)
        'ENFP-INTJ': { score: 84, title: 'Creative Minds' },
        'INFJ-ENTP': { score: 83, title: 'Deep Conversations' },
        'INFP-ENFJ': { score: 82, title: 'Emotional Understanding' },
        'ESFP-ISTJ': { score: 81, title: 'Fun Stability' },
        'ESTP-ISFJ': { score: 80, title: 'Active Care' },
        'ESTJ-ISFP': { score: 79, title: 'Organized Creativity' },
        'ESFJ-ISTP': { score: 78, title: 'Warm Practicality' },
        'ENFJ-INTP': { score: 77, title: 'Teaching Connection' },
        'ENTJ-ISFP': { score: 76, title: 'Leadership and Art' },
        'INTJ-ESFP': { score: 75, title: 'Logic Meets Joy' },
        
        // Moderate compatibility (55-69%)
        'INFP-INFP': { score: 69, title: 'Deep Understanding' },
        'ENFP-ENFP': { score: 68, title: 'Endless Energy' },
        'INTJ-INTJ': { score: 67, title: 'Strategic Minds' },
        'INFJ-INFJ': { score: 66, title: 'Soul Connection' },
        'ISTP-ISTP': { score: 65, title: 'Independent Together' },
        'ESTJ-ESTJ': { score: 64, title: 'Efficient Partnership' },
        'ISFJ-ISFJ': { score: 63, title: 'Caring Support' },
        'ENTP-ENTP': { score: 62, title: 'Innovative Chaos' },
        'ESFP-ESFP': { score: 61, title: 'Life of the Party' },
        'ISFP-ISFP': { score: 60, title: 'Artistic Harmony' },
        'ESFJ-ESFJ': { score: 59, title: 'Social Butterflies' },
        'ESTP-ESTP': { score: 58, title: 'Adventure Seekers' },
        'INTP-INTP': { score: 57, title: 'Analytical Minds' },
        'ENFJ-ENFJ': { score: 56, title: 'Inspiring Leaders' },
        'ISTJ-ISTJ': { score: 55, title: 'Reliable Foundation' },
        'ENTJ-ENTJ': { score: 54, title: 'Power Couple' }
    };

    static getCompatibility(type1, type2) {
        const key1 = `${type1}-${type2}`;
        const key2 = `${type2}-${type1}`;
        
        let compatibility = this.compatibilityMatrix[key1] || this.compatibilityMatrix[key2];
        
        if (!compatibility) {
            // Calculate compatibility for unlisted pairs
            compatibility = this.calculateCompatibility(type1, type2);
        }
        
        return {
            score: compatibility.score,
            title: compatibility.title,
            description: this.getCompatibilityDescription(type1, type2, compatibility.score),
            strengths: this.getStrengths(type1, type2),
            challenges: this.getChallenges(type1, type2),
            tips: this.getTips(type1, type2)
        };
    }

    static calculateCompatibility(type1, type2) {
        let score = 50; // Base compatibility
        
        // Compare each dimension
        if (type1[0] !== type2[0]) score += 10; // E/I difference is often good
        if (type1[1] === type2[1]) score += 15; // Same N/S is helpful
        if (type1[2] !== type2[2]) score += 5;  // F/T difference can be complementary
        if (type1[3] !== type2[3]) score += 10; // P/J difference often works well
        
        // Same type bonus
        if (type1 === type2) score += 20;
        
        return {
            score: Math.min(score, 95),
            title: score >= 80 ? 'Great Match' : score >= 65 ? 'Good Compatibility' : 'Average Match'
        };
    }

    static getCompatibilityDescription(type1, type2, score) {
        if (score >= 90) {
            return `${type1} and ${type2} form an exceptional partnership with natural understanding and complementary strengths. This pairing often leads to deep, fulfilling relationships built on mutual respect and growth.`;
        } else if (score >= 75) {
            return `${type1} and ${type2} have strong compatibility with good potential for a lasting relationship. While there may be some differences to navigate, these often become sources of mutual learning and growth.`;
        } else if (score >= 60) {
            return `${type1} and ${type2} can build a solid relationship with understanding and effort. Success depends on appreciating each other's differences and finding common ground in shared values.`;
        } else {
            return `${type1} and ${type2} may face some challenges but can succeed with patience and communication. Focus on understanding each other's perspectives and finding creative ways to bridge differences.`;
        }
    }

    static getStrengths(type1, type2) {
        const strengths = [
            'Complementary perspectives enhance problem-solving',
            'Different strengths create a well-rounded partnership',
            'Opportunities for mutual growth and learning',
            'Balance between similarities and differences'
        ];
        
        // Add specific strengths based on type combinations
        if (this.isIntuitiveFeeling(type1) && this.isIntuitiveFeeling(type2)) {
            strengths.push('Deep emotional connection and understanding');
        }
        if (this.isSensingThinking(type1) && this.isSensingThinking(type2)) {
            strengths.push('Practical approach to relationship challenges');
        }
        
        return strengths;
    }

    static getChallenges(type1, type2) {
        const challenges = [
            'Different communication styles may require patience',
            'Varying approaches to decision-making',
            'Different energy levels and social needs',
            'Potential misunderstandings without clear communication'
        ];
        
        // Add specific challenges
        if (this.isExtravert(type1) && this.isIntrovert(type2)) {
            challenges.push('Balancing social energy and alone time needs');
        }
        if (this.isJudging(type1) && this.isPerceiving(type2)) {
            challenges.push('Different preferences for structure and spontaneity');
        }
        
        return challenges;
    }

    static getTips(type1, type2) {
        return [
            'Practice active listening and validate each other\'s perspectives',
            'Appreciate the unique strengths each person brings',
            'Communicate needs and expectations clearly',
            'Find activities that appeal to both personality preferences',
            'Give each other space to be authentic',
            'Focus on shared values and common goals'
        ];
    }

    static getDatingStyles() {
        const lang = currentLanguage || 'en';
        
        if (lang === 'ko') {
            return {
                'INTJ': {
                    title: '전략적 로맨티스트',
                    approach: '장기적인 목표를 염두에 두고 데이트에 접근합니다. 지적 연결과 미래에 대한 공유된 비전을 중요하게 생각합니다.',
                    communication: '직접적이고 정직한 소통. 잡담보다는 깊고 의미 있는 대화를 선호합니다.',
                    values: '지성, 독립성, 충성심, 개인적 성장.',
                    redFlags: '소유욕, 반지성주의, 야망 부족, 감정적 조작.'
                },
                'INTP': {
                    title: '지적 탐험가',
                    approach: '호환성과 감정적 연결을 분석하는 데 시간을 보냅니다. 정신적 자극과 이해를 중요하게 생각합니다.',
                    communication: '사려 깊고 분석적. 아이디어와 이론적 토론을 즐깁니다.',
                    values: '지성, 창의성, 독립성, 진정한 표현.',
                    redFlags: '감정적 의존성, 편견, 빠른 약속에 대한 압박.'
                },
                'ENFP': {
                    title: '활기찬 영감가',
                    approach: '사랑에서 열정적이고 자발적입니다. 관계에 기쁨과 모험을 가져다줍니다.',
                    communication: '표현력이 풍부하고 열정적입니다. 꿈과 가능성을 공유하는 것을 좋아합니다.',
                    values: '자유, 진정성, 모험, 감정적 연결.',
                    redFlags: '통제하는 행동, 비관주의, 열정 억압.'
                },
                'INFJ': {
                    title: '직관적 이상주의자',
                    approach: '깊고 의미 있는 연결을 추구합니다. 감정적 친밀감과 공유된 가치를 중시합니다.',
                    communication: '공감적이고 통찰력이 있습니다. 진심어린 대화를 선호합니다.',
                    values: '진정성, 감정적 깊이, 개인적 성장, 조화.',
                    redFlags: '피상적임, 부정직함, 감정적 무관심, 공감 부족.'
                }
            };
        } else if (lang === 'ja') {
            return {
                'INTJ': {
                    title: '戦略的ロマンティスト',
                    approach: '長期的な目標を念頭に置いてデートにアプローチします。知的つながりと将来への共有ビジョンを重視します。',
                    communication: '直接的で正直なコミュニケーション。雑談よりも深く意味のある会話を好みます。',
                    values: '知性、独立性、忠誠心、個人的成長。',
                    redFlags: '所有欲、反知性主義、野心の欠如、感情的操作。'
                },
                'INTP': {
                    title: '知的探検家',
                    approach: '相性と感情的つながりを分析するのに時間をかけます。精神的刺激と理解を重視します。',
                    communication: '思慮深く分析的。アイデアや理論的議論を楽しみます。',
                    values: '知性、創造性、独立性、真正な表現。',
                    redFlags: '感情的依存、閉鎖的思考、迅速なコミットメントへの圧力。'
                },
                'ENFP': {
                    title: '精神的なインスピレーター',
                    approach: '恋愛において熱狂的で自発的。関係に喜びと冒険をもたらします。',
                    communication: '表現豊かで情熱的。夢や可能性を共有することを愛します。',
                    values: '自由、真正性、冒険、感情的つながり。',
                    redFlags: '支配的行動、悲観主義、熱意の抑制。'
                },
                'INFJ': {
                    title: '直感的理想主義者',
                    approach: '深く意味のあるつながりを求めます。感情的親密さと共有価値を重視します。',
                    communication: '共感的で洞察力があります。心からの会話を好みます。',
                    values: '真正性、感情的深さ、個人的成長、調和。',
                    redFlags: '表面性、不誠実、感情的無関心、共感の欠如。'
                }
            };
        }
        
        // Default English version
        return {
            'INTJ': {
                title: 'The Strategic Romantic',
                approach: 'Approaches dating with long-term goals in mind. Values intellectual connection and shared vision for the future.',
                communication: 'Direct and honest communication. Prefers deep, meaningful conversations over small talk.',
                values: 'Intelligence, independence, loyalty, and personal growth.',
                redFlags: 'Possessiveness, anti-intellectualism, lack of ambition, or emotional manipulation.'
            },
            'INTP': {
                title: 'The Intellectual Explorer',
                approach: 'Takes time to analyze compatibility and emotional connection. Values mental stimulation and understanding.',
                communication: 'Thoughtful and analytical. Enjoys exploring ideas and theoretical discussions.',
                values: 'Intelligence, creativity, independence, and authentic expression.',
                redFlags: 'Emotional neediness, close-mindedness, or pressure for quick commitment.'
            },
            'ENTJ': {
                title: 'The Ambitious Leader',
                approach: 'Confident and goal-oriented in relationships. Seeks an equal partner who shares their drive.',
                communication: 'Direct and efficient. Appreciates partners who can challenge them intellectually.',
                values: 'Ambition, competence, loyalty, and mutual respect.',
                redFlags: 'Laziness, dishonesty, lack of goals, or emotional instability.'
            },
            'ENTP': {
                title: 'The Enthusiastic Innovator',
                approach: 'Brings energy and creativity to relationships. Enjoys exploring possibilities together.',
                communication: 'Engaging and playful. Loves debates and intellectual sparring.',
                values: 'Creativity, freedom, intellectual stimulation, and growth.',
                redFlags: 'Controlling behavior, routine without variety, or suppression of their ideas.'
            },
            'INFJ': {
                title: 'The Intuitive Idealist',
                approach: 'Seeks deep, meaningful connections. Values emotional intimacy and shared values.',
                communication: 'Empathetic and insightful. Prefers heart-to-heart conversations.',
                values: 'Authenticity, emotional depth, personal growth, and harmony.',
                redFlags: 'Superficiality, dishonesty, emotional unavailability, or lack of empathy.'
            },
            'INFP': {
                title: 'The Authentic Dreamer',
                approach: 'Romantic and idealistic about love. Seeks a soulmate connection.',
                communication: 'Gentle and understanding. Values emotional expression and validation.',
                values: 'Authenticity, creativity, personal values alignment, and emotional connection.',
                redFlags: 'Criticism of their values, emotional coldness, or controlling behavior.'
            },
            'ENFJ': {
                title: 'The Caring Mentor',
                approach: 'Nurturing and supportive in relationships. Focuses on partner\'s growth and happiness.',
                communication: 'Warm and encouraging. Excellent at reading emotional needs.',
                values: 'Harmony, personal growth, emotional connection, and making a difference.',
                redFlags: 'Selfishness, emotional unavailability, or resistance to personal development.'
            },
            'ENFP': {
                title: 'The Spirited Inspiration',
                approach: 'Enthusiastic and spontaneous in love. Brings joy and adventure to relationships.',
                communication: 'Expressive and passionate. Loves sharing dreams and possibilities.',
                values: 'Freedom, authenticity, adventure, and emotional connection.',
                redFlags: 'Controlling behavior, pessimism, or suppression of their enthusiasm.'
            },
            'ISTJ': {
                title: 'The Loyal Traditionalist',
                approach: 'Serious and committed to relationships. Values stability and long-term partnership.',
                communication: 'Reliable and consistent. Shows love through actions and dedication.',
                values: 'Loyalty, stability, tradition, and practical support.',
                redFlags: 'Unreliability, recklessness, dishonesty, or constant need for change.'
            },
            'ISFJ': {
                title: 'The Devoted Protector',
                approach: 'Caring and selfless in relationships. Puts partner\'s needs first.',
                communication: 'Gentle and supportive. Expresses care through thoughtful gestures.',
                values: 'Loyalty, harmony, service to others, and emotional security.',
                redFlags: 'Selfishness, emotional coldness, criticism, or taking their care for granted.'
            },
            'ESTJ': {
                title: 'The Dependable Leader',
                approach: 'Traditional and responsible in relationships. Values commitment and partnership.',
                communication: 'Direct and practical. Shows love through providing and protecting.',
                values: 'Loyalty, responsibility, tradition, and mutual support.',
                redFlags: 'Irresponsibility, dishonesty, lack of commitment, or constant conflict.'
            },
            'ESFJ': {
                title: 'The Harmonious Host',
                approach: 'Warm and social in relationships. Creates harmony and brings people together.',
                communication: 'Supportive and affirming. Values emotional expression and connection.',
                values: 'Harmony, family, social connection, and emotional support.',
                redFlags: 'Conflict-seeking, social isolation, emotional coldness, or criticism.'
            },
            'ISTP': {
                title: 'The Independent Craftsperson',
                approach: 'Practical and independent in love. Values personal space and freedom.',
                communication: 'Action-oriented rather than verbal. Shows care through helpful acts.',
                values: 'Freedom, competence, practicality, and mutual respect.',
                redFlags: 'Clinginess, emotional demands, controlling behavior, or constant socializing.'
            },
            'ISFP': {
                title: 'The Gentle Artist',
                approach: 'Sensitive and caring in relationships. Values harmony and personal expression.',
                communication: 'Gentle and non-confrontational. Expresses love through creative gestures.',
                values: 'Harmony, authenticity, beauty, and emotional connection.',
                redFlags: 'Harshness, criticism, conflict, or suppression of their creativity.'
            },
            'ESTP': {
                title: 'The Adventurous Entertainer',
                approach: 'Fun-loving and spontaneous in relationships. Brings excitement and energy.',
                communication: 'Direct and energetic. Prefers action over extensive discussion.',
                values: 'Adventure, freedom, fun, and living in the moment.',
                redFlags: 'Over-planning, pessimism, restriction of freedom, or constant seriousness.'
            },
            'ESFP': {
                title: 'The Enthusiastic Supporter',
                approach: 'Warm and spontaneous in love. Values fun, connection, and shared experiences.',
                communication: 'Expressive and encouraging. Shows love through enthusiasm and support.',
                values: 'Fun, harmony, personal connection, and positive experiences.',
                redFlags: 'Negativity, criticism, restriction, or emotional coldness.'
            }
        };
    }

    static getIdealMatches(type) {
        const matches = {
            'INTJ': [
                { type: 'ENFP', percentage: 89, reason: 'ENFP\'s enthusiasm balances INTJ\'s intensity, creating innovative partnerships.' },
                { type: 'ENTP', percentage: 85, reason: 'Both enjoy intellectual discussions and strategic thinking.' },
                { type: 'INFP', percentage: 82, reason: 'INFP\'s values align with INTJ\'s vision for the future.' }
            ],
            'INTP': [
                { type: 'ENFJ', percentage: 87, reason: 'ENFJ provides emotional support while respecting INTP\'s independence.' },
                { type: 'ENTJ', percentage: 84, reason: 'Complementary thinking styles create effective partnerships.' },
                { type: 'INFJ', percentage: 81, reason: 'Both value deep understanding and intellectual connection.' }
            ],
            'ENTJ': [
                { type: 'INFP', percentage: 94, reason: 'INFP\'s idealism inspires ENTJ\'s vision while ENTJ provides structure.' },
                { type: 'ISFP', percentage: 76, reason: 'ISFP\'s gentleness balances ENTJ\'s intensity.' },
                { type: 'INTP', percentage: 84, reason: 'Both appreciate competence and intellectual challenge.' }
            ],
            'ENTP': [
                { type: 'INFJ', percentage: 96, reason: 'INFJ provides depth and insight to ENTP\'s innovative ideas.' },
                { type: 'INTJ', percentage: 85, reason: 'Both enjoy strategic thinking and future planning.' },
                { type: 'ISFJ', percentage: 78, reason: 'ISFJ provides stability and care for ENTP\'s adventures.' }
            ],
            'INFJ': [
                { type: 'ENFP', percentage: 98, reason: 'Perfect balance of intuition, emotion, and complementary energy levels.' },
                { type: 'ENTP', percentage: 96, reason: 'ENTP brings excitement while INFJ provides emotional depth.' },
                { type: 'INTJ', percentage: 88, reason: 'Both value depth and long-term vision.' }
            ],
            'INFP': [
                { type: 'ENFJ', percentage: 95, reason: 'ENFJ nurtures INFP\'s potential while sharing their values.' },
                { type: 'ENTJ', percentage: 94, reason: 'ENTJ provides structure for INFP\'s idealistic visions.' },
                { type: 'ISFJ', percentage: 79, reason: 'Both value harmony and caring relationships.' }
            ],
            'ENFJ': [
                { type: 'INFP', percentage: 95, reason: 'INFP\'s authenticity aligns with ENFJ\'s desire to help others grow.' },
                { type: 'ISFP', percentage: 82, reason: 'Both value harmony and personal growth.' },
                { type: 'INTP', percentage: 87, reason: 'INTP appreciates ENFJ\'s emotional intelligence and support.' }
            ],
            'ENFP': [
                { type: 'INFJ', percentage: 98, reason: 'Ideal balance of energy, intuition, and emotional depth.' },
                { type: 'INTJ', percentage: 89, reason: 'INTJ provides focus for ENFP\'s many ideas and possibilities.' },
                { type: 'ISFJ', percentage: 80, reason: 'ISFJ provides stability for ENFP\'s enthusiasm.' }
            ],
            'ISTJ': [
                { type: 'ESFP', percentage: 92, reason: 'ESFP brings fun and spontaneity to ISTJ\'s structured life.' },
                { type: 'ESTP', percentage: 83, reason: 'ESTP adds adventure while appreciating ISTJ\'s reliability.' },
                { type: 'ENFP', percentage: 75, reason: 'ENFP encourages ISTJ to explore new possibilities.' }
            ],
            'ISFJ': [
                { type: 'ESTP', percentage: 88, reason: 'ESTP brings excitement while ISFJ provides caring support.' },
                { type: 'ESFP', percentage: 85, reason: 'Both value harmony and caring for others.' },
                { type: 'ENFP', percentage: 80, reason: 'ENFP appreciates ISFJ\'s loyalty and care.' }
            ],
            'ESTJ': [
                { type: 'ISFP', percentage: 86, reason: 'ISFP\'s creativity and gentleness balance ESTJ\'s directness.' },
                { type: 'ISTP', percentage: 79, reason: 'Both appreciate practical solutions and competence.' },
                { type: 'INFP', percentage: 74, reason: 'INFP\'s values can inspire ESTJ\'s leadership.' }
            ],
            'ESFJ': [
                { type: 'ISTP', percentage: 90, reason: 'ISTP\'s independence balances ESFJ\'s desire to care for others.' },
                { type: 'ISFP', percentage: 83, reason: 'Both value harmony and caring relationships.' },
                { type: 'INTP', percentage: 77, reason: 'INTP appreciates ESFJ\'s warmth and social skills.' }
            ],
            'ISTP': [
                { type: 'ESFJ', percentage: 90, reason: 'ESFJ provides emotional warmth while respecting ISTP\'s independence.' },
                { type: 'ESTJ', percentage: 79, reason: 'Both appreciate practical, results-oriented approaches.' },
                { type: 'ISFJ', percentage: 81, reason: 'ISFJ provides care without being overwhelming.' }
            ],
            'ISFP': [
                { type: 'ESTJ', percentage: 86, reason: 'ESTJ provides structure while appreciating ISFP\'s creativity.' },
                { type: 'ESFJ', percentage: 83, reason: 'Both value harmony and authentic expression.' },
                { type: 'ENFJ', percentage: 82, reason: 'ENFJ encourages ISFP\'s personal growth and creativity.' }
            ],
            'ESTP': [
                { type: 'ISFJ', percentage: 88, reason: 'ISFJ provides stability and care for ESTP\'s active lifestyle.' },
                { type: 'ISTJ', percentage: 83, reason: 'ISTJ appreciates ESTP\'s energy while providing grounding.' },
                { type: 'INFJ', percentage: 78, reason: 'INFJ provides depth and insight to ESTP\'s experiences.' }
            ],
            'ESFP': [
                { type: 'ISTJ', percentage: 92, reason: 'ISTJ provides stability while ESFP brings joy and spontaneity.' },
                { type: 'ISFJ', percentage: 85, reason: 'Both value harmony and caring for others.' },
                { type: 'INTJ', percentage: 75, reason: 'INTJ provides direction for ESFP\'s enthusiasm.' }
            ]
        };
        
        return matches[type] || [];
    }

    static getConversationStyles() {
        return {
            'Intuitive Types': [
                {
                    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
                    communication: 'Focus on concepts, future possibilities, and theoretical discussions. Enjoy debating ideas and exploring innovations.',
                    conflict: 'Address conflicts through logical analysis and strategic problem-solving. May need to remember to consider emotional aspects.',
                    tips: 'Engage them with big-picture thinking and avoid getting bogged down in details. Respect their need for intellectual stimulation.'
                },
                {
                    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
                    communication: 'Value emotional depth, personal meaning, and authentic expression. Prefer conversations that explore values and feelings.',
                    conflict: 'Approach conflicts with empathy and focus on understanding underlying needs and values. Seek harmonious resolutions.',
                    tips: 'Create safe spaces for emotional expression and validate their feelings. Focus on shared values and personal growth.'
                }
            ],
            'Sensing Types': [
                {
                    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
                    communication: 'Prefer concrete, practical discussions with clear examples. Value detailed information and step-by-step approaches.',
                    conflict: 'Address conflicts through practical solutions and clear communication. Appreciate structured approaches to problem-solving.',
                    tips: 'Provide specific examples and practical applications. Respect their need for stability and clear expectations.'
                },
                {
                    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
                    communication: 'Enjoy immediate, hands-on discussions. Prefer action-oriented conversations and real-world applications.',
                    conflict: 'Handle conflicts directly and practically. Focus on immediate solutions rather than long-term analysis.',
                    tips: 'Keep conversations practical and engaging. Allow for flexibility and spontaneous changes in direction.'
                }
            ]
        };
    }

    // Helper methods
    static isIntuitiveFeeling(type) {
        return type.includes('N') && type.includes('F');
    }

    static isSensingThinking(type) {
        return type.includes('S') && type.includes('T');
    }

    static isExtravert(type) {
        return type.startsWith('E');
    }

    static isIntrovert(type) {
        return type.startsWith('I');
    }

    static isJudging(type) {
        return type.endsWith('J');
    }

    static isPerceiving(type) {
        return type.endsWith('P');
    }
}

  
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
            alert('Please select both MBTI types.');
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