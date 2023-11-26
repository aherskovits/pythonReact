import './App.css';
import { Home } from './Home';
import { Employee } from './Employee';
import { Department } from './Department';
import { Navigation} from './Navigation';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
 
function App() {
  return (
    <BrowserRouter>
    <div className="container">
    <h3 className="m-3 d-flex justify-content-center">ReactJs Tutorial</h3>
    <Navigation/>
    <Routes>
    <Route path='/' element={<Home/>} exact/>
    <Route path='/department' element={<Department/>}/>
    <Route path='/employee' element={<Employee/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

// video url
// https://www.youtube.com/watch?v=f5ygXQKF6M8&ab_channel=ArtofEngineer
// missing file upload