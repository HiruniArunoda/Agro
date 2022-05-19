import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddItem from "./pages/AddItem";
import NavHeader from "./pages/NavHeader";
import UpdateItem from "./pages/UpdateItem";
import ViewSellerItems from "./pages/ViewSellerItems";
import Card from "./pages/Card.js"
import PaymentPage from "./pages/PaymentPage"
import AddCard from './pages/AddCard';
import UpdateCard from './pages/UpdateCard';





export default function App() {

  return (
    <BrowserRouter>

    <NavHeader/>
      <Routes>
        <Route path="/addItem" element={<AddItem />}/>
        <Route path="/viewSellerItems" element={<ViewSellerItems />} />
        <Route path="/UpdateItem/:id" element={<UpdateItem />} />
        <Route path='/Card' element={<Card/>}/>
        <Route path= '/PaymentPage' element={<PaymentPage/>}/>
        <Route path = '/AddCard' element={<AddCard/>}/>
        <Route path = '/UpdateCard/:id' element={<UpdateCard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);