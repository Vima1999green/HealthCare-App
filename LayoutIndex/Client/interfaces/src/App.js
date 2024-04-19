import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddDevice from "./pages/AddDevice";
import AddLocation from "./pages/AddLocation";
import DisplayLocationDetails from "./pages/DisplayLocationDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddDevice />} />
          <Route path="/location" element={<AddLocation />} />
          <Route path="showAllLocations" element={<DisplayLocationDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
