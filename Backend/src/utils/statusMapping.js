// utils/statusMapping.js

const ISSUE_TO_GOAL_STATUS = {
  open: 'Not Started',
  in_progress: 'In Progress',
  done: 'Completed'
};

const GOAL_TO_ISSUE_STATUS = {
  "Not Started": 'open',
  "In Progress": 'in_progress',
  "On Track": 'in_progress',
  "At Risk": 'in_progress',
  "On Hold": 'open',
  "Completed": 'done',
  "Removed": 'open',
  "Reassigned": 'open'
};

const ISSUE_TO_GOAL_PRIORITY = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Critical'
};

function mapIssueStatusToGoalStatus(issueStatus) {
  return ISSUE_TO_GOAL_STATUS[issueStatus] || 'Not Started';
}

function mapGoalStatusToIssueStatus(goalStatus) {
  return GOAL_TO_ISSUE_STATUS[goalStatus] || 'open';
}

function mapIssuePriorityToGoalPriority(issuePriority) {
  return ISSUE_TO_GOAL_PRIORITY[issuePriority] || 'Medium';
}

module.exports = {
  mapIssueStatusToGoalStatus,
  mapGoalStatusToIssueStatus,
  mapIssuePriorityToGoalPriority
};
