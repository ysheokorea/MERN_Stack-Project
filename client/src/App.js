import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Topbar from './components/Topbar';
import Messenger from './pages/messenger/Messenger';



function App() {
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Messenger />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
