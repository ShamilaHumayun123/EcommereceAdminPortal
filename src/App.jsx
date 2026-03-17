
import './css/datatables.min.css';
import './css/slickslider.min.css';
import './css/jquery-ui.css';
import './css/jvector-map.css';
import './css/style.css'; 
import './css/bootstrap.min.css'; 
import './css/charts.min.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadProduct from './Components/UploadProduct';
import CategoryTable from './Components/CategoryTable';
import BrandTable from './Components/BrandTable';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div>
      
      <Router>
      <Routes>
        <Route path="/category-table" element={<CategoryTable />} />
        <Route path="/brand-table" element={<BrandTable />} />
        <Route path="/" element={<UploadProduct />} />
        <Route path="/upload-product" element={<UploadProduct />} />
      </Routes>
    </Router>
      
    </div>
  )
}

export default App;