import React from 'react'

const ShowingGoals = () => {


    const goals = [
        {
            id: 1,
            name: "Complete React Mastery",
            status: "In Progress",
            progress: 72,
            targetDate: "2026-08-15",
            owner: "Vineet Chandel",
            following: true,
            lastUpdated: "2026-07-20T14:25:00Z",
            priority: "High",
            category: "Learning",
            description: "Finish advanced React concepts, hooks, optimization, and deployment.",
            milestones: 18,
            completedMilestones: 13,
            tags: ["React", "Frontend", "JavaScript"]
        },
        {
            id: 2,
            name: "Launch Resume Builder v2",
            status: "Completed",
            progress: 100,
            targetDate: "2026-07-10",
            owner: "Akash Sharma",
            following: true,
            lastUpdated: "2026-07-18T09:30:00Z",
            priority: "Critical",
            category: "Product",
            description: "Release the redesigned AI Resume Builder.",
            milestones: 12,
            completedMilestones: 12,
            tags: ["React", "Node.js", "AI"]
        },
        {
            id: 3,
            name: "Solve 300 DSA Problems",
            status: "In Progress",
            progress: 48,
            targetDate: "2026-09-30",
            owner: "Priya Verma",
            following: false,
            lastUpdated: "2026-07-19T18:10:00Z",
            priority: "Medium",
            category: "DSA",
            description: "Improve problem-solving for coding interviews.",
            milestones: 300,
            completedMilestones: 144,
            tags: ["DSA", "LeetCode"]
        },
        {
            id: 4,
            name: "Increase GitHub Contributions",
            status: "On Track",
            progress: 65,
            targetDate: "2026-12-31",
            owner: "Rohan Gupta",
            following: true,
            lastUpdated: "2026-07-21T08:15:00Z",
            priority: "Medium",
            category: "Open Source",
            description: "Maintain consistent daily commits and PRs.",
            milestones: 365,
            completedMilestones: 237,
            tags: ["GitHub", "Open Source"]
        },
        {
            id: 5,
            name: "Build AI Interview Platform",
            status: "At Risk",
            progress: 36,
            targetDate: "2026-10-05",
            owner: "Ananya Singh",
            following: true,
            lastUpdated: "2026-07-20T21:45:00Z",
            priority: "Critical",
            category: "Startup",
            description: "Develop an AI-powered mock interview platform.",
            milestones: 25,
            completedMilestones: 9,
            tags: ["AI", "MERN", "Interview"]
        },
        {
            id: 6,
            name: "Learn System Design",
            status: "Not Started",
            progress: 0,
            targetDate: "2026-09-20",
            owner: "Rahul Mishra",
            following: false,
            lastUpdated: "2026-07-17T11:05:00Z",
            priority: "High",
            category: "Backend",
            description: "Study scalable distributed systems.",
            milestones: 20,
            completedMilestones: 0,
            tags: ["System Design", "Backend"]
        },
        {
            id: 7,
            name: "Deploy Portfolio Website",
            status: "Completed",
            progress: 100,
            targetDate: "2026-07-05",
            owner: "Neha Kapoor",
            following: true,
            lastUpdated: "2026-07-15T16:20:00Z",
            priority: "Low",
            category: "Portfolio",
            description: "Deploy portfolio with custom domain and analytics.",
            milestones: 8,
            completedMilestones: 8,
            tags: ["Portfolio", "Vercel"]
        },
        {
            id: 8,
            name: "Read 20 Technical Books",
            status: "On Hold",
            progress: 40,
            targetDate: "2026-12-01",
            owner: "Aman Yadav",
            following: false,
            lastUpdated: "2026-07-12T19:00:00Z",
            priority: "Low",
            category: "Self Growth",
            description: "Read books covering software engineering and leadership.",
            milestones: 20,
            completedMilestones: 8,
            tags: ["Books", "Learning"]
        },
        {
            id: 9,
            name: "Contribute to Open Source",
            status: "In Progress",
            progress: 58,
            targetDate: "2026-08-30",
            owner: "Sneha Jain",
            following: true,
            lastUpdated: "2026-07-21T07:45:00Z",
            priority: "High",
            category: "Community",
            description: "Make meaningful contributions to popular repositories.",
            milestones: 15,
            completedMilestones: 9,
            tags: ["GitHub", "OSS"]
        },
        {
            id: 10,
            name: "Master TypeScript",
            status: "In Progress",
            progress: 82,
            targetDate: "2026-08-10",
            owner: "Harsh Patel",
            following: true,
            lastUpdated: "2026-07-20T13:40:00Z",
            priority: "High",
            category: "Learning",
            description: "Become proficient with advanced TypeScript concepts.",
            milestones: 30,
            completedMilestones: 25,
            tags: ["TypeScript", "Frontend"]
        }
    ];
    return (
        <div>
            {goals.length === 0 ? (

                <div>

                </div>
            ) : (
                <div className='flex flex-col gap-2'>
                    {goals.map((items, idx) => (
                        <div key={idx} className="flex gap-1">
                            <div>
                                {items.id}
                            </div>
                            <div>
                                {items.name}
                            </div>
                            <div>
                                {items.status}
                            </div>
                            <div>
                                {items.progress}
                            </div>
                            <div>
                                {items.targetDate}
                            </div>
                            <div>
                                {items.owner}
                            </div>
                            <div>
                                {items.following}
                            </div>
                            <div>
                                {items.lastUpdated}
                            </div>
                            <div>
                                {items.priority}
                            </div>
                            <div>
                                {items.category}
                            </div>
                            <div>
                                {items.description}
                            </div>
                            <div>
                                {items.milestones}
                            </div>
                            <div>
                                {items.completedMilestones}
                            </div>
                            <div>
                                {items.tags}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ShowingGoals