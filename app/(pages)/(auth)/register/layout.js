import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#1D232A]">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
