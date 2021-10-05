import { useContext } from 'react';
import './App.css';
import { Web3Context } from './web3';

const App = () => {
  const { connectToMetaMask, context } = useContext(Web3Context);
  const { active } = context;
  console.log("🚀 ~ file: App.tsx ~ line 7 ~ App ~ context", context)
  console.log("🚀 ~ file:  connectToMetaMask", connectToMetaMask)

  return (
    <div className="App">
      <header className="App-header">
        {active && <div onClick={connectToMetaMask}>Disconnect</div>}
        {!active && <div onClick={connectToMetaMask}>Connect to wallet</div>}
      </header>
    </div>
  );
}

export default App;
