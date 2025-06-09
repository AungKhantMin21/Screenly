const { OpenAI } = require('openai');

const openai = new OpenAI({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

const analyzeResume = async (resumeText, jobDescription) => {
    const prompt = `
    You are a professional resume screening assistant.
    PLEASE FOLLOW THE OUTPUT FORMAT EXACTLY, WITH BOLD HEADERS AND LISTS. SECTIONS ARE OPTIONAL: include them only if there is content.

    **Match Score:** [score 0–100]

    **Short Summary:** [one or two sentences]

    **Strengths:**
    ${'* [strength]' ?? ''}

    **Weaknesses:**
    ${'* [weakness]' ?? ''}

    **Suggestions:**
    ${'* [suggestion]' ?? ''}

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}

    **IMPORTANT INSTRUCTIONS:**
    - :contentReference[oaicite:1]{index=1}
    - :contentReference[oaicite:2]{index=2}
    - :contentReference[oaicite:3]{index=3}
    `;

    const response = await openai.chat.completions.create({
        model: 'meta-llama/Llama-Vision-Free',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });

    return response.choices[0].message.content;
}

module.exports = {
    analyzeResume
}