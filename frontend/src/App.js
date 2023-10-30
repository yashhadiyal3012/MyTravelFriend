import './App.css';
import {BrowserRouter as Router , Route ,Link, Routes} from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/Homescreen';
import Navbar from './components/Navbar';
import LocationScreen from './screens/Locationscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import PlaceScreen from './screens/Placescreen';
import BookingScreen from './screens/Bookingscreen';
import ProfileScreen from './screens/Profilescreen';
import FoodScreen from './screens/Foodscreen';
import AboutScreen from './screens/AboutScreen';
import Footer from './components/Footer';
import ContactScreen from './screens/ContactScreen';
// import Tabscreen from './screens/Tabs';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>

          <Route path="/" exact element={<LandingScreen/>}/>
          <Route path="/home" exact element={<HomeScreen/>}/>
          <Route path="/home" exact element={<LocationScreen/>}/>
          <Route path="/contact" exact element={<ContactScreen/>}/>
          <Route path="/rooms/:name" exact element={<PlaceScreen/>}/>
          <Route path="/register" exact element={<Registerscreen/>}/>
          <Route path="/login" exact element={<Loginscreen/>}/>
          <Route path="/profile" exact element={<ProfileScreen/>}/>
          <Route path="/foods/:id" exact element={<FoodScreen/>}/>    
          <Route path="/about" exact element={<AboutScreen/>}/>
          <Route path="/book/:id/:fromDate/:toDate" exact element={<BookingScreen/>}/>
          
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
