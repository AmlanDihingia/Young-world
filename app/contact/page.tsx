import Link from 'next/link';

export const metadata = {
  title: 'Contact & Verify - Young World',
  description: 'Talk to us. Verify us.',
};

export default function ContactPage() {
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
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 font-display uppercase tracking-tight">Contact & Verify</h1>
                <p className="text-slate-500 font-medium text-lg">Talk to us. Verify us.</p>
            </div>

            <div className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-600">
                <p className="text-slate-800 font-medium text-xl md:text-2xl leading-relaxed mb-16 text-center">
                    Questions about the Roll Call, your community's check-in, partnerships, or anything else — we answer everything ourselves. And if something claiming to be Young World feels off, this page is how you check.
                </p>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 uppercase tracking-wide font-display border-b-2 border-sky-100 pb-4 inline-block">
                            Official channels — the only ones
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center gap-4 hover:border-sky-200 transition-colors">
                                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                                    <a href="mailto:office@youngworld.life" className="text-slate-900 font-bold hover:text-sky-600 transition-colors">office@youngworld.life</a>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center gap-4 hover:border-sky-200 transition-colors">
                                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Website</p>
                                    <a href="https://youngworld.life" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold hover:text-sky-600 transition-colors">youngworld.life</a>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center gap-4 hover:border-sky-200 transition-colors">
                                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Instagram (Movement)</p>
                                    <a href="https://www.instagram.com/youngworld.life/" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold hover:text-sky-600 transition-colors">@youngworld.life</a>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center gap-4 hover:border-sky-200 transition-colors">
                                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Instagram (Founder)</p>
                                    <a href="https://www.instagram.com/uncleyoung94/" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-bold hover:text-sky-600 transition-colors">@uncleyoung94</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                            <p className="text-amber-900 font-bold text-lg">
                                If a message comes from any handle, email or website not listed above, it is not us — even if it uses our name and logo.
                            </p>
                        </div>
                    </section>

                    <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl relative overflow-hidden">
                        {/* Dark mode background subtle touches */}
                        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-500/20 rounded-full blur-[80px] pointer-events-none"></div>
                        
                        <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide font-display flex items-center gap-4">
                            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            Seen something suspicious?
                        </h2>
                        <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                            <p>
                                We will <span className="text-white font-bold">never</span> ask for your password or send links to "verify" your social accounts.
                            </p>
                            <p>
                                If you've received a message like that in our name: don't click, screenshot it (with the sender's handle and the full link visible), and send it to <a href="mailto:office@youngworld.life" className="text-sky-400 hover:text-sky-300 font-bold transition-colors">office@youngworld.life</a>.
                            </p>
                            <p>
                                If your community's account was compromised, Instagram's official recovery route is <a href="https://instagram.com/hacked" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 font-bold transition-colors">instagram.com/hacked</a> — and we'll help however we can.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-wide font-display border-b-2 border-sky-100 pb-4 inline-block">
                            Verify the company
                        </h2>
                        
                        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm mb-6">
                            <table className="w-full text-left border-collapse">
                                <tbody className="text-slate-700 text-sm md:text-base">
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 w-1/3 bg-slate-50/50">Legal entity</td>
                                        <td className="py-4 px-6">
                                            YWE Studios (OPC) Private Limited <br className="md:hidden" />
                                            <span className="md:mx-2 hidden md:inline">·</span> 
                                            <span className="text-slate-500">CIN U73100AS2025OPC029355</span>
                                            <br className="md:hidden" />
                                            <span className="md:mx-2 hidden md:inline">—</span> 
                                            <span className="text-sm">verify at <a href="https://www.mca.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline font-medium">mca.gov.in</a></span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">MSME / Udyam</td>
                                        <td className="py-4 px-6">
                                            <span className="font-mono bg-slate-100/50 rounded-md px-2 py-1 mr-2 text-sm">UDYAM-AS-03-0085259</span>
                                            <br className="md:hidden" />
                                            <span className="md:mx-2 hidden md:inline">—</span> 
                                            <span className="text-sm">verify at <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline font-medium">udyamregistration.gov.in</a></span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-bold text-slate-900 bg-slate-50/50">Registered office</td>
                                        <td className="py-4 px-6">Juripar, Panjabari, Guwahati, Assam 781037, India</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-slate-700 font-medium px-4">
                            More about who we are: <Link href="/about" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">About Young World</Link>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 uppercase tracking-wide font-display border-b-2 border-sky-100 pb-4 inline-block">
                            Community leaders
                        </h2>
                        <div className="bg-sky-50 border border-sky-100 p-8 rounded-2xl">
                            <p className="text-slate-700 leading-relaxed text-lg mb-4">
                                Want to talk before checking in? Uncle Young takes video calls with community leaders — no pitch, just answers. 
                            </p>
                            <p className="text-slate-800 font-medium text-lg">
                                Email <a href="mailto:office@youngworld.life" className="text-sky-600 hover:text-sky-700 font-bold transition-colors">office@youngworld.life</a> with <span className="font-bold">"Community call"</span> and your community's name.
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
