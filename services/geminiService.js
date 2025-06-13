const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env file

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Using gemini-pro model

/**
 * Uses Gemini API to suggest categories or tags for a given note content.
 * @param {string} noteContent - The content of the note.
 * @returns {Promise<string[]>} - A promise that resolves to an array of suggested tags/categories.
 */
async function suggestNoteTags(noteContent) {
    if (!noteContent || noteContent.trim() === '') {
        return []; // Return empty array if no content
    }

    // A prompt to guide Gemini to generate relevant tags/categories
    const prompt = `Based on the following note content, suggest up to 5 relevant and concise tags or categories.
    Return them as a comma-separated list. If no relevant tags are found, return "general".
    Example: "shopping, groceries, list, urgent"
    Example: "meeting, project management, agenda"
    Example: "general"

    Note content:
    "${noteContent}"

    Suggested tags:
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let tagsText = response.text().trim();

        // Clean up and parse the tags
        if (tagsText.toLowerCase() === 'general' || tagsText === '') {
            return ['general'];
        }

        return tagsText.split(',')
                       .map(tag => tag.trim().toLowerCase()) // Trim whitespace and convert to lowercase
                       .filter(tag => tag.length > 0); // Remove any empty strings
    } catch (error) {
        console.error('Error suggesting tags with Gemini:', error);
        // Fallback or error handling: return a default tag or empty array
        return ['uncategorized'];
    }
}

module.exports = {
    suggestNoteTags,
};