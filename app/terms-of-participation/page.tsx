import Link from 'next/link';

export const metadata = {
  title: 'Terms of Participation - Young World',
  description: 'Terms of Participation for The World\'s Biggest Friendship Roll Call',
};

export default function TermsOfParticipationPage() {
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
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Terms of Participation</h1>
                <p className="text-slate-500 font-medium">Last updated: 9 July 2026</p>
            </div>

            <div className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-600">
                <p className="text-slate-800 font-medium text-xl md:text-2xl leading-relaxed mb-10">
                    These terms cover taking part in The World's Biggest Friendship Roll Call ("the Roll Call") and using youngworld.life, operated by YWE Studios (OPC) Private Limited, Guwahati, Assam, India.
                </p>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">1</span>
                            The basics
                        </h2>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">The Roll Call is free. No fee, no purchase, ever.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Checking in means posting a reel from your community's own account on Friendship Day (2 August 2026) and tagging other communities. Nothing more is required.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Registration on our website must be completed by an adult (18+) representative of the community.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">2</span>
                            Your content
                        </h2>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Reels and photos you post stay yours. You own your content.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">By registering and using #WaveTheWhite or tagging our pages, you allow us to reshare your public check-in posts and feature your community's name, public handle, city and country on our website and social channels, to celebrate the Roll Call.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">If you'd like a feature removed, email <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a> and we'll take it down within 7 days.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">3</span>
                            Community standards
                        </h2>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">The Roll Call is family-friendly and for everyone. Check-in content must not contain hate, harassment, violence, or anything unsafe for a general audience.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">We may decline to feature or may remove any community whose participation, in our reasonable judgment, harms the safety or spirit of the event: nobody gets left out, and nobody gets hurt.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">4</span>
                            What we're not responsible for
                        </h2>
                        <ul className="space-y-4 text-slate-700 list-none pl-11">
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Content posted by participating communities on their own accounts.</li>
                            <li className="relative before:absolute before:left-[-1.5rem] before:top-3 before:w-2 before:h-2 before:bg-sky-400 before:rounded-full">Actions of third parties impersonating Young World. We will never DM you asking for passwords or account verification — see our Privacy Policy and report impersonation to <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a>.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">5</span>
                            Grants and sponsorships
                        </h2>
                        <div className="pl-11">
                            <p className="text-slate-700 leading-relaxed">
                                If sponsor-funded Founding Community Grants are awarded, the criteria, judging process, and sponsors will be published openly on this website before any award is made. Grants are recognition of community effort based on published criteria — never a lottery, never paid entry.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-5 uppercase tracking-wide font-display flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center text-sm">6</span>
                            Changes and contact
                        </h2>
                        <div className="pl-11">
                            <p className="text-slate-700 leading-relaxed">
                                We may update these terms; the date above will change and significant updates will be announced. Questions: <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a>.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
