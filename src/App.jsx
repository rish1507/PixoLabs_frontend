import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Start from "./Pages/Start";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import Message from "./Pages/Message/Message";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import AuthCallback from "./Pages/Login/AuthCallback";
function App() {
  return (
    <Router>
      <BackgroundProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Demo" element={<Start />} />
          <Route path="Message" element={<Message />} />
          <Route path="Register" element={<Register/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="/auth/callback" element={<AuthCallback/>}/>
        </Routes>
        <Footer />
      </BackgroundProvider>
    </Router>
  );
}
const BackgroundProvider = ({ children }) => {
  const location = useLocation();

  const getBackgroundColor = () => {
    switch (location.pathname) {
      case "/":
        return "#0a0a0a";
      default:
        return "white";
    }
  };

  return (
    <div style={{ backgroundColor: getBackgroundColor(), minHeight: "100vh" }}>
      {children}
    </div>
  );
};
export default App;
