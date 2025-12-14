import '@/styles/globals.css';
import { TaskProvider } from '../store/taskContext';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
    return (
        <TaskProvider>
            <Layout>
                <Component {...pageProps} />
                <Toaster position="bottom-right" />
            </Layout>
        </TaskProvider>
    );
}

export default MyApp;
