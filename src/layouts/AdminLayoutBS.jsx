import { Outlet } from "react-router-dom";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import "./adminLayoutBS.css";

const AdminLayoutBS = () => {
  return (
    <>
      <AdminHeader />

      <div className="container-fluid">
        <div className="row">
          <AdminSidebar />

          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
            <Outlet />

            {/* <AdminFooter /> */}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayoutBS;
