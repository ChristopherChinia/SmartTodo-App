
const fetch = require('http').request;

async function testAnalyze() {
    console.log('Testing /api/ai/analyze...');
    const data = JSON.stringify({
        title: 'Test Task',
        description: 'A test task for verification',
        currentDate: new Date().toISOString()
    });

    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/ai/analyze',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve, reject) => {
        const req = fetch(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('Analyze API Response:', body);
                    resolve();
                } else {
                    console.error(`Analyze API Failed: ${res.statusCode} ${body}`);
                    reject(new Error('Analyze API Failed'));
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function run() {
    try {
        // Wait for server to start
        await new Promise(r => setTimeout(r, 5000));
        await testAnalyze();
        console.log('All tests passed');
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

run();
