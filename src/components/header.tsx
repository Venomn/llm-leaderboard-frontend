import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <h1>LLM Leaderboard based on User Feedback</h1>
      <Link to="/">Home</Link>
      |
      <Link to="/report">Report</Link>
    </div>
  )
}

export default Header