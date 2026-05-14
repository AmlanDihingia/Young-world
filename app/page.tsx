import Link from "next/link";
import { ArrowDown, Shirt, Music, Camera } from "lucide-react";
import Navbar from '@/components/navbar';

export default function WaveTheWhite() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-sky-200 selection:text-sky-900">
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
          {/* Subtle overlay to ensure text readability but keep it light and cinematic */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-sky-50/40 backdrop-blur-[2px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-32 pb-24 w-full max-w-7xl mx-auto">

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight mb-4 sm:mb-6 text-slate-800 drop-shadow-sm">
            Wave the White
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-normal mb-6 sm:mb-8 max-w-full sm:max-w-3xl text-slate-600 px-2 leading-relaxed">
            A global movement for peace, unity, and joy powered by music.
          </h2>

          <div className="text-base sm:text-lg md:text-xl text-slate-500 font-light max-w-full sm:max-w-2xl mx-auto mb-10 sm:mb-14 text-center leading-relaxed px-2">
            <p className="inline sm:block">Wear or hold something white. Play the song. </p>
            <p className="inline sm:block">Move freely and share your moment. That&apos;s it.</p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto mt-4 mb-16 z-20 relative">
            <Link
              href="/login?mode=signup"
              className="inline-flex items-center justify-center bg-sky-500 text-white font-medium py-4 px-10 rounded-full text-lg shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:scale-105 transition-all w-full sm:w-auto border border-sky-400"
            >
              Join the Movement
            </Link>
            <a
              href="#listen"
              className="inline-flex items-center justify-center bg-white/80 backdrop-blur-xl border border-gray-200 text-slate-800 font-medium py-4 px-10 rounded-full text-lg hover:bg-white hover:border-sky-200 hover:text-sky-700 transition-all w-full sm:w-auto shadow-sm"
            >
              Listen to the Song
            </a>
            <a
              href="#watch"
              className="inline-flex items-center justify-center bg-white/80 backdrop-blur-xl border border-gray-200 text-slate-800 font-medium py-4 px-10 rounded-full text-lg hover:bg-white hover:border-sky-200 hover:text-sky-700 transition-all w-full sm:w-auto shadow-sm"
            >
              Watch the Wave
            </a>
          </div>

          <div className="mb-20 z-20 relative">
            <a
              href="https://www.instagram.com/explore/tags/wavethewhite/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-sky-50/50 backdrop-blur-md border border-sky-100 text-lg font-light text-slate-600 hover:bg-sky-50 hover:text-sky-700 transition-all shadow-sm"
            >
              #WaveTheWhite
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="absolute bottom-6 md:bottom-10 left-0 w-full text-center flex flex-col items-center justify-center text-xs md:text-sm text-slate-400 uppercase tracking-widest space-y-1 z-20">
            <p>Created by Uncle Young</p>
            <p>Powered by Young World Entertainment</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 md:bottom-24 z-20 animate-bounce">
          <a href="#the-movement" className="w-12 h-12 rounded-full bg-white/60 backdrop-blur-md border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-white hover:text-sky-600 transition-all shadow-md" aria-label="Scroll down">
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 
        ========================================
        THE MOVEMENT SECTION
        ========================================
      */}
      <section id="the-movement" className="w-full py-28 md:py-40 bg-white text-slate-800 border-t border-sky-50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tight mb-8 text-slate-800">
            The Movement
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
            Wave the White is a global creator movement built around unity, creativity, humanity, and participation.
          </p>

        </div>
      </section>

      {/* 
        ========================================
        HOW IT WORKS SECTION
        ========================================
      */}
      <section id="how-it-works" className="relative w-full py-28 md:py-40 bg-sky-50/30 text-slate-800 border-t border-white overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tight mb-4 text-slate-800 drop-shadow-sm">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light">
              Three simple steps. No rules. No experience needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group bg-white border border-sky-50 rounded-3xl p-10 hover:shadow-[0_8px_40px_rgba(14,165,233,0.06)] hover:border-sky-100 transition-all duration-500">
              <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-full flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal mb-4 tracking-tight text-slate-700">Wear or hold something white</h3>
              <p className="text-slate-500 font-light leading-relaxed text-[15px]">
                A white t-shirt, a towel, a scarf, a flag — anything works.<br />
                There&apos;s no dress code. Just bring white into the frame.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group bg-white border border-sky-50 rounded-3xl p-10 hover:shadow-[0_8px_40px_rgba(14,165,233,0.06)] hover:border-sky-100 transition-all duration-500">
              <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-full flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal mb-4 tracking-tight text-slate-700">Use &quot;Wave the White&quot;</h3>
              <p className="text-slate-500 font-light leading-relaxed text-[15px]">
                Play the track on your speaker, headphones, or in the background.<br />
                Move however you feel — dance, skate, walk, paint, smile.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group bg-white border border-sky-50 rounded-3xl p-10 hover:shadow-[0_8px_40px_rgba(14,165,233,0.06)] hover:border-sky-100 transition-all duration-500">
              <div className="w-16 h-16 bg-sky-50 border border-sky-100 rounded-full flex items-center justify-center mb-6 text-sky-600 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-normal mb-4 tracking-tight text-slate-700">Post with #WaveTheWhite</h3>
              <p className="text-slate-500 font-light leading-relaxed text-[15px]">
                Film your clip.<br />
                Share it on Instagram, TikTok, or YouTube.<br />
                Tag <span className="text-sky-600 font-medium">#WaveTheWhite</span> so we can find you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 
        ========================================
        LIVE CITY WALL SECTION
        ========================================
      */}
      <section className="w-full py-28 md:py-40 bg-gradient-to-b from-white to-sky-50/50 border-t border-sky-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block bg-sky-100 text-sky-800 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
              Coming Soon
            </div>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tight mb-6 text-slate-800">
              Live City Wall
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
              The wave is spreading. Watch creators from around the globe join the movement in real-time.
            </p>
          </div>

          {/* City Wall Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {[
              { name: "Kathmandu", delay: "0s", image: "https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Shillong", delay: "0.2s", image: "https://images.unsplash.com/photo-1625826415766-001bd75aaf52?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Colombo", delay: "0.4s", image: "https://images.unsplash.com/photo-1623595289196-007a22dd8560?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Bali", delay: "0.6s", image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
              { name: "Guwahati", delay: "0.8s", image: "https://images.unsplash.com/photo-1611336814186-914161b9bdb6?q=80&w=3135&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
            ].map((city, idx) => (
              <div key={idx} className="flex flex-col gap-3 group">
                <div className="relative aspect-[9/16] bg-sky-100/50 rounded-3xl overflow-hidden shadow-sm border border-sky-100 group-hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] group-hover:-translate-y-1 transition-all duration-500">
                  {/* City Background Image */}
                  <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/10 to-transparent z-10"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-40 z-10 text-white group-hover:opacity-80 transition-opacity">
                    <svg className="w-12 h-12 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-5 left-5 right-5 z-20 flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-sky-100 drop-shadow-md mb-1">Coming Soon</span>
                    <h3 className="text-white font-medium text-xl tracking-wide drop-shadow-md">
                      {city.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================
        FEATURED CREATOR REELS SECTION
        ========================================
      */}
      <section className="w-full py-28 md:py-40 bg-white text-slate-800 border-t border-sky-50 overflow-hidden relative">
        {/* Dynamic Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/40 rounded-full blur-[150px] translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <div className="inline-block bg-sky-100 text-sky-800 border border-sky-200 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Featured
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight mb-6 drop-shadow-sm text-slate-800">
                Creator Reels
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
                Best clips, emotional edits, and city waves. Experience the energy.
              </p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky-600 hover:text-sky-800 transition-colors group pb-2 border-b-2 border-sky-100 hover:border-sky-500">
              Watch All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Reels Carousel/Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { title: "The Best of NYC", type: "City Wave", views: "1.2M", delay: "0s" },
              { title: "Moments of Peace", type: "Emotional Edit", views: "850K", delay: "0.2s" },
              { title: "Skating the White", type: "Action", views: "2.1M", delay: "0.4s" },
              { title: "Global Montage", type: "Best Reel", views: "3.5M", delay: "0.6s" },
            ].map((reel, idx) => (
              <div key={idx} className="group relative aspect-[9/16] bg-sky-50 rounded-3xl overflow-hidden cursor-pointer shadow-md border border-sky-100 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] hover:border-sky-300 transition-all duration-500 hover:-translate-y-2">
                
                {/* Simulated Video Background */}
                <div className="absolute inset-0 bg-sky-200/50 animate-pulse" style={{ animationDelay: reel.delay }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/60 group-hover:scale-110 group-hover:bg-white group-hover:text-sky-500 transition-all duration-500 text-white shadow-lg">
                    <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-5 right-5 z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-sky-500 text-white px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                      {reel.type}
                    </span>
                    <span className="text-[10px] font-bold text-sky-100 drop-shadow-md">
                      {reel.views} Views
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-white leading-tight drop-shadow-md">
                    {reel.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================
        JOIN THE MOVEMENT SECTION
        ========================================
      */}
      <section id="join" className="relative w-full py-28 md:py-40 bg-sky-50/30 text-slate-800 border-t border-white overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-100/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">

          {/* Reinforcement Block */}
          <div className="max-w-4xl mx-auto text-center border border-sky-50 shadow-[0_8px_40px_rgba(14,165,233,0.06)] rounded-3xl p-10 md:p-14 mb-16 bg-white relative overflow-hidden">
            {/* Inner Glare Effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-sky-50/50 to-transparent pointer-events-none"></div>

            <h4 className="text-3xl md:text-4xl font-light mb-6 tracking-tight text-slate-800">That&apos;s it.</h4>
            <div className="text-lg md:text-xl text-slate-500 space-y-2 font-light">
              <p>No choreography. No location required.</p>
              <p>From your home to the beach to the streets —</p>
              <p className="font-normal text-sky-600 mt-4 text-2xl drop-shadow-sm">peace can start anywhere.</p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login?mode=signup"
                className="bg-sky-500 text-white font-medium py-3.5 px-8 rounded-full text-lg shadow-[0_4px_14px_rgba(14,165,233,0.39)] hover:bg-sky-600 hover:scale-105 transition-all w-full sm:w-auto"
              >
                Join the Movement
              </Link>
              <a
                href="#listen"
                className="bg-sky-50 border border-sky-100 text-sky-700 hover:bg-sky-100 font-medium py-3.5 px-8 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm w-full sm:w-auto"
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
              <h2 className="text-3xl md:text-4xl font-light uppercase tracking-tight text-slate-800 mb-2">
                The Anthem
              </h2>
              <p className="text-slate-500 font-light">Press play to start the movement.</p>
            </div>

            <div className="w-full bg-sky-50/50 rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(14,165,233,0.06)] border border-sky-100">
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
