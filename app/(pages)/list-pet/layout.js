import Sidebar from "../dashboard/_components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
