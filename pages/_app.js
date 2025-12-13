import '@/styles/globals.css';
import { TaskProvider } from '../store/taskContext';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
    return (
        <TaskProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </TaskProvider>
    );
}
