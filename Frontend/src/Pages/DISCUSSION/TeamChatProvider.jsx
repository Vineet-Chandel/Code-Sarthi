import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../auth/baseURL';
import { TeamChatContext } from './TeamChatContext';

export const TeamChatProvider = ({ children }) => {
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [teamWorkspace, setTeamWorkspace] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWorkspace = async (teamId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/teams/${teamId}/workspace`, {
        withCredentials: true
      });
      setTeamWorkspace(res.data);
      return res.data;
    } catch (err) {
      console.error("Failed to load team workspace:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const setActiveTeam = async (teamId) => {
    if (!teamId) {
      exitTeamMode();
      return;
    }
    setActiveTeamId(teamId);
    const workspace = await fetchWorkspace(teamId);
    if (workspace && workspace.generalConversationId) {
      setActiveConversationId(workspace.generalConversationId);
    }
  };

  const refreshWorkspace = async () => {
    if (activeTeamId) {
      await fetchWorkspace(activeTeamId);
    }
  };

  const setActiveConversation = (convoId) => {
    setActiveConversationId(convoId);
  };

  const exitTeamMode = () => {
    setActiveTeamId(null);
    setActiveConversationId(null);
    setTeamWorkspace(null);
  };

  return (
    <TeamChatContext.Provider
      value={{
        activeTeamId,
        activeConversationId,
        teamWorkspace,
        loading,
        setActiveTeam,
        setActiveConversation,
        exitTeamMode,
        refreshWorkspace,
        setTeamWorkspace
      }}
    >
      {children}
    </TeamChatContext.Provider>
  );
};

export default TeamChatProvider;
