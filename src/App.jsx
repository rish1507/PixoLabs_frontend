import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import MessageInterFace from './Pages/MessageInterFace'
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Message" element={<MessageInterFace/>}/>
      </Routes>
    </Router>
  )
}
export default App
