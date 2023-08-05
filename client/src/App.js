import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-dogs-api.vercel.app/'

function App() {
  return (
    <div className="App">
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/dog/:id' component={DogDetail}/>
            <Route exact path='/create/dog' component={CreateDog}/>
    </div>
  );
}

export default App;
