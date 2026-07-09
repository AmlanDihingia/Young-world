import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Young World',
  description: 'Privacy Policy for The World\'s Biggest Friendship Roll Call',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-32 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200/30 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 rounded-full blur-[120px]"></div>
        </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 md:p-16">
            <div className="text-center mb-12 border-b border-slate-100 pb-10">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Privacy Policy</h1>
                <p className="text-slate-500 font-medium">Last updated: 9 July 2026 · Applies to youngworld.life and The World's Biggest Friendship Roll Call</p>
            </div>

            <div className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-600">
                <p className="text-slate-800 font-medium text-xl md:text-2xl leading-relaxed mb-10">
                    This policy explains, in plain language, what information we collect when you register your community for the Roll Call, why we collect it, and what we will never do with it. "We" means YWE Studios (OPC) Private Limited (CIN U73100AS2025OPC029355), operating as Young World Entertainment, Guwahati, Assam, India.
                </p>

                <div className="mb-12 bg-sky-50 border border-sky-100 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-wide font-display">The most important part</h3>
                    <p className="text-slate-700 leading-relaxed font-medium">
                        We never ask for, collect, or store passwords to your Instagram, TikTok, YouTube or any other social media account. Checking in to the Roll Call only ever means posting a reel from your own account, yourself. Any message asking you to "verify" or "log in" using our name is fraudulent — report it to <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a>.
                    </p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">1</span>
                            What we collect
                        </h2>
                        <p className="text-slate-700 mb-4 font-medium pl-11">When you register your community through our website form, we ask for:</p>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Your name and email address</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Your city and country</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Your community's name and public social media links (e.g. your Instagram page URL)</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Your role in the community</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Optionally: a phone number, a short line about why your community matters to you, and photos you choose to upload</li>
                        </ul>
                        <p className="text-slate-700 mt-4 pl-11 font-medium italic">
                            That's it. We collect only what we need to know who's checking in, feature communities on our map and pages, and contact you about the event.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">2</span>
                            How we use it
                        </h2>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">To confirm your community's check-in and coordinate the August 2 Roll Call</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">To feature registered communities on our website and social channels (names, public handles, and photos you provided for that purpose)</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">To contact you about the Roll Call and, only if you opted in, about future Young World initiatives</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">3</span>
                            What we never do
                        </h2>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-rose-400 before:rounded-full font-medium">We never sell your information to anyone.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-rose-400 before:rounded-full font-medium">We never share your email or phone number publicly.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-rose-400 before:rounded-full font-medium">We never ask for money to take part — the Roll Call is free.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-rose-400 before:rounded-full font-medium">We never DM you links asking you to log into or verify your social accounts.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">4</span>
                            Where your information lives
                        </h2>
                        <div className="pl-11">
                            <p className="text-slate-700 leading-relaxed">
                                Registration data is stored securely and access is limited to the Young World founding team for event coordination only.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">5</span>
                            Your choices
                        </h2>
                        <div className="pl-11">
                            <p className="text-slate-700 leading-relaxed">
                                You can ask us at any time to correct your information, stop contacting you, or delete everything we hold about you or your community. Email <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a> with the subject "Data request" and we'll act on it within 7 days.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">6</span>
                            Minors
                        </h2>
                        <div className="pl-11">
                            <p className="text-slate-700 leading-relaxed">
                                Community registration must be completed by an adult (18+) representative. Featured content involving community members of all ages is only used when provided to us by the registering community for that purpose.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">7</span>
                            Changes & Contact
                        </h2>
                        <div className="pl-11">
                            <p className="text-slate-700 leading-relaxed mb-4">
                                If we change this policy, we'll update the date at the top and, for significant changes, tell registered communities by email.
                            </p>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-slate-800 font-medium mb-1">YWE Studios (OPC) Private Limited</p>
                                <p className="text-slate-600 mb-3">Juripar, Panjabari, Guwahati, Assam 781037, India</p>
                                <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
