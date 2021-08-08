import './App.css'
import MenuAppBar from './components/Header'
import BondForm from './components/BondForm'
import Subscribe from './components/Subscribe'

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <BondForm contractAddress="0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9" />
      <Subscribe
        contractAddress="0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
        maxSubscription={100}
      />
    </div>
  )
}

export default App
