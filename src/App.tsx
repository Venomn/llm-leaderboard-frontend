import './App.css'
import 'antd/dist/antd.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeaderboardPage from './pages/LeaderboardPage'
import ReportIssuePage from './pages/ReportIssuePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeaderboardPage />} />
        <Route path="/report" element={<ReportIssuePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
