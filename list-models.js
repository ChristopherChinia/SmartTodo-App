
const apiKey = 'AIzaSyDufmNKgIw9ICVHg_cTT-ixocx3SKY2GOY';
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching models:', error);
    }
}

listModels();
