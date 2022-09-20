import { BrowserRouter, Route, Routes } from "react-router-dom";
import Pages from "./pages/Pages";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
