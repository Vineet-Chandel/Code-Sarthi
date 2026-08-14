import React, { useState } from 'react';
import { useTeamChat } from './TeamChatContext';
import { Crown, Folder, MessageSquare, ArrowLeft, ChevronDown, ChevronRight, Hash, Plus } from 'lucide-react';
import CreateIssueModal from '../PROJECT-MANAGER/Issues/CreateIssueModal';

const TeamWorkspacePanel = () => {
  const { 
    teamWorkspace, 
    activeConversationId, 
    setActiveConversation, 
    exitTeamMode,
    refreshWorkspace
  } = useTeamChat();

  const [expandedProjects, setExpandedProjects] = useState({});
  const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  if (!teamWorkspace) {
    return (
      <div className="w-[300px] h-full bg-[#121212] border-r border-white/5 flex items-center justify-center text-zinc-500">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  const { team, members, projects, generalConversationId } = teamWorkspace;

  const toggleProject = (projectId) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Find owner/leader of the team
  const leader = members.find(m => m.role === 'leader' || String(m._id) === String(team.ownerId));

  return (
    <div className="w-[300px] h-full bg-[#121212] border-r border-white/5 flex flex-col shrink-0 text-white select-none">
      {/* Header / Nav */}
      <div className="p-4 border-b border-white/5 flex items-center gap-3">
        <button 
          onClick={exitTeamMode}
          className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
          title="Back to All Chats"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-sm truncate text-white leading-tight">{team.name}</h2>
          <span className="text-xs text-zinc-500">Team Workspace</span>
        </div>
      </div>

      {/* Member Avatar Stack & Leader crown */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex -space-x-2 overflow-hidden">
          {members.slice(0, 4).map((member, i) => (
            <img
              key={member._id || i}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[#121212] object-cover"
              src={member.photoUrl?.url || 'https://via.placeholder.com/150'}
              alt={`${member.firstName} ${member.lastName}`}
              title={`${member.firstName} ${member.lastName} (${member.role})`}
            />
          ))}
          {members.length > 4 && (
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-zinc-800 ring-2 ring-[#121212] text-[10px] font-bold text-zinc-400">
              +{members.length - 4}
            </div>
          )}
        </div>
        {leader && (
          <div className="flex items-center gap-1 text-xs text-zinc-400" title={`Leader: ${leader.firstName}`}>
            <Crown className="w-3.5 h-3.5 text-white opacity-80" />
            <span className="max-w-[80px] truncate">{leader.firstName}</span>
          </div>
        )}
      </div>

      {/* Workspace Menu List */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-4 scrollbar-none">
        
        {/* Pinned General Chat */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 px-2">Pinned</span>
          <button
            onClick={() => setActiveConversation(generalConversationId)}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-all text-left
              ${activeConversationId === generalConversationId 
                ? 'bg-white/10 text-white font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'}
            `}
          >
            <Hash className="w-4 h-4 text-zinc-500 shrink-0" />
            <span className="truncate">general-chat</span>
          </button>
        </div>

        {/* Projects & Issues Accordion */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">Projects & Issues</span>
            <button
              onClick={() => {
                setSelectedProjectId(null); // No preselected project -> shows selector dropdown
                setIsCreateIssueOpen(true);
              }}
              className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors"
              title="Create Issue/Problem/Feature"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          
          {projects.length === 0 ? (
            <div className="text-xs text-zinc-600 text-center py-4">
              No active projects yet.
            </div>
          ) : (
            projects.map(project => {
              const isExpanded = !!expandedProjects[project._id];
              return (
                <div key={project._id} className="flex flex-col">
                  {/* Project Header Row */}
                  <div
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-left"
                  >
                    <button
                      onClick={() => toggleProject(project._id)}
                      className="flex items-center gap-2 min-w-0 flex-1"
                    >
                      <Folder className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="text-sm truncate font-medium">{project.title}</span>
                    </button>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => toggleProject(project._id)}>
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Issues List under Project */}
                  {isExpanded && (
                    <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l border-white/5 ml-4 mt-0.5">
                      {project.issues?.length === 0 ? (
                        <div className="text-[11px] text-zinc-600 py-1 pl-2">
                          No issues created.
                        </div>
                      ) : (
                        project.issues?.map(issue => {
                          const isIssueActive = activeConversationId === issue.conversationId;
                          
                          // Monochrome Status styling (border/opacity based)
                          let statusLabel = issue.status;
                          let statusClass = "border border-white/10 text-zinc-500";
                          if (issue.status === 'in_progress') {
                            statusClass = "border border-white/30 text-zinc-300";
                          } else if (issue.status === 'done') {
                            statusClass = "bg-white/10 text-zinc-400 line-through border-transparent";
                          }

                          return (
                            <button
                              key={issue._id}
                              onClick={() => {
                                if (issue.conversationId) {
                                  setActiveConversation(issue.conversationId);
                                }
                              }}
                              className={`w-full flex flex-col gap-1 px-2.5 py-1.5 rounded-lg text-left transition-all
                                ${isIssueActive 
                                  ? 'bg-white/5 text-white font-medium' 
                                  : 'text-zinc-400 hover:text-white hover:bg-white/5'}
                              `}
                            >
                              <div className="flex items-start gap-1.5 justify-between w-full">
                                <span className="text-xs line-clamp-2 break-all flex-1 pr-1">{issue.title}</span>
                                {isIssueActive && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 shrink-0" />}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-mono ${statusClass}`}>
                                  {statusLabel}
                                </span>
                                <span className="text-[10px] text-zinc-600 capitalize">
                                  {issue.type}
                                </span>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

        </div>

      </div>

      <CreateIssueModal
        isOpen={isCreateIssueOpen}
        onClose={() => {
          setIsCreateIssueOpen(false);
          setSelectedProjectId(null);
        }}
        teamId={team._id}
        projectId={selectedProjectId}
        projects={projects}
        onSuccess={() => {
          refreshWorkspace();
        }}
      />
    </div>
  );
};

export default TeamWorkspacePanel;
