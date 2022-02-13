import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./main.css";
import App from "./App";
import Create from "./pages/create";
import Delete from "./pages/delete";
import Search from "./pages/search";

const app = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact strict path="/" element={<App />} />
      <Route exact strict path="/create" element={<Create />} />
      <Route exact strict path="/delete" element={<Delete />} />
      <Route exact strict path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>,

  app
);
