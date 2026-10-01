import Link from 'next/link'
import Image from 'next/image'

export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-sky-50/30 to-sky-100/50 relative overflow-hidden px-6 pt-32 pb-12 md:pt-24">
            {/* Ambient background blobs */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-sky-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/3 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-yellow-50/40 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">


                {/* Congratulatory Message (Moved to top) */}
                <div className="max-w-2xl text-center mb-12">
                    <p className="text-4xl md:text-5xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-button)] to-yellow-400 mb-6 drop-shadow-sm uppercase tracking-tight">
                        Congratulations !
                    </p>
                    <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto">
                        Your Community is now one of the <span className="font-bold text-sky-700">Founding Communities</span> of The World&apos;s Biggest Friendship Roll Call. We will use your registered email and phone no for further communications.
                    </p>
                </div>

                {/* Call to Action Card */}
                <div className="bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl px-8 py-12 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.15)] w-full mb-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <p className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-6">On Friendship Day</p>
                        <p className="text-slate-800 text-3xl md:text-4xl font-light leading-relaxed mb-3">
                            Wear White. Wave White.
                        </p>
                        <p className="text-slate-800 text-3xl md:text-4xl font-semibold leading-relaxed mb-8">
                            Pass It On.
                        </p>
                        <p className="text-slate-500 text-lg tracking-wide font-medium">
                            The world is checking in. Nobody should be left out .
                        </p>
                    </div>
                </div>

                {/* Thank You Message & Heart (Moved below card) */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-slate-800 mb-4 leading-tight">
                        Thank you for making sure your<br />community isn&apos;t left out
                    </h2>
                    <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-10">
                        when the world checks in.
                    </p>
                    {/* Heart at the end */}
                    <div className="text-6xl animate-pulse drop-shadow-lg">🤍</div>
                </div>

                {/* Divider */}
                <div className="w-16 h-px bg-slate-200 mb-12" />

                {/* Social Links */}
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Stay Connected</p>
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full">
                    <a
                        href="https://www.instagram.com/uncleyoung94/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all text-slate-700 text-sm font-medium shadow-sm hover:shadow-md group"
                    >
                        <svg className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Follow Uncle Young
                    </a>

                    <a
                        href="https://www.instagram.com/youngworld.life/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all text-slate-700 text-sm font-medium shadow-sm hover:shadow-md group"
                    >
                        <svg className="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Follow YWE on Instagram
                    </a>

                    <a
                        href="https://www.youtube.com/channel/UCZXQF9XIs1vV5QwQpSBrrcw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white hover:border-sky-400 hover:bg-sky-50 transition-all text-slate-700 text-sm font-medium shadow-sm hover:shadow-md group"
                    >
                        <svg className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                        </svg>
                        Subscribe to YouTube
                    </a>

                    <span
                        className="flex items-center gap-3 px-6 py-3 rounded-full border border-sky-100 bg-white text-slate-700 text-sm font-medium shadow-sm opacity-40 cursor-not-allowed pointer-events-none select-none"
                    >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                    </span>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="mt-16 text-xs font-medium uppercase tracking-widest text-slate-400 hover:text-sky-500 transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}
