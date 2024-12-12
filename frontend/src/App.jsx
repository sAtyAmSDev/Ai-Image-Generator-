import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Generate from "./Pages/Generate";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
      </Routes>
    </>
  );
}

export default App;
