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
                            <div className="relative w-36 h-10">
                                <Image
                                    src="/logo.png"
                                    alt="Young World Logo"
                                    fill
                                    sizes="144px"
                                    className="object-contain object-left group-hover:scale-105 transition-transform duration-300"
                                />
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
                                <li><Link href="/communities" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Communities</Link></li>
                                <li><Link href="/#explore" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Categories</Link></li>
                                <li><Link href="/about" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">About Us</Link></li>
                            </ul>
                        </div>

                        {/* Get Involved */}
                        <div>
                            <h4 className="text-[#C49232] font-bold uppercase tracking-widest text-xs mb-6">Get Involved</h4>
                            <ul className="space-y-4">
                                <li><Link href="/checkyourcommunityin" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">List your community</Link></li>
                                <li><Link href="/#partners" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Brands & partners</Link></li>
                                <li><Link href="/#movement" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">The movement</Link></li>
                            </ul>
                        </div>

                        {/* Connect & Legal */}
                        <div>
                            <h4 className="text-[#C49232] font-bold uppercase tracking-widest text-xs mb-6">Connect & Legal</h4>
                            <ul className="space-y-4">
                                <li><a href="https://www.instagram.com/youngworld.life/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Instagram</a></li>
                                <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Contact Us</Link></li>
                                <li><Link href="/terms-of-participation" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Terms of Participation</Link></li>
                                <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs font-medium">
                        © 2026 YWE Studios (OPC) Pvt. Ltd. - A registered company - CIN U73100AS2025OPC029355
                    </p>
                    <div className="flex items-center gap-6 text-gray-500 text-xs font-medium">
                        <Link href="/terms-of-participation" className="hover:text-gray-300 transition-colors">Terms</Link>
                        <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
                        <span>#WaveTheWhite</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
