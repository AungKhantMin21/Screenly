const prisma = require('../db');
const { analyzeResume } = require('../services/openAiService');

exports.screenResume = async (req, res) => {
    try {
        const { resume, jobDescription } = req.body;

        const rawData = await analyzeResume(resume, jobDescription);

        console.log(rawData);

        // Helper function for parsing bullet sections
        function parseBulletSection(label) {
            const regex = new RegExp(`\\*\\*${label}:\\*\\*\\s*((?:\\n\\*.*?)+)(?=\\n\\*\\*|\\nResume:|$)`, 's');
            const match = rawData.match(regex);
            return match
                ? match[1]
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line.startsWith('* '))
                    .map(line => line.slice(2)) // remove "* "
                : [];
        }

        // Match Score
        const matchScoreMatch = rawData.match(/\*\*Match Score:\*\*\s*(\d+)/);
        const matchScore = matchScoreMatch ? parseInt(matchScoreMatch[1]) : null;

        // Summary
        const summaryMatch = rawData.match(/\*\*Short Summary:\*\*\s*([\s\S]*?)(?=\n\*\*|$)/);
        const summary = summaryMatch ? summaryMatch[1].trim() : '';

        // Bullet Sections
        const strengths = parseBulletSection('Strengths');
        const weaknesses = parseBulletSection('Weaknesses');
        const suggestions = parseBulletSection('Suggestions');


        const result = await prisma.resumeResult.create({
            data: {
                resumeText: resume,
                jobDescription,
                matchScore,
                summary,
                strengths,
                weaknesses,
                suggestions
            }
        });

        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while analyzing the resume.' });
    }
}