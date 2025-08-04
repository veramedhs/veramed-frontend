import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById("root")!).render(
    <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 5000,
                style: {
                    background: '#ffffff',
                    color: '#141414',
                },
            }}
        />
        <App />
    </>
);
