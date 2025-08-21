import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';


document.addEventListener("click", (e) => {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${e.clientX - 10}px`;
  ripple.style.top = `${e.clientY - 10}px`;

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 500);
});

const rootEl = document.getElementById('root')!
createRoot(rootEl).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

// Remove splash screen once React has mounted
const splash = document.getElementById('splash-root')
if (splash) splash.remove()
