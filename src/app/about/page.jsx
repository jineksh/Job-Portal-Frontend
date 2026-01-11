import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen bg-background">

            {/* ================= Mission Section ================= */}
            <section className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">

                    {/* Image */}
                    <div className="flex justify-center mb-12">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-border">
                            <img
                                src="/about.png"
                                alt="About HireHeaven"
                                className="w-full max-w-[520px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Our Mission at{" "}
                            <span className="text-red-500">HireMe</span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                            HireMe is built to simplify and elevate the job search
                            experience. We aim to bridge the gap between passionate talent
                            and innovative companies, enabling careers to grow and
                            businesses to thrive.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= CTA Section ================= */}
            <section className="py-20 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center space-y-6">

                        <h2 className="text-3xl md:text-4xl font-bold">
                            Ready to find your dream job?
                        </h2>

                        <p className="text-lg md:text-xl text-muted-foreground">
                            Join thousands of professionals who trust HireMe to shape
                            their careers.
                        </p>

                        <div className="pt-6">
                            <Link href="/jobs">
                                <Button
                                    size="lg"
                                    className="h-12 px-10 text-base gap-2"
                                >
                                    Get Started
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
