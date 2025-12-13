
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    console.log('Testing Gemini API with key:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');

    if (!process.env.GEMINI_API_KEY) {
        console.error('API Key missing');
        return;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    try {
        const result = await model.generateContent('Hello, world!');
        const response = await result.response;
        console.log('Response:', response.text());
    } catch (error) {
        console.error('Gemini Error:', error);
    }
}

testGemini();
