import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Persistor, persistStore } from 'redux-persist'
import { ProblemProvider } from './components/ProblemProvider'

const persistor: Persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ProblemProvider>
            <App />
          </ProblemProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
