import { ShieldAlert, Wine, TriangleAlert, BadgeAlert } from "lucide-react";

function Problem() {

    const problems = [

        {
            icon: <Wine size={36} />,
            title: "Fake Premium Bottles"
        },

        {
            icon: <BadgeAlert size={36} />,
            title: "Bottle Refilling"
        },

        {
            icon: <TriangleAlert size={36} />,
            title: "Consumer Safety Risks"
        },

        {
            icon: <ShieldAlert size={36} />,
            title: "Brand Reputation Damage"
        }

    ];

    return (

        <section className="bg-[#161B22] py-28">

            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-5xl font-bold text-center mb-8">

                    Counterfeit Alcohol Is A
                    Billion-Dollar Problem

                </h2>

                <p className="text-slate-400 text-center max-w-3xl mx-auto leading-8 mb-20">

                    Every year counterfeit premium alcohol bottles
                    enter the market, causing financial loss,
                    damaging brand reputation and putting
                    consumer safety at risk.

                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    {problems.map((problem) => (

                        <div
                            key={problem.title}
                            className="bg-[#1E2530]
                                       rounded-2xl
                                       border border-white/5
                                       p-8
                                       flex
                                       items-center
                                       gap-5
                                       hover:border-[#D6B25E]
                                       transition">

                            <div className="text-[#D6B25E]">

                                {problem.icon}

                            </div>

                            <h3 className="text-xl font-semibold">

                                {problem.title}

                            </h3>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default Problem;