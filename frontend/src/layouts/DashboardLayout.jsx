import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

export default function DashboardLayout({children}){

    return(

        <div style={{display:"flex"}}>

            <Sidebar/>

            <div
                style={{
                    marginLeft:"260px",
                    width:"100%"
                }}
            >

                <Navbar/>

                <div
                    style={{
                        padding:"30px"
                    }}
                >

                    {children}

                </div>

            </div>

        </div>

    );

}