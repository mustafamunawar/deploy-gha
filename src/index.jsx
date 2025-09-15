
import React from "react";
// index.tsx
import { createRoot } from 'react-dom/client';
// import './index.css'; // Import the CSS file
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);