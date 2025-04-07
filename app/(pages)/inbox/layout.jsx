import Sidebar from "../dashboard/_components/Sidebar";
import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";

const InboxLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Sidebar />
      <div className="flex-grow px-5 overflow-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default InboxLayout;
