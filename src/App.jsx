import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Helpdesk from './pages/Helpdesk';
import About from './pages/About';
import Register from './pages/Register';
import Schemes from './pages/Schemes';
import RationCard from './pages/RationCard';
import PeopleStories from './pages/PeopleStories';
import Navbar from './components/Navbar';
import SubsidizedProducts from './pages/SubsidizedProducts';
import CommunityDrive from './pages/CommunityDrive';
import CommunityChats from './pages/CommunityChats';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="BPL_Helper/" element={<Home />} />
              <Route path="/helpdesk" element={<Helpdesk />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/ration-card" element={<RationCard />} />
              <Route path="/stories" element={<PeopleStories />} />
              <Route path="/subsidized-products" element={<SubsidizedProducts />} />
              <Route path="/community-drive" element={<CommunityDrive />} />
              <Route path="/community-chat" element={<CommunityChats />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
