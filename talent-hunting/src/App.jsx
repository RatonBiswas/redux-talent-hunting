// import { useState } from 'react'
// import reactLogo from './assets/images/main.svg'
// import viteLogo from '/vite.svg'
import { Landing, Error, Dashboard, Register } from "./page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Dashboard />}>
    //       <Route path="/landing" element={<Landing />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route path="*" element={<Error />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
