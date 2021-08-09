import './App.css'
import MenuAppBar from './components/Header'
import BondForm from './components/BondForm'
import Subscribe from './components/Subscribe'

function App() {
  return (
    <div className="App">
      <MenuAppBar />
      <BondForm contractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" />
      <Subscribe
        contractAddress="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
        maxSubscription={100}
      />
    </div>
  )
}

export default App
