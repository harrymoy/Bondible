import './App.css'
import MenuAppBar from './components/Header'
import MainPage from './pages/MainPage'
import CreateBond from './pages/CreateBond';
import Catalogue from './pages/Catalogue';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <MenuAppBar />
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/bondform" component={CreateBond}/>
        <Route exact path="/browse" component={Catalogue}/>
        <Route/>
      </Router>
    </>
  )
}

export default App