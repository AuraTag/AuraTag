export default function DataTable({
    headers,
    data
}){

    return(

        <table
            style={{
                width:"100%",
                borderCollapse:"collapse",
                background:"#fff",
                borderRadius:"12px",
                overflow:"hidden"
            }}
        >

            <thead>

                <tr>

                    {
                        headers.map(header=>(

                            <th
                                key={header}
                                style={{
                                    padding:"18px",
                                    background:"#D4AF37",
                                    color:"#fff",
                                    textAlign:"left"
                                }}
                            >
                                {header}
                            </th>

                        ))
                    }

                </tr>

            </thead>

            <tbody>

                {
                    data.map((row,index)=>(

                        <tr key={index}>

                            {
                                row.map((cell,i)=>(

                                    <td
                                        key={i}
                                        style={{
                                            padding:"16px",
                                            borderBottom:"1px solid #eee"
                                        }}
                                    >
                                        {cell}
                                    </td>

                                ))
                            }

                        </tr>

                    ))
                }

            </tbody>

        </table>

    )

}