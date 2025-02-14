import { Link, BrowserRouter, Routes, Route} from 'react-router'
import Home from './pages/Home'
import Food from './pages/Food'
import { useState } from 'react'
import { GlobalProvider } from './GlobalContext'
function App() {
  return (
    <GlobalProvider>
      <div className="app">
        <BrowserRouter>
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
        </BrowserRouter>
      </div>
    </GlobalProvider>
  )
}

export default App
