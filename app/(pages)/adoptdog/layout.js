import Sidebar from "../dashboard/_components/Sidebar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
