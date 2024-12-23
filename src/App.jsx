import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Start from './Pages/Start';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Message" element={<Start/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}
export default App
