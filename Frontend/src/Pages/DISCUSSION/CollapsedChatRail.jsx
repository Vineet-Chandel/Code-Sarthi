import React from 'react';
import { useSelector } from 'react-redux';
import { MessageSquare } from 'lucide-react';
import { useTeamChat } from './TeamChatContext';

const CollapsedChatRail = () => {
  const { activeTeamId, setActiveTeam, exitTeamMode } = useTeamChat();
  const chats = useSelector(state => state.chats.users || []);
  const loggedUser = useSelector(store => store.user.user.DATA);

  // Filter only general team chats to get list of unique teams
  const teamChats = chats.filter(c => c.type === 'team_general');

  return (
    <div className="w-[56px] h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col items-center py-4 gap-4 overflow-y-auto scrollbar-none shrink-0">
      {/* Back to DM / default chat */}
      <button
        onClick={exitTeamMode}
        className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center text-zinc-500 hover:text-white shrink-0"
        title="Direct Messages"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Small subtle line */}
      <div className="w-6 h-[1px] bg-white/10 shrink-0" />

      {/* Team Avatars List */}
      <div className="flex flex-col items-center gap-3 w-full overflow-y-auto scrollbar-none flex-1">
        {teamChats.map(c => {
          const team = c.teamId;
          if (!team) return null;
          const isActive = team._id === activeTeamId;
          const unreadCount = c.unreadCounts?.find(item => item.user === loggedUser._id)?.count ?? 0;

          return (
            <button
              key={c._id}
              onClick={() => setActiveTeam(team._id)}
              className={`relative w-10 h-10 rounded-xl bg-zinc-950 border transition-all flex items-center justify-center text-sm font-black shrink-0
                ${isActive 
                  ? 'border-white text-white opacity-100' 
                  : 'border-white/5 text-zinc-500 opacity-60 hover:opacity-100 hover:border-white/20 hover:text-white'}
              `}
              title={team.name}
            >
              {team.logo ? (
                <img src={team.logo} className="w-full h-full object-cover rounded-xl" alt="" />
              ) : (
                team.name?.[0]?.toUpperCase() || 'T'
              )}
              
              {/* Monochromatic unread dot */}
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border border-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CollapsedChatRail;
