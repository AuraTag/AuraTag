import QRCode from "react-qr-code";

function QRCodeCard({ uid }) {

    const url = `http://localhost:5173/verify/${uid}`;

    return (

        <div className="bg-white p-6 rounded-xl inline-block">

            <QRCode
                value={url}
                size={180}
            />

            <p className="mt-4 text-black text-center">
                Scan to Verify
            </p>

        </div>

    );

}

export default QRCodeCard;
