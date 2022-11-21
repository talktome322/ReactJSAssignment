import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/:category/:name' element={<MovieDetails />}></Route>
            </Routes>
        </Router>
    )
}

export default App