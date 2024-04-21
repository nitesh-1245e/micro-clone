import Navbar from "./_components/Navbar";
import OrgSidebar from "./_components/OrgSidebar";
 import { Toaster } from "../../components/ui/sonner";
import Sidebar from "./_components/sidebar";


interface DashboardLayoutProps{
    children:React.ReactNode
}


const Dashboard = ({
    children,
}:DashboardLayoutProps)=>{
return(
    <main  className="h-full" >
        <Sidebar/>
        <div className=" pl-[60px] h-full " >
            <div className=" flex  h-full " >
                <OrgSidebar/>
                <div className="h-full flex-1" >
{/* Add Navbar*/}<Navbar/>

        {children}
                </div>
            </div>
        </div>
    </main>
)
};





export default Dashboard;