import {VFC} from "react"
import {
  BrowserRouter as Router,
  Route,
  useHistory
} from 'react-router-dom';

import Top from "./pages/top"
import Create from "./pages/create"
import Preview from "./pages/preview"

const App: VFC = () => {
  const history = useHistory()
  return(
    <Router>
      <Route path="/" component={Top} />
      <Route path="/create" component={Create} />
      <Route path="/preview" component={Preview} />
    </Router>
  )
}

export default App