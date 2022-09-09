import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from './components/AppLayout.jsx';

export default function App() {
    const queryClient = new QueryClient();
 
    return (
        <React.StrictMode>
            <AppLayout />
        </React.StrictMode>
    ) 
}
