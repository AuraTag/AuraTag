import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyBottle } from "../../services/verifyService";

function Verify() {

    const { uid } = useParams();

    const [result, setResult] = useState(null);

    useEffect(() => {

        fetchVerification();

    }, []);

    const fetchVerification = async () => {

        try {

            const data = await verifyBottle(uid);

            setResult(data);

        }

        catch(error){

            if(error.response){

                setResult(error.response.data);

            }

        }

    };

    if(result===null){

        return(

            <div className="min-h-screen bg-[#0F1117] text-white flex items-center justify-center">

                <h1 className="text-3xl">

                    Verifying Bottle...

                </h1>

            </div>

        );

    }

    return(

        <div className="min-h-screen bg-[#0F1117] text-white flex items-center justify-center">

            <div className="bg-[#1E2530] p-10 rounded-xl w-[500px]">

                {
                    result.status==="genuine"

                    ?

                    <>

                        <h1 className="text-4xl text-green-500 font-bold mb-6">

                            ✅ Genuine Bottle

                        </h1>

                        <p><strong>Bottle :</strong> {result.bottle_name}</p>

                        <p><strong>Brand :</strong> {result.brand}</p>

                        <p><strong>Batch :</strong> {result.batch_number}</p>

                        <p><strong>Manufactured :</strong> {result.manufacture_date}</p>

                        <p><strong>Expiry :</strong> {result.expiry_date}</p>

                    </>

                    :

                    <>

                        <h1 className="text-4xl text-red-500 font-bold mb-6">

                            ❌ Counterfeit Bottle

                        </h1>

                        <p>{result.message}</p>

                    </>

                }

            </div>

        </div>

    );

}

export default Verify;