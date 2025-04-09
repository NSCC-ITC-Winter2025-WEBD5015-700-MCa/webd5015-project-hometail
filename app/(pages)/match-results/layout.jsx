import Sidebar from "../_components/Sidebar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const MatchResultsLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default MatchResultsLayout;
