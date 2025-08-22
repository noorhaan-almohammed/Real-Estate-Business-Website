import { Outlet } from "react-router-dom";
import Navbar from "../sections/sharedSections/Navbar";
import Footer from "../sections/sharedSections/Footer";
import BackToTop from "../components/kit/BackToTop";
const MainLayout = () => {
  return (
    <div className="cursor-custom-default">
      <Navbar />
      <BackToTop/>
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;