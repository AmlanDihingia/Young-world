import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="bg-[#222222] pt-16 pb-12 relative z-20 border-t border-[#333333]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-5">
                        <Link href="/" className="inline-block mb-6 group">
                            <div className="flex flex-col">
                                <span className="text-[#C49232] font-black text-xl tracking-tight leading-none group-hover:text-[#b0832d] transition-colors">YOUNG WORLD</span>
                                <span className="text-gray-500 text-[10px] font-bold tracking-[0.25em] mt-0.5 group-hover:text-gray-400 transition-colors">ENTERTAINMENT</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 font-medium text-sm leading-relaxed max-w-sm">
                            The home for the world&apos;s communities.<br />One world, many communities, no one left out.
                        </p>
                    </div>

                    {/* Navigation Columns Container */}
                    <div className="col-span-1 md:col-span-8 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {/* Discover */}
                        <div>
                            <h4 className="text-[#C49232] font-bold uppercase tracking-widest text-xs mb-6">Discover</h4>
                            <ul className="space-y-4">
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Events near you</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Categories</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Communities</Link></li>
                            </ul>
                        </div>

                        {/* Get Involved */}
                        <div>
                            <h4 className="text-[#C49232] font-bold uppercase tracking-widest text-xs mb-6">Get Involved</h4>
                            <ul className="space-y-4">
                                <li><Link href="/checkyourcommunityin" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">List your community</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Brands & partners</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">The movement</Link></li>
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h4 className="text-[#C49232] font-bold uppercase tracking-widest text-xs mb-6">Connect</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Instagram</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">office@youngworld.life</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">youngworld.life</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs font-medium">
                        © 2026 YWE Studios (OPC) Pvt. Ltd. - A registered company - CIN U73100AS2025OPC029355
                    </p>
                    <div className="text-gray-500 text-xs font-medium">
                        #WaveTheWhite
                    </div>
                </div>
            </div>
        </footer>
    )
}
