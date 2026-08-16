import { createContext, useContext } from 'react';

export const TeamChatContext = createContext(null);

export const useTeamChat = () => {
  const context = useContext(TeamChatContext);
  if (!context) {
    throw new Error('useTeamChat must be used within a TeamChatProvider');
  }
  return context;
};
