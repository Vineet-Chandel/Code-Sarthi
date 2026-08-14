import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTeamChat } from './TeamChatContext';
import { Crown, Folder, MessageSquare, ArrowLeft, ChevronDown, ChevronRight, Hash, Plus, MoreVertical } from 'lucide-react';
import CreateIssueModal from '../PROJECT-MANAGER/Issues/CreateIssueModal';

const TeamWorkspacePanel = () => {
  const { 
    teamWorkspace, 
    activeConversationId, 
    setActiveConversation, 
    exitTeamMode,
    refreshWorkspace
  } = useTeamChat();

  const navigate = useNavigate();
  const loggedUser = useSelector(store => store.user?.user?.DATA);
  const [expandedProjects, setExpandedProjects] = useState({});
  const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [copiedInviteCode, setCopiedInviteCode] = useState(false);
  const [openProjectMenuId, setOpenProjectMenuId] = useState(null);
  const [openIssueMenuId, setOpenIssueMenuId] = useState(null);
  const [linksModal, setLinksModal] = useState({ isOpen: false, title: '', links: [] });

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
      <div className="p-4 border-b border-white/5 flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button 
            onClick={exitTeamMode}
            className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Back to All Chats"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-sm truncate text-white leading-tight">{team.name}</h2>
            <span className="text-xs text-zinc-500">Team Workspace</span>
          </div>
        </div>

        {/* Three Dots Menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(prev => !prev)}
            className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 mt-1 w-40 bg-[#121212] border border-white/10 rounded-xl shadow-xl py-1 z-20">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowAboutModal(true);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  About Team
                </button>
                
                {(members.find(m => String(m._id) === String(loggedUser?._id))?.role === 'leader' ||
                  members.find(m => String(m._id) === String(loggedUser?._id))?.role === 'admin') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.clipboard.writeText(window.location.origin + '/invite/' + (team.inviteCode || ''));
                      setCopiedInviteCode(true);
                      setTimeout(() => {
                        setCopiedInviteCode(false);
                        setShowMenu(false);
                      }, 1500);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                  >
                    {copiedInviteCode ? 'Copied!' : 'Copy Invite Code'}
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/app/teams', { state: { teamId: team._id } });
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium border-t border-white/5"
                >
                  Settings
                </button>
              </div>
            </>
          )}
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
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors text-left group relative"
                  >
                    <button
                      onClick={() => toggleProject(project._id)}
                      className="flex items-center gap-2 min-w-0 flex-1"
                    >
                      <Folder className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="text-sm truncate font-medium">{project.title}</span>
                    </button>
                    <div className="flex items-center gap-1.5 shrink-0 relative">
                      {/* Project Three Dots Options */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenProjectMenuId(openProjectMenuId === project._id ? null : project._id);
                          setOpenIssueMenuId(null);
                        }}
                        className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Project Options"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>

                      {openProjectMenuId === project._id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setOpenProjectMenuId(null); }} />
                          <div className="absolute right-0 mt-6 w-32 bg-[#121212] border border-white/10 rounded-xl shadow-xl py-1 z-40 text-left">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenProjectMenuId(null);
                                setLinksModal({
                                  isOpen: true,
                                  title: `Project: ${project.title}`,
                                  links: project.links || []
                                });
                              }}
                              className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                            >
                              View Links
                            </button>
                          </div>
                        </>
                      )}

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
                            <div
                              key={issue._id}
                              className={`group/issue w-full flex items-center justify-between gap-1 relative rounded-lg text-left transition-all hover:bg-white/5
                                ${isIssueActive ? 'bg-white/5' : ''}
                              `}
                            >
                              <button
                                onClick={() => {
                                  if (issue.conversationId) {
                                    setActiveConversation(issue.conversationId);
                                  }
                                }}
                                className={`flex-1 flex flex-col gap-1 px-2.5 py-1.5 text-left transition-all
                                  ${isIssueActive 
                                    ? 'text-white font-medium' 
                                    : 'text-zinc-400 hover:text-white'}
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

                              {/* Issue Three Dots Options */}
                              <div className="relative shrink-0 pr-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenIssueMenuId(openIssueMenuId === issue._id ? null : issue._id);
                                    setOpenProjectMenuId(null);
                                  }}
                                  className="p-1 hover:bg-white/10 rounded text-zinc-500 hover:text-white transition-colors opacity-0 group-hover/issue:opacity-100 focus:opacity-100"
                                  title="Options"
                                >
                                  <MoreVertical className="w-3.5 h-3.5" />
                                </button>
                                
                                {openIssueMenuId === issue._id && (
                                  <>
                                    <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setOpenIssueMenuId(null); }} />
                                    <div className="absolute right-0 mt-6 w-32 bg-[#121212] border border-white/10 rounded-xl shadow-xl py-1 z-40 text-left">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setOpenIssueMenuId(null);
                                          setLinksModal({
                                            isOpen: true,
                                            title: `${issue.type.toUpperCase()}: ${issue.title}`,
                                            links: issue.links || []
                                          });
                                        }}
                                        className="w-full text-left px-3 py-2 text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                                      >
                                        View Links
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
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

      {/* About Team Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAboutModal(false)} />
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden text-white">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
            
            <div className="flex items-center gap-4 mb-6 mt-2">
              <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white text-2xl font-black shrink-0 overflow-hidden">
                {team.logo ? (
                  <img src={team.logo} className="w-full h-full object-cover" alt="" />
                ) : (
                  team.name?.[0]?.toUpperCase() || 'T'
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold">{team.name}</h3>
                <span className="text-xs text-zinc-500">Established {new Date(team.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Description / About</span>
                <p className="text-xs text-zinc-300 bg-zinc-950 p-4 rounded-xl border border-white/5 min-h-[60px] whitespace-pre-wrap font-medium leading-relaxed">
                  {team.description || "No description provided."}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Members</span>
                  <p className="text-xs font-semibold">{members.length} Active</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">Your Role</span>
                  <p className="text-xs font-semibold capitalize">
                    {members.find(m => String(m._id) === String(loggedUser?._id))?.role || 'Member'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 pt-6 mt-6 border-t border-white/5">
              <button
                type="button"
                onClick={() => setShowAboutModal(false)}
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-extrabold py-2.5 px-4 rounded-xl transition-all shadow-md text-xs tracking-wide"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Links Modal */}
      {linksModal.isOpen && (
        <div className="fixed inset-0 z-[260] flex items-center justify-center p-4 select-none">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setLinksModal({ isOpen: false, title: '', links: [] })} />
          <div className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden text-white">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
            
            <h3 className="text-sm font-bold truncate pr-6 mb-1 text-white">{linksModal.title}</h3>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-4 font-semibold">Attached Links</span>
            
            <div className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-none pr-1">
              {linksModal.links.length === 0 ? (
                <div className="text-xs text-zinc-500 text-center py-8">
                  No links attached.
                </div>
              ) : (
                linksModal.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-zinc-950 border border-white/5 hover:border-white/20 rounded-xl transition-all hover:bg-white/[0.02] text-left"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <span className="block text-xs font-semibold text-white truncate">{link.title}</span>
                      <span className="block text-[9px] text-zinc-500 truncate mt-0.5">{link.url}</span>
                    </div>
                    {link.category && (
                      <span className="text-[8px] uppercase tracking-widest px-1.5 py-0.5 border border-white/10 text-zinc-400 rounded-md font-mono shrink-0 font-bold">
                        {link.category}
                      </span>
                    )}
                  </a>
                ))
              )}
            </div>
            
            <div className="flex gap-3 pt-4 mt-4 border-t border-white/5">
              <button
                type="button"
                onClick={() => setLinksModal({ isOpen: false, title: '', links: [] })}
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-extrabold py-2 px-4 rounded-xl transition-all text-xs tracking-wide shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamWorkspacePanel;
