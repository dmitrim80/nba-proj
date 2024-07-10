import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
//import QueryLocalComponent from './QueryLocalComponent'; 
// import QueryComponent from './QueryComponent'; 
import QueryForm from './QueryForm';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query" element={<QueryForm />} />
            {/* <Route path="/another-page" component={AnotherPage} />  */}
        </Routes>
        <Footer/>
          {/* <QueryLocalComponent /> */}
          {/* <QueryComponent /> */}
      </div>
    </Router>
    
  );
}

export default App;
