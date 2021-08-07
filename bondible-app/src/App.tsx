import './App.css'
import Header from './components/Header'
import BondForm from './components/BondForm'

function App() {
  return (
    <div className="App">
      <Header />
      <BondForm contractAddress="0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" />
    </div>
  )
}

export default App
