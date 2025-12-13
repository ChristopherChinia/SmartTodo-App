import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { title, description, currentDate } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Task title is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
            classification: "NOT_URGENT_IMPORTANT",
            estimatedDuration: 30,
            suggestedEndTime: "17:00",
            reasoning: "Mock analysis (API Key missing)."
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `
      You are an AI productivity assistant. Analyze the following task and provide:
      1. Eisenhower Matrix Classification (URGENT_IMPORTANT, URGENT_NOT_IMPORTANT, NOT_URGENT_IMPORTANT, NOT_URGENT_NOT_IMPORTANT).
      2. Estimated duration in minutes.
      3. A suggested end time (HH:MM format) assuming the task starts now or at a logical time today.

      Task Title: "${title}"
      Task Description: "${description || ''}"
      Current Date/Time: ${currentDate}

      Respond ONLY with valid JSON in this format:
      {
        "classification": "URGENT_IMPORTANT",
        "estimatedDuration": 30,
        "suggestedEndTime": "14:00",
        "reasoning": "Brief explanation..."
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonString);

        res.status(200).json(data);
    } catch (error) {
        console.error('AI Analysis Error:', error);
        res.status(200).json({
            classification: "NOT_URGENT_NOT_IMPORTANT",
            estimatedDuration: 15,
            suggestedEndTime: "17:00",
            reasoning: "Analysis failed. Defaulting values."
        });
    }
}
