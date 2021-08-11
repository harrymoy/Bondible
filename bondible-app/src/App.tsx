import './App.css'
import MenuAppBar from './components/Header'
import BondForm from './components/BondForm'
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {

  return (
    <>
      <MenuAppBar />
      <Router>
        <Route exact path="/" component={MainPage}/>
        <Route/>
        <Route/>
      </Router>
    </>
  )
}

export default App
