import MemberActivityChart from './MemberActivityChart';
import ContributionTrendChart from './ContributionTrendChart';
import CompletionRateChart from './CompletionRateChart';
import AssignmentSplitChart from './AssignmentSplitChart';
import IdleMembersList from './IdleMembersList';
import ProjectBreakdownCharts from './ProjectBreakdownCharts';

const AnalyticsDashboard = ({ teamId }) => {
    if (!teamId) return null;

    return (
        <div className="w-full pb-16 space-y-6 animate-in fade-in duration-300">
            <div className="bg-[#121215] border border-white/10 rounded-2xl p-6 bg-gradient-to-r from-[#534AB7]/10 via-transparent to-transparent">
                <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                    <svg className="w-6 h-6 text-[#A7A0F8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Team Contribution & Activity Intelligence
                </h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                    Real-time aggregation of elapsed working time, task follow-through rates, assignment initiative, and idle member identification. All metrics are team-scoped and transparent to active members.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* View 1 & View 2: Time Contribution Intelligence */}
                <MemberActivityChart teamId={teamId} />
                <ContributionTrendChart teamId={teamId} />

                {/* View 3 & View 4: Output & Initiative Intelligence */}
                <CompletionRateChart teamId={teamId} />
                <AssignmentSplitChart teamId={teamId} />

                {/* View 5 & View 6: Engagement & Portfolio Health */}
                <IdleMembersList teamId={teamId} />
                <ProjectBreakdownCharts teamId={teamId} />
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
