import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import Products from './components/pages/Products.jsx'
import NotFound from './components/pages/NotFound.jsx'
import Chat from './components/pages/Chat.jsx'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App