import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    console.error('❌ GEMINI_API_KEY is not set or is still the placeholder in .env.local');
    process.exit(1);
}

async function testConnection() {
    console.log('Testing Gemini API connection...');
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

        const prompt = 'Say "Hello, World!" if you can hear me.';
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ Success! Model response:', text);
    } catch (error) {
        console.error('❌ API Error:', error.message);
    }
}

testConnection();
