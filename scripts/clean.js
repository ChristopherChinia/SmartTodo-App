const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../.next');

try {
    if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
        console.log('Successfully cleaned .next directory');
    } else {
        console.log('.next directory does not exist, nothing to clean');
    }
} catch (error) {
    console.error('Error cleaning .next directory:', error);
    process.exit(1);
}
