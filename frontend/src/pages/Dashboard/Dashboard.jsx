function Dashboard() {

    const company = localStorage.getItem("company_name");

    return (

        <div className="min-h-screen bg-[#0F1117] text-white p-10">

            <h1 className="text-4xl font-bold">

                Welcome {company}

            </h1>

            <p className="mt-4 text-slate-400">

                AuraTag Manufacturer Dashboard

            </p>

        </div>

    );

}

export default Dashboard;