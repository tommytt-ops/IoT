import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dash from './pages/App';
import Movie from './pages/Movie'



const App = () =>  {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Dash/>} path="/" />
          <Route element={<Movie/>} path="/movie" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;