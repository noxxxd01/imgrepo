import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
          <Navbar />
          <div className="flex-grow container mx-auto py-8">
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes> 
          </div> 
          <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
