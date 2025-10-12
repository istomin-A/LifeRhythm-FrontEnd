import { Outlet } from "react-router-dom"
import SideBar from "@/widgets/SideBar"
import Header from "@/widgets/Header"
import Footer from "@/widgets/Footer"

const FullLayout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="page">
          <SideBar />
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default FullLayout