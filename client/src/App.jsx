import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CreatePost, Home } from "./pages";
import Navbar from "./components/Navbar";
import ChatBot from "./pages/ChatBot";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main className=" w-full bg-[#fff] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/chatbot" element={<ChatBot />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
