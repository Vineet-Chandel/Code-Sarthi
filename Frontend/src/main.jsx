import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'   // ✅ ADD THIS
import appStore from './utils/appStore.js'

createRoot(document.getElementById('root')).render(

  <Provider store={appStore}>
    <App />
  </Provider>

)
