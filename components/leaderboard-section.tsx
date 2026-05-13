import { fetchLeaderboardData } from '@/utils/google-sheets'
import { Trophy, Medal, Crown } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface LeaderboardSectionProps {
    limit?: number;
    className?: string;
}

export default async function LeaderboardSection({ limit, className = "" }: LeaderboardSectionProps) {
    const allData = await fetchLeaderboardData()
    const leaderboard = limit ? allData.slice(0, limit) : allData

    return (
        <section className={`py-24 px-4 sm:px-6 lg:px-8 relative z-10 ${className}`}>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-8xl font-display font-light uppercase tracking-tight text-slate-800 mb-6 leading-none drop-shadow-sm">
                        Global <br /> Leaderboard
                    </h2>
                    <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">
                        Top creators bringing the heat. <br />
                        Rankings update daily based on engagement, creativity, and sauce.
                    </p>
                </div>

                <div className="bg-white border border-sky-100 rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(14,165,233,0.06)] backdrop-blur-sm">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-sky-50 text-xs font-bold uppercase tracking-widest text-slate-400 bg-sky-50/30">
                        <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                        <div className="col-span-6 md:col-span-7">Creator</div>
                        <div className="col-span-4 md:col-span-4 text-right">Final Score</div>
                    </div>

                    {/* List */}
                    <div className="divide-y divide-sky-50">
                        {leaderboard.map((creator, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-12 gap-4 p-6 items-center transition-colors hover:bg-sky-50 ${index === 0 ? 'bg-sky-100/50' : ''
                                    }`}
                            >
                                <div className="col-span-2 md:col-span-1 flex justify-center">
                                    {index === 0 && <Crown className="w-6 h-6 text-sky-500" />}
                                    {index === 1 && <Medal className="w-6 h-6 text-slate-400" />}
                                    {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
                                    {index > 2 && (
                                        <span className="text-xl font-medium font-display text-slate-400">
                                            {creator.rank}
                                        </span>
                                    )}
                                </div>

                                <div className="col-span-6 md:col-span-7">
                                    <div className="flex items-center gap-4">
                                        {/* Avatar Placeholder */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-sky-500 text-white shadow-sm' : 'bg-sky-100 text-sky-700'
                                            }`}>
                                            {creator.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-800 text-lg leading-none mb-1">{creator.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium">{creator.handle}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-4 md:col-span-4 text-right">
                                    <span className="text-2xl font-display font-light text-sky-600">
                                        {creator.score}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
