import { HashRouter as Router, Link, BrowserRouter, Routes, Route} from 'react-router'

import Home from './pages/Home'
import Food from './pages/Food'
import { useState } from 'react'
import { GlobalProvider } from './GlobalContext'
function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <Router>
          <Routes>
            <Route 
              exact
              path="/"
              element={
                <Home/>
              } 
            />
            <Route 
              path='/food'
              element={
                <Food />
              } 
            />
          </Routes>
        </Router>
      </div>
    </GlobalProvider>
  )
}

export default App
