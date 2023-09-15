import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import './index.css'
import Search from './search.jsx';
import { BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/search" component={Search} />
    </Router>
  </React.StrictMode>,
)
