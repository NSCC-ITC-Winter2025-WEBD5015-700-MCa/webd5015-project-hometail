import Navbar from "../../_components/Navbar";
import Footer from "../../_components/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
