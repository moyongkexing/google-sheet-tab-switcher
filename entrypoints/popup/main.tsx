import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const Popup = () => {
  return (
    <main>
      <h1>Google Sheet Tab Switcher</h1>
      <p>Open a Google Sheets document and press Cmd/Ctrl + Shift + F to switch tabs.</p>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Popup />
  </StrictMode>,
);
