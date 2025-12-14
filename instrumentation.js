import dbConnect from './lib/mongodb';

export async function register() {
    try {
        await dbConnect();
        console.log('--- MongoDB Connected via Instrumentation ---');
    } catch (error) {
        console.error('--- MongoDB Connection Failed in Instrumentation ---', error);
    }
}
