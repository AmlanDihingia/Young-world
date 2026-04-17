import Link from "next/link";
import { ArrowDown, Shirt, Music, Camera } from "lucide-react";
import Navbar from '@/components/navbar';

export default function WaveTheWhite() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      {/* 
        ========================================
        HERO SECTION
        ========================================
      */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-60"
          >
            <source src="/videos/wavethewhite.mp4" type="video/mp4" />
          </video>
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 pb-12 w-full max-w-7xl mx-auto">

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-3 sm:mb-4 text-white drop-shadow-md">
            Wave the White
          </h1>

          <h2 className="text-lg sm:text-xl md:text-3xl font-medium mb-4 sm:mb-6 max-w-full sm:max-w-2xl text-neutral-200 px-2 drop-shadow-sm">
            A global movement for peace, unity, and joy powered by music.
          </h2>

          <div className="text-base sm:text-lg md:text-xl text-neutral-200 font-medium max-w-full sm:max-w-2xl mx-auto mb-8 sm:mb-10 text-center leading-relaxed px-2">
            <p className="inline sm:block">Wear or hold something white. Play the song. </p>
            <p className="inline sm:block">Move freely and share your moment. That&apos;s it.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4 mb-10 z-20 relative">
            <Link
              href="/login?mode=signup"
              className="inline-flex items-center justify-center bg-white/90 backdrop-blur-md text-black font-semibold py-4 px-8 rounded-full text-lg shadow-[0_8px_30px_rgb(255,255,255,0.12)] hover:bg-white hover:scale-105 transition-all w-full sm:w-auto border border-white/20"
            >
              Join the Movement
            </Link>
            <a
              href="#listen"
              className="inline-flex items-center justify-center bg-black/20 backdrop-blur-xl border border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/10 hover:border-white/50 transition-all w-full sm:w-auto shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              Listen to the Song
            </a>
          </div>

          <div className="mb-16 z-20 relative">
            <a
              href="https://www.instagram.com/explore/tags/wavethewhite/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-lg font-medium text-white hover:bg-white/10 transition-all shadow-sm"
            >
              #WaveTheWhite
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full text-center flex flex-col items-center justify-center text-xs md:text-sm text-neutral-300 uppercase tracking-widest space-y-1 z-20 drop-shadow-md">
            <p>Created by Uncle Young</p>
            <p>Powered by Young World Entertainment</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 md:bottom-24 z-20 animate-bounce">
          <a href="#how-it-works" className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg" aria-label="Scroll down">
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 
        ========================================
        HOW IT WORKS SECTION
        ========================================
      */}
      <section id="how-it-works" className="relative w-full py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900 overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neutral-800/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4 text-white drop-shadow-sm">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
              Three simple steps. No rules. No experience needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-16 h-16 bg-white/10 border border-white/20 shadow-inner rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Wear or hold something white</h3>
              <p className="text-neutral-400 leading-relaxed text-[15px]">
                A white t-shirt, a towel, a scarf, a flag — anything works.<br />
                There&apos;s no dress code. Just bring white into the frame.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-16 h-16 bg-white/10 border border-white/20 shadow-inner rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Use &quot;Wave the White&quot;</h3>
              <p className="text-neutral-400 leading-relaxed text-[15px]">
                Play the track on your speaker, headphones, or in the background.<br />
                Move however you feel — dance, skate, walk, paint, smile.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <div className="w-16 h-16 bg-white/10 border border-white/20 shadow-inner rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Post with #WaveTheWhite</h3>
              <p className="text-neutral-400 leading-relaxed text-[15px]">
                Film your clip.<br />
                Share it on Instagram, TikTok, or YouTube.<br />
                Tag <span className="text-white font-medium">#WaveTheWhite</span> so we can find you.
              </p>
            </div>

          </div>

          {/* Reinforcement Block */}
          <div className="max-w-4xl mx-auto text-center border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl p-10 md:p-14 mb-16 bg-white/5 backdrop-blur-2xl relative overflow-hidden">
            {/* Inner Glare Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <h4 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">That&apos;s it.</h4>
            <div className="text-lg md:text-xl text-neutral-300 space-y-2 font-medium">
              <p>No choreography. No location required.</p>
              <p>From your home to the beach to the streets —</p>
              <p className="font-semibold text-white mt-4 text-2xl drop-shadow-sm">peace can start anywhere.</p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login?mode=signup"
                className="bg-white/90 backdrop-blur-md text-black font-semibold py-3.5 px-8 rounded-full text-lg shadow-lg hover:bg-white hover:scale-105 transition-all w-full sm:w-auto"
              >
                Join the Movement
              </Link>
              <a
                href="#listen"
                className="bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 font-medium py-3.5 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-md w-full sm:w-auto"
              >
                <Music className="w-4 h-4" /> Listen to the Track
              </a>
            </div>
          </div>

          {/* 
            ========================================
            LISTEN TO THE SONG SECTION (Spotify Embed)
            ========================================
          */}
          <div id="listen" className="max-w-3xl mx-auto mt-24 scroll-mt-24">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2">
                The Anthem
              </h2>
              <p className="text-neutral-400">Press play to start the movement.</p>
            </div>

            <div className="w-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Embed provided by user */}
              <iframe
                data-testid="embed-iframe"
                style={{ borderRadius: "12px", border: 0 }}
                src="https://open.spotify.com/embed/track/4T9DqjaeGSb4c71boHRNgj?utm_source=generator"
                width="100%"
                height="352"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy">
              </iframe>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
