import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - Young World',
  description: 'About Young World and The World\'s Biggest Friendship Roll Call',
};

export default function AboutUsPage() {
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
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">About Us</h1>
                <p className="text-slate-500 font-medium text-lg">Real people. A real company. One promise.</p>
            </div>

            <div className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-600">
                <p className="text-slate-800 font-medium text-xl md:text-2xl leading-relaxed mb-16 text-center">
                    Young World is building <span className="text-sky-600 font-bold">The World's Biggest Friendship Roll Call</span> — a global Friendship Day tradition where communities check in together so nobody gets left out. Here's exactly who we are.
                </p>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-wide font-display border-b-2 border-sky-100 pb-4 inline-block">
                            The founder
                        </h2>
                        
                        <div className="flex flex-col md:flex-row gap-8 items-start bg-slate-50 p-8 rounded-2xl border border-slate-100">
                            <div className="w-24 h-24 rounded-full bg-sky-100 flex-shrink-0 flex items-center justify-center text-3xl font-bold text-sky-600 overflow-hidden relative">
                                {/* If there was an image, it would go here. Using initials as a fallback. */}
                                UY
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Biswadeep Gautam — "Uncle Young"</h3>
                                <p className="text-sky-600 font-bold uppercase tracking-wide text-sm mb-4">Founder & Host, Young World</p>
                                <p className="text-slate-700 leading-relaxed mb-6">
                                    Uncle Young started Young World with a simple observation: communities are among the most positive forces in the world — they create friendship, belonging and support — yet most of them never get seen. The Roll Call exists to change that, one wave of white at a time. He's not the hero of this story; the communities are. He's just the one holding the door open.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                                    <a href="https://www.instagram.com/uncleyoung94/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                        @uncleyoung94
                                    </a>
                                    <a href="mailto:office@youngworld.life" className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        office@youngworld.life
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-wide font-display border-b-2 border-sky-100 pb-4 inline-block">
                            The company
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-8">
                            Young World Entertainment is operated by a registered Indian company. We publish our registration details in full so anyone — a community leader, a parent, a partner — can verify us independently on official government portals.
                        </p>

                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm mb-6">
                            <table className="w-full text-left border-collapse">
                                <tbody className="text-slate-700 text-sm md:text-base">
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 w-1/3 bg-slate-50/50">Legal entity</td>
                                        <td className="py-4 px-6">YWE Studios (OPC) Private Limited</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">Corporate Identity Number (CIN)</td>
                                        <td className="py-4 px-6 font-mono text-sm bg-slate-100/50 rounded-md inline-block m-2">U73100AS2025OPC029355</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">Incorporated</td>
                                        <td className="py-4 px-6">8 December 2025 · Ministry of Corporate Affairs, Government of India</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">MSME / Udyam Registration</td>
                                        <td className="py-4 px-6 font-mono text-sm bg-slate-100/50 rounded-md inline-block m-2">UDYAM-AS-03-0085259</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">Operating unit</td>
                                        <td className="py-4 px-6">Young World Entertainment</td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">Registered office</td>
                                        <td className="py-4 px-6">Juripar, Panjabari, Guwahati, Assam 781037, India</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">Email</td>
                                        <td className="py-4 px-6"><a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-medium">office@youngworld.life</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-slate-500 italic px-4">
                            Verify our CIN independently at <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">mca.gov.in</a> (Ministry of Corporate Affairs) and our Udyam registration at <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">udyamregistration.gov.in</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-wide font-display border-b-2 border-sky-100 pb-4 inline-block">
                            What the Roll Call is — and isn't
                        </h2>
                        <p className="text-slate-700 leading-relaxed mb-6 font-medium text-lg">
                            On August 2, 2026 — Friendship Day — communities around the world check in together: they wave something white, post a short reel, and tag three more communities in. That's the whole thing.
                        </p>
                        <div className="bg-sky-50 border border-sky-100 p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                            <p className="text-sky-900 font-bold text-xl">
                                It is free. There is no fee, no purchase, and no catch. We will never charge a community to take part.
                            </p>
                        </div>
                    </section>

                    <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl relative overflow-hidden">
                        {/* Dark mode background subtle touches */}
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-500/20 rounded-full blur-[80px] pointer-events-none"></div>
                        
                        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide font-display flex items-center gap-4">
                            <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            Our security promise
                        </h2>
                        <ul className="space-y-6 text-slate-300 list-none text-lg">
                            <li className="relative pl-8">
                                <span className="absolute left-0 top-1.5 w-4 h-4 bg-rose-500/20 rounded-full flex items-center justify-center">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                </span>
                                We will never ask for your Instagram, TikTok or any social media password. Not on our website, not in a DM, not ever.
                            </li>
                            <li className="relative pl-8">
                                <span className="absolute left-0 top-1.5 w-4 h-4 bg-rose-500/20 rounded-full flex items-center justify-center">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                </span>
                                We will never send you a link asking you to "verify" or "log in to" your social account.
                            </li>
                            <li className="relative pl-8">
                                <span className="absolute left-0 top-1.5 w-4 h-4 bg-sky-500/20 rounded-full flex items-center justify-center">
                                    <span className="w-2 h-2 bg-sky-400 rounded-full"></span>
                                </span>
                                Checking in requires nothing but posting your own reel from your own account.
                            </li>
                            <li className="relative pl-8">
                                <span className="absolute left-0 top-1.5 w-4 h-4 bg-rose-500/20 rounded-full flex items-center justify-center">
                                    <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                                </span>
                                If you receive a message like that using our name, it is not from us — please screenshot it and send it to <a href="mailto:office@youngworld.life" className="text-sky-400 hover:text-sky-300 font-bold transition-colors">office@youngworld.life</a> so we can report it and warn others.
                            </li>
                        </ul>
                    </section>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-2xl md:text-3xl font-black text-slate-900 font-display uppercase tracking-wider mb-10">
                        One World. Many Communities. No One Left Out. 🤍
                    </p>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
