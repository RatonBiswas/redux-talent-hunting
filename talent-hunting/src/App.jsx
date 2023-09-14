// import { useState } from 'react'
// import reactLogo from './assets/images/main.svg'
// import viteLogo from '/vite.svg'
import { Landing, Dashboard, Register } from "./page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={Dashboard}/>
        <Route path="/landing" element={Landing}/>
        <Route path="/register" element={Register}/>
        <Route path="*" element={Dashboard}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
