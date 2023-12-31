// import { useState } from 'react'
// import reactLogo from './assets/images/main.svg'
// import viteLogo from '/vite.svg'
import { Landing, Error, Register ,ProtectedRoute} from "./page";
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from "./page/dashboards";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute>
        <SharedLayout />
    </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: "/all-jobs",
        element: <AllJobs />,
      },
      {
        path: "/add-job",
        element: <AddJob />,
      },
      {
        path: "/edit-job",
        element: <AddJob />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
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
    // <RouterProvider  />
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={500}/>
    </div>
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
