import { Link } from "react-router-dom"
import ReportInfo from "../components/reportInfo"

function ReportIssuePage() {
    return (
      <>
        <h1>Report Issue Page</h1>
        <ReportInfo />
        <Link to="/">Back to Home</Link>
      </>
    )
  }

export default ReportIssuePage