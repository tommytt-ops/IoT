import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dash from './App';



const App = () =>  {
    return (
      <div className="App">
          <Router>
            <Routes>

                <Route element={<Dash/>} path="/"/>

            </Routes>
        </Router>
      </div>
    );
  }
  
  export default App;