// Tool Data and Functions
const tools = {
    rewriter: {
        title: "AI Paragraph Rewriter",
        description: "Rewrite paragraph using synonyms and sentence reshaping",
        icon: "fa-sync-alt",
        function: rewriteParagraph
    },
    shortener: {
        title: "Sentence Shortener",
        description: "Shorten text without changing meaning",
        icon: "fa-compress-alt",
        function: shortenSentences
    },
    grammar: {
        title: "Grammar Checker",
        description: "Detect and highlight basic grammar mistakes",
        icon: "fa-check-double",
        function: checkGrammar
    },
    plagiarism: {
        title: "Plagiarism Checker",
        description: "Show simulated originality percentage",
        icon: "fa-search",
        function: checkPlagiarism
    },
    email: {
        title: "AI Email Writer",
        description: "Generate professional email format",
        icon: "fa-envelope",
        function: generateEmail
    },
    bio: {
        title: "AI Bio Generator",
        description: "Generate short professional bio",
        icon: "fa-user-tie",
        function: generateBio
    },
    caption: {
        title: "AI Caption Generator",
        description: "Generate Instagram & LinkedIn captions",
        icon: "fa-hashtag",
        function: generateCaption
    }
};

// DOM Elements
let currentTool = 'rewriter';
const modal = document.getElementById('tool-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalInput = document.getElementById('modal-input');
const modalOutput = document.getElementById('modal-output');
const modalCharCount = document.getElementById('modal-char-count');
const modalToolInfo = document.getElementById('modal-tool-info');
const modalGenerateBtn = document.getElementById('modal-generate-btn');
const modalClearBtn = document.getElementById('modal-clear-btn');
const modalCopyBtn = document.getElementById('modal-copy-btn');
const closeBtn = document.querySelector('.close-btn');
const cardBtns = document.querySelectorAll('.card-btn');
const loadingSpinner = document.querySelector('.loading-spinner');
const btnText = document.querySelector('.btn-text');

// Auth Modal Elements
const authModal = document.getElementById('auth-modal');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const authCloseBtn = authModal.querySelector('.close-btn');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const authSwitchText = document.getElementById('auth-switch-text');
const authSwitchLink = document.getElementById('auth-switch-link');
const authSubmitBtn = document.getElementById('auth-submit-btn');

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Tool Functions
function rewriteParagraph(text) {
    const sentences = text.split('. ').filter(s => s.trim());
    const synonyms = {
        'very': ['extremely', 'incredibly', 'particularly'],
        'good': ['excellent', 'superb', 'outstanding'],
        'important': ['crucial', 'vital', 'essential'],
        'beautiful': ['stunning', 'gorgeous', 'breathtaking'],
        'interesting': ['fascinating', 'compelling', 'engaging'],
        'big': ['large', 'substantial', 'considerable'],
        'small': ['compact', 'modest', 'petite'],
        'smart': ['intelligent', 'brilliant', 'clever'],
        'happy': ['delighted', 'joyful', 'pleased'],
        'sad': ['unfortunate', 'disheartening', 'melancholy'],
        'amazing': ['astonishing', 'remarkable', 'extraordinary'],
        'quick': ['rapid', 'speedy', 'swift'],
        'simple': ['straightforward', 'uncomplicated', 'elementary']
    };
    
    let rewritten = sentences.map(sentence => {
        let words = sentence.split(' ');
        words = words.map(word => {
            const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
            if (synonyms[cleanWord]) {
                const randomSynonym = synonyms[cleanWord][Math.floor(Math.random() * synonyms[cleanWord].length)];
                return word.charAt(0) === word.charAt(0).toUpperCase() 
                    ? randomSynonym.charAt(0).toUpperCase() + randomSynonym.slice(1)
                    : randomSynonym;
            }
            return word;
        });
        
        const structures = [
            words => words.join(' '),
            words => words.slice(1).concat(words[0]).join(' '),
            words => 'Moreover, ' + words.join(' '),
            words => 'In essence, ' + words.join(' '),
            words => 'Therefore, ' + words.join(' '),
            words => 'Consequently, ' + words.join(' ')
        ];
        
        const structure = structures[Math.floor(Math.random() * structures.length)];
        return structure(words);
    }).join('. ');
    
    return rewritten.charAt(0).toUpperCase() + rewritten.slice(1) + (rewritten.endsWith('.') ? '' : '.');
}

function shortenSentences(text) {
    const sentences = text.split('. ').filter(s => s.trim());
    const shortened = sentences.map(sentence => {
        const words = sentence.split(' ');
        if (words.length <= 8) return sentence;
        
        const connectors = ['and', 'but', 'or', 'so', 'because', 'although', 'while', 'however'];
        const unimportant = ['very', 'really', 'quite', 'somewhat', 'rather', 'just', 'actually', 'basically'];
        
        const importantWords = words.filter(word => {
            const lower = word.toLowerCase().replace(/[^\w]/g, '');
            return !connectors.includes(lower) && !unimportant.includes(lower) && lower.length > 2;
        });
        
        return importantWords.slice(0, 8).join(' ') + '.';
    }).join(' ');
    
    return shortened;
}

function checkGrammar(text) {
    const commonMistakes = [
        { pattern: /\byour\b/gi, correction: 'you\'re', type: 'Common Mistake' },
        { pattern: /\btheir\b/gi, correction: 'they\'re', type: 'Common Mistake' },
        { pattern: /\bits\b/gi, correction: 'it\'s', type: 'Common Mistake' },
        { pattern: /\balot\b/gi, correction: 'a lot', type: 'Spelling' },
        { pattern: /\bcould of\b/gi, correction: 'could have', type: 'Grammar' },
        { pattern: /\bshould of\b/gi, correction: 'should have', type: 'Grammar' },
        { pattern: /\bwould of\b/gi, correction: 'would have', type: 'Grammar' },
        { pattern: /\baffect\b/gi, correction: 'effect', type: 'Confusion' },
        { pattern: /\bloose\b/gi, correction: 'lose', type: 'Spelling' },
        { pattern: /\bthan\b/gi, correction: 'then', type: 'Confusion' },
        { pattern: /\btheir\b/gi, correction: 'there', type: 'Confusion' }
    ];
    
    let highlighted = text;
    const mistakes = [];
    
    commonMistakes.forEach((mistake, index) => {
        if (mistake.pattern.test(text)) {
            const matches = text.match(mistake.pattern);
            if (matches) {
                highlighted = highlighted.replace(mistake.pattern, 
                    `<span class="highlight mistake-${index}">${mistake.correction}</span>`);
                mistakes.push({
                    type: mistake.type,
                    original: matches[0],
                    correction: mistake.correction
                });
            }
        }
    });
    
    modalToolInfo.innerHTML = mistakes.length > 0 
        ? `<strong>Found ${mistakes.length} potential issue${mistakes.length > 1 ? 's' : ''}:</strong> ` +
          mistakes.map(m => `${m.type}: "${m.original}" → "${m.correction}"`).join(', ')
        : '<strong>✓ Great job!</strong> No grammar issues found.';
    
    return highlighted;
}

function checkPlagiarism(text) {
    const words = text.split(' ').filter(w => w.trim().length > 0);
    const originality = Math.min(98, Math.max(60, 75 + (words.length / 200) + (Math.random() * 15)));
    const uniqueScore = (Math.random() * 15 + 80).toFixed(1);
    
    const originalityPercent = originality.toFixed(1);
    const uniquePercent = uniqueScore;
    
    modalToolInfo.innerHTML = `
        <div class="plagiarism-results">
            <div class="result-item">
                <strong>Originality Score:</strong> ${originalityPercent}%
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${originalityPercent}%"></div>
                </div>
            </div>
            <div class="result-item">
                <strong>Unique Content:</strong> ${uniquePercent}%
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${uniquePercent}%"></div>
                </div>
            </div>
            <div class="result-item">
                <strong>Words Analyzed:</strong> ${words.length}
            </div>
            <div class="result-note">
                <i class="fas fa-info-circle"></i> This is a simulated result for demonstration purposes.
            </div>
        </div>
    `;
    
    return `Based on our analysis, your text shows ${originalityPercent}% originality. 
            This indicates the content is ${originality > 85 ? 'highly original' : originality > 70 ? 'moderately original' : 'somewhat original'}. 
            The unique content score of ${uniquePercent}% suggests minimal overlap with existing sources.`;
}

function generateEmail(text) {
    const prompt = text.toLowerCase();
    let emailTemplate;
    
    if (prompt.includes('job') || prompt.includes('application') || prompt.includes('resume')) {
        emailTemplate = `Subject: Job Application - [Your Name] for [Position Name]

Dear [Hiring Manager Name],

I am writing to express my keen interest in the [Position Name] position at [Company Name], which I discovered through [Source]. ${text}

My background in [Your Field] and experience with [Key Skill] align perfectly with the requirements for this role. I have attached my resume for your review, which provides further detail about my qualifications.

I am particularly impressed by [Something Specific About Company] and would be thrilled to contribute to your team's success. I am confident that my skills in [Skill 1] and [Skill 2] would allow me to make valuable contributions from day one.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to [Company Name]'s continued success.

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn Profile URL]
[Your Portfolio/Website URL]`;
    } else if (prompt.includes('meeting') || prompt.includes('schedule') || prompt.includes('appointment')) {
        emailTemplate = `Subject: Meeting Request: ${text}

Dear [Recipient Name],

I hope this email finds you well. I'm writing to request a meeting to discuss ${text}.

I believe a conversation would be mutually beneficial, particularly regarding [Specific Topic]. Would you be available sometime next week?

Here are a few times that work for me:
- [Day 1], [Date] at [Time 1]
- [Day 2], [Date] at [Time 2]
- [Day 3], [Date] at [Time 3]

Please let me know what works best for your schedule, or suggest alternative times if none of these work for you. The meeting can be conducted via [Platform: Zoom/Teams/etc.] or in-person if preferred.

Looking forward to connecting with you.

Kind regards,
[Your Name]
[Your Position]
[Your Company]
[Your Contact Information]`;
    } else if (prompt.includes('complaint') || prompt.includes('issue') || prompt.includes('problem')) {
        emailTemplate = `Subject: Regarding ${text}

Dear [Company/Department Name],

I am writing to bring to your attention an issue I have encountered regarding ${text}.

[Describe the issue in detail with specific examples, dates, and any relevant reference numbers]

This matter has caused [explain the impact or inconvenience]. I would appreciate it if you could [state what you want them to do] to resolve this situation.

I trust that you will address this matter promptly and look forward to your response. Please feel free to contact me at [Your Phone Number] or reply to this email if you require any additional information.

Thank you for your attention to this matter.

Sincerely,
[Your Name]
[Your Account/Reference Number if applicable]
[Your Contact Information]`;
    } else {
        const templates = [
            `Subject: Inquiry About ${text}

Dear [Recipient Name],

I hope this message finds you well. I'm reaching out regarding ${text}.

[Add more specific details or questions here]

I would greatly appreciate any insights or information you could provide on this matter.

Thank you for your time and consideration.

Best regards,
[Your Name]
[Your Position/Organization]
[Your Contact Information]`,

            `Subject: Follow-up: ${text}

Hello [Name],

Just following up on our previous conversation about ${text}.

[Add specific follow-up points or questions]

Looking forward to hearing from you.

Warm regards,
[Your Name]`,

            `Subject: Professional Inquiry: ${text}

Dear [Title] [Last Name],

I am writing to inquire about ${text}. 

[Provide context or background information]

I believe this aligns with [shared interest/goal] and would value the opportunity to learn more.

Thank you for your consideration.

Respectfully,
[Your Name]
[Your Affiliation]`
        ];
        
        emailTemplate = templates[Math.floor(Math.random() * templates.length)];
    }
    
    return emailTemplate;
}

function generateBio(text) {
    const keywords = text.split(' ').filter(w => w.length > 3).slice(0, 5);
    const templates = [
        `🌟 Passionate ${keywords[0] || 'professional'} with expertise in ${keywords.slice(0, 2).join(' and ') || 'innovative solutions'}. Dedicated to delivering exceptional results through creative problem-solving and strategic thinking. Committed to continuous learning and professional growth.

🎯 Key Skills:
• ${keywords[0] || 'Strategic Planning'}
• ${keywords[1] || 'Project Management'}
• ${keywords[2] || 'Team Leadership'}
• ${keywords[3] || 'Creative Solutions'}

🏆 Achievements:
• Successfully [mention an achievement]
• Recognized for [mention recognition]
• Contributed to [mention contribution]

📍 Available for: Freelance projects, consulting opportunities, speaking engagements
📧 Open to collaborations and new opportunities
🚀 Always learning, always growing`,

        `👨‍💼 Experienced ${keywords[0] || 'specialist'} with ${Math.floor(Math.random() * 10) + 5}+ years in ${keywords[1] || 'the industry'}. Proven track record of success in ${keywords[2] || 'driving results'} through innovative approaches and data-driven strategies.

💼 Professional Focus:
• ${keywords[0] || 'Business Development'}
• ${keywords[1] || 'Client Relations'}
• ${keywords[2] || 'Process Optimization'}
• ${keywords[3] || 'Performance Metrics'}

🏢 Previous Roles: 
• [Previous Position 1] at [Company 1]
• [Previous Position 2] at [Company 2]
• [Previous Position 3] at [Company 3]

🎓 Education: [Your Degree] from [Your University]

🔗 Connect with me to discuss ${keywords[0] || 'opportunities'} and ${keywords[1] || 'collaborations'}!`,

        `✨ ${text.charAt(0).toUpperCase() + text.slice(1)} Enthusiast | Professional | Innovator

With a deep passion for ${text.toLowerCase()} and years of hands-on experience, I specialize in transforming ideas into impactful solutions. My approach combines technical expertise with creative thinking to deliver outstanding results.

🌐 What I Bring:
• Strategic vision for ${keywords[0] || 'growth'}
• Technical proficiency in ${keywords[1] || 'key areas'}
• Leadership in ${keywords[2] || 'team development'}
• Excellence in ${keywords[3] || 'project execution'}

📈 Recent Success:
• Increased [metric] by [percentage]%
• Led [project type] with [result]
• Recognized for [achievement]

🤝 Let's Connect:
Open to meaningful conversations about ${keywords.slice(0, 2).join(' and ') || 'new opportunities'}. Always interested in learning from others and sharing knowledge.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

function generateCaption(text) {
    const platforms = {
        instagram: [
            `✨ ${text} ✨

Turn on post notifications so you never miss a post! 🔔

Double tap if you agree! ❤️

Tag someone who needs to see this 👇

#inspiration #motivation #dailyquotes #${text.split(' ')[0] || 'inspire'} #positivevibes #mindset #success #growth #life #quoteoftheday`,

            `🌟 ${text.charAt(0).toUpperCase() + text.slice(1)} 🌟

Sometimes the smallest step in the right direction ends up being the biggest step of your life. 

📸 Credit: [Tag photographer/creator]

Save this for later! 🔖
Share with a friend! 👥

Follow for more inspiring content! 👉 @username

#${text.split(' ').slice(0, 3).join('') || 'inspiration'} #thoughts #life #wisdom #success #mindset #growth #personaldevelopment #motivationmonday`,

            `💭 ${text}

The only limit to your impact is your imagination and commitment.

👇 Drop a comment below with your thoughts!

Like this post if it resonated with you! 👍

Follow @username for daily inspiration!

#${text.split(' ')[0] || 'thoughts'} #reflection #selfimprovement #personaldevelopment #mindfulness #success #growthmindset #inspirationalquotes #positiveenergy`
        ],
        linkedin: [
            `Reflecting on: "${text}"

In today's rapidly evolving professional landscape, this serves as a powerful reminder of what truly matters. 

As professionals, we're constantly navigating challenges and opportunities. This perspective has been particularly valuable in my recent work on [mention project or initiative].

Key takeaways:
1. [Insight 1 related to text]
2. [Insight 2 related to text]
3. [Actionable advice]

I'd love to hear your thoughts on this. How does this resonate with your professional journey? What strategies have you found effective?

#professionalgrowth #careerdevelopment #leadership #businessstrategy #innovation #success #careeradvice #networking #${text.split(' ')[0] || 'business'}`,

            `Thought-provoking insight: ${text}

This concept has significantly influenced my approach to [your field/work]. In an era of constant change, understanding [text concept] becomes increasingly crucial.

From my experience working with [mention companies/teams], I've observed that professionals who embrace this mindset tend to achieve [mention positive outcomes].

Three practical applications:
1. [Application 1]
2. [Application 2]
3. [Application 3]

What are your experiences with this concept? I'm curious to learn different perspectives.

Share your thoughts in the comments below! 👇

#business #success #motivation #entrepreneurship #management #strategy #professionaldevelopment #learning #${text.split(' ').slice(0, 2).join('') || 'industryinsights'}`,

            `Key takeaway from recent experience: ${text}

A valuable reminder for professionals at all stages of their career journey. Whether you're just starting out or leading teams, this principle remains relevant.

In my role as [your position], applying this approach has helped [mention achievement or outcome]. The results have been remarkable, particularly in areas like [specific area].

Why this matters:
• [Reason 1]
• [Reason 2]
• [Reason 3]

I believe sharing these insights helps us grow collectively as a professional community. What lessons have you learned recently that transformed your approach?

Let's continue the conversation in the comments!

#networking #development #skills #careeradvice #professionalgrowth #businessstrategy #leadership #innovation #${text.split(' ')[0] || 'professional'} #linkedincommunity`
        ]
    };
    
    const instagramCaption = platforms.instagram[Math.floor(Math.random() * platforms.instagram.length)];
    const linkedinCaption = platforms.linkedin[Math.floor(Math.random() * platforms.linkedin.length)];
    
    return `📱 **INSTAGRAM CAPTION:**\n\n${instagramCaption}\n\n────────────────────\n\n💼 **LINKEDIN POST:**\n\n${linkedinCaption}`;
}

// Modal Functions
function openToolModal(toolId) {
    currentTool = toolId;
    const tool = tools[toolId];
    
    // Update modal content
    modalTitle.textContent = tool.title;
    modalDesc.textContent = tool.description;
    
    // Reset input and output
    modalInput.value = '';
    modalOutput.innerHTML = '<div class="placeholder">Your generated content will appear here...</div>';
    modalToolInfo.innerHTML = '';
    modalCharCount.textContent = '0';
    modalCharCount.style.color = '#6b7280';
    
    // Update placeholder based on tool
    modalInput.placeholder = getToolPlaceholder(toolId);
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on input
    setTimeout(() => {
        modalInput.focus();
    }, 300);
}

function getToolPlaceholder(toolId) {
    const placeholders = {
        rewriter: "Paste the paragraph you want to rewrite. Example: 'Artificial intelligence is transforming the way we work and live...'",
        shortener: "Enter text you want to shorten. Example: 'In today's fast-paced world, we often find ourselves overwhelmed with information...'",
        grammar: "Type or paste text to check grammar. Example: 'Their going to the store to buy there groceries.'",
        plagiarism: "Enter text to check originality. Example: 'Machine learning algorithms can analyze vast amounts of data...'",
        email: "Describe what you want to write about. Example: 'Follow-up email for a job interview at a tech company'",
        bio: "Enter your profession, skills, or interests. Example: 'Software developer with 5 years experience in JavaScript and React'",
        caption: "What's your post about? Example: 'Business success tips for entrepreneurs starting their journey'"
    };
    return placeholders[toolId] || "Enter your text here...";
}

function closeToolModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function processInput() {
    const input = modalInput.value.trim();
    
    if (!input) {
        modalOutput.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Please enter some text first.</div>';
        return;
    }
    
    if (input.length < 10) {
        modalOutput.innerHTML = '<div class="error"><i class="fas fa-exclamation-circle"></i> Please enter at least 10 characters for better results.</div>';
        return;
    }
    
    // Show loading state
    modalGenerateBtn.disabled = true;
    loadingSpinner.style.display = 'block';
    btnText.textContent = 'Processing...';
    
    // Simulate AI processing delay with realistic timing
    const processingTime = 1500 + Math.random() * 1000;
    
    setTimeout(() => {
        try {
            const tool = tools[currentTool];
            const result = tool.function(input);
            
            modalOutput.innerHTML = currentTool === 'grammar' ? result : result.replace(/\n/g, '<br>');
            
            // Add animation to output
            modalOutput.style.animation = 'none';
            setTimeout(() => {
                modalOutput.style.animation = 'fadeIn 0.5s ease';
            }, 10);
            
        } catch (error) {
            modalOutput.innerHTML = `<div class="error"><i class="fas fa-exclamation-triangle"></i> An error occurred: ${error.message}</div>`;
        }
        
        // Hide loading state
        modalGenerateBtn.disabled = false;
        loadingSpinner.style.display = 'none';
        btnText.textContent = 'Generate';
        
        // Scroll to output
        modalOutput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, processingTime);
}

// Auth Modal Functions
let isLoginMode = true;

function openAuthModal(mode = 'login') {
    isLoginMode = mode === 'login';
    updateAuthModal();
    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    authForm.reset();
}

function updateAuthModal() {
    if (isLoginMode) {
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Login to your account';
        authSubmitBtn.textContent = 'Sign In';
        authSwitchText.innerHTML = 'Don\'t have an account? <a href="#" id="auth-switch-link">Sign up</a>';
    } else {
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Join AI Writing Tools today';
        authSubmitBtn.textContent = 'Sign Up';
        authSwitchText.innerHTML = 'Already have an account? <a href="#" id="auth-switch-link">Sign in</a>';
    }
    
    // Update the event listener for the switch link
    const switchLink = document.getElementById('auth-switch-link');
    switchLink.onclick = (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        updateAuthModal();
    };
}

function handleAuthSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    if (!email || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showAuthMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAuthMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate authentication process
    authSubmitBtn.disabled = true;
    authSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    setTimeout(() => {
        // Simulate successful authentication
        showAuthMessage(isLoginMode ? 'Successfully logged in!' : 'Account created successfully!', 'success');
        
        // Reset form and close modal after success
        setTimeout(() => {
            authSubmitBtn.disabled = false;
            authSubmitBtn.innerHTML = isLoginMode ? 'Sign In' : 'Sign Up';
            closeAuthModal();
            
            // Update auth buttons to show logged in state
            if (isLoginMode) {
                loginBtn.innerHTML = '<i class="fas fa-user"></i> My Account';
                signupBtn.style.display = 'none';
                showNotification('Welcome back to AI Writing Tools!');
            }
        }, 1500);
    }, 2000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showAuthMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) existingMessage.remove();
    
    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `auth-message ${type}`;
    messageEl.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    // Insert message after form
    authForm.parentNode.insertBefore(messageEl, authForm.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.opacity = '0';
            setTimeout(() => {
                if (messageEl.parentNode) messageEl.remove();
            }, 300);
        }
    }, 5000);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Close button
    notification.querySelector('.notification-close').onclick = () => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 300);
    };
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
    }, 5000);
}

