import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { completedTasks } = req.body;

    if (!completedTasks || !Array.isArray(completedTasks)) {
        return res.status(400).json({ message: 'Completed tasks array is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY not found. Returning mock insights.');
        return res.status(200).json({
            weeklySummary: "This is a mock summary because the API key is missing. You have completed several tasks and are making good progress!",
            behavioralInsights: "You demonstrate a pattern of testing applications thoroughly. Keep up the good work."
        });
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const tasksList = completedTasks.map(t =>
            `- ${t.title} (${t.classification}, Duration: ${t.startTime}-${t.endTime})`
        ).join('\n');

        const prompt = `
      You are a productivity expert. Analyze the following list of completed tasks from the past week and provide:
      1. A "Weekly Summary" highlighting key achievements.
      2. "Behavioral Insights" identifying patterns (e.g., "You tend to tackle urgent tasks in the morning").

      Completed Tasks:
      ${tasksList}

      Respond ONLY with valid JSON in this format:
      {
        "weeklySummary": "You completed X tasks...",
        "behavioralInsights": "Your focus seems to be..."
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
        console.error('AI Insights Error:', JSON.stringify(error, null, 2));
        res.status(200).json({
            weeklySummary: "Unable to generate real insights due to an API error.",
            behavioralInsights: "Please check the server logs for more details."
        });
    }
}
