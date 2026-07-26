export default function StatCard({
    title,
    value,
    icon,
    color = "#D4AF37"
}) {

    return (

        <div
            style={{
                background:"#fff",
                borderRadius:"15px",
                padding:"25px",
                boxShadow:"0 4px 10px rgba(0,0,0,.08)",
                borderTop:`5px solid ${color}`
            }}
        >

            <div
                style={{
                    fontSize:"35px"
                }}
            >
                {icon}
            </div>

            <h3>{title}</h3>

            <h1>{value}</h1>

        </div>

    )

}