import QRCode from "react-qr-code";

function QRCodeCard({ uid }) {

    const verifyUrl = `http://localhost:5173/verify/${uid}`;

    return (
        <div className="bg-[#1E2530] rounded-xl p-8 text-center shadow-lg">

            <h2 className="text-2xl font-bold text-[#D6B25E] mb-6">
                Verification QR
            </h2>

            <div className="bg-white p-4 inline-block rounded-lg">
                <QRCode
                    value={verifyUrl}
                    size={220}
                />
            </div>

            <p className="mt-6 text-slate-400">
                Scan this QR code to verify the bottle.
            </p>

            <p className="mt-2 text-green-400 break-all text-sm">
                {verifyUrl}
            </p>

        </div>
    );

}

export default QRCodeCard;