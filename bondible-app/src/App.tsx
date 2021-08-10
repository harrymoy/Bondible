import './App.css'
import MenuAppBar from './components/Header'
import BondForm from './components/BondForm'
import MainPage from './pages/MainPage'

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <MainPage />
      <BondForm contractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" />
    </div>
  )
}

export default App