// Plan Selection
function handlePlanSelection(plan) {
    showNotification(`Selected ${plan} plan. This is a demo - in a real app, you would be redirected to checkout.`);
    
    // Simulate premium features
    if (plan === 'Desktop' || plan === 'Business') {
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => {
            card.classList.add('premium-highlight');
            setTimeout(() => {
                card.classList.remove('premium-highlight');
            }, 2000);
        });
    }
}

// Event Listeners
function initEventListeners() {
    // Card buttons
    cardBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const toolId = btn.dataset.tool;
            openToolModal(toolId);
        });
    });
    
    // Tool cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('card-btn')) {
                const toolId = card.dataset.tool;
                openToolModal(toolId);
            }
        });
    });
    
    // Character counter
    modalInput.addEventListener('input', () => {
        const count = modalInput.value.length;
        modalCharCount.textContent = count;
        
        // Change color based on length
        if (count > 2000) {
            modalCharCount.style.color = '#ef4444';
        } else if (count > 1000) {
            modalCharCount.style.color = '#f59e0b';
        } else {
            modalCharCount.style.color = '#6b7280';
        }
    });
    
    // Generate button
    modalGenerateBtn.addEventListener('click', processInput);
    
    // Clear button
    modalClearBtn.addEventListener('click', () => {
        modalInput.value = '';
        modalOutput.innerHTML = '<div class="placeholder">Your generated content will appear here...</div>';
        modalToolInfo.innerHTML = '';
        modalCharCount.textContent = '0';
        modalCharCount.style.color = '#6b7280';
    });
    
    // Copy button
    modalCopyBtn.addEventListener('click', () => {
        const text = modalOutput.textContent || modalOutput.innerText;
        if (text && !text.includes('Your generated content will appear here')) {
            navigator.clipboard.writeText(text).then(() => {
                const originalText = modalCopyBtn.innerHTML;
                modalCopyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                modalCopyBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    modalCopyBtn.innerHTML = originalText;
                    modalCopyBtn.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                modalCopyBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                modalCopyBtn.style.background = '#ef4444';
                
                setTimeout(() => {
                    modalCopyBtn.innerHTML = 'Copy';
                    modalCopyBtn.style.background = '';
                }, 2000);
            });
        }
    });
    
    // Close modal buttons
    closeBtn.addEventListener('click', closeToolModal);
    authCloseBtn.addEventListener('click', closeAuthModal);
    
    // Close modals when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeToolModal();
    });
    
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.style.display === 'block') closeToolModal();
            if (authModal.style.display === 'block') closeAuthModal();
        }
    });
    
    // Enter key to trigger generate (Ctrl+Enter or Cmd+Enter)
    modalInput.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            processInput();
        }
    });
    
    // Auth buttons
    loginBtn.addEventListener('click', () => openAuthModal('login'));
    signupBtn.addEventListener('click', () => openAuthModal('signup'));
    
    // Auth form submission
    authForm.addEventListener('submit', handleAuthSubmit);
    
    // Social auth buttons
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification(`This is a demo. In a real app, you would authenticate with ${btn.textContent.trim()}.`);
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Plan selection buttons
    document.querySelectorAll('.btn-plan-select').forEach((btn, index) => {
        const plans = ['Mobile', 'Desktop', 'Business'];
        btn.addEventListener('click', () => handlePlanSelection(plans[index]));
    });
    
    // Footer tool links
    document.querySelectorAll('.footer-links a[data-tool]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const toolId = link.dataset.tool;
            openToolModal(toolId);
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Smooth scroll to target
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    
    // Add CSS for additional styles
    const style = document.createElement('style');
    style.textContent = `
        .highlight {
            background-color: #fef3c7;
            padding: 2px 6px;
            border-radius: 4px;
            border-bottom: 2px solid #f59e0b;
            margin: 0 2px;
        }
        .error {
            color: #ef4444;
            padding: 1.5rem;
            background: #fee2e2;
            border-radius: 10px;
            border: 2px solid #fca5a5;
            text-align: center;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        .premium-highlight {
            animation: premiumPulse 2s ease;
            border-color: #f59e0b !important;
        }
        @keyframes premiumPulse {
            0%, 100% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); }
            50% { box-shadow: 0 20px 40px rgba(245, 158, 11, 0.3); }
        }
        .auth-message {
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 500;
            animation: fadeIn 0.3s ease;
        }
        .auth-message.success {
            background: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
        }
        .auth-message.error {
            background: #fee2e2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 400px;
            border-left: 4px solid #10b981;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification i {
            color: #10b981;
            font-size: 1.25rem;
        }
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6b7280;
            cursor: pointer;
            margin-left: auto;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .plagiarism-results {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .result-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .progress-bar {
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #34d399);
            border-radius: 4px;
            transition: width 1s ease;
        }
        .result-note {
            margin-top: 0.5rem;
            font-size: 0.875rem;
            color: #6b7280;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .tool-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .tool-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
    
    // Initialize auth modal
    updateAuthModal();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to AI Writing Tools! Try any of our 7 AI-powered writing tools.');
    }, 1000);
});