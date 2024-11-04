import { Welcome } from './components/welcome/Welcome'
import './App.css'
import "./components/welcome/Welcome.css"
import "./components/SongSearch/SongSearch.css"
import SongSearch from './components/SongSearch/SongSearch';

function App() {

  return (
    <div className='App'>
      <Welcome/>
      <h1>Spotify Song Search</h1>
      <SongSearch />
      {/* Add other components here */}
    </div>
  );
}

export default App
