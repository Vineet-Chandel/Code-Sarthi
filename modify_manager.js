const fs = require('fs');
const filePath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Pages/Project-Manager.jsx';

let code = fs.readFileSync(filePath, 'utf8');

// 1. Add import
if (!code.includes('import ProjectKanbanBoard')) {
    code = code.replace(
        "import BASE_URL from './auth/baseURL';",
        "import BASE_URL from './auth/baseURL';\nimport ProjectKanbanBoard from './PROJECT-MANAGER/Projects/ProjectKanbanBoard';"
    );
}

// 2. Add state
code = code.replace(
    "const [userTeams, setUserTeams] = useState([]);",
    "const [userTeams, setUserTeams] = useState([]);\n    const [teamProjects, setTeamProjects] = useState([]);\n    const [selectedProjectId, setSelectedProjectId] = useState(projectId || 'all');"
);

// 3. Update useEffect dependency
code = code.replace(
    "}, [activeTeamId, projectId, timeRange]);",
    "}, [activeTeamId, selectedProjectId, timeRange]);"
);

// 4. Update fetchAllData project logic
const oldProjectLogic = `            // NOTE: Currently aggregating issue metrics client-side by fetching issue lists across team projects.
            // A dedicated backend aggregation endpoint (e.g., /teams/:teamId/analytics/issue-flow) is recommended for optimal performance at scale.
            let issuesList = [];
            const projectList = projectsRes.data.projects || [];
            if (projectId) {
                const pRes = await axios.get(\`\${BASE_URL}/teams/\${activeTeamId}/projects/\${projectId}/issues\`, { withCredentials: true }).catch(() => null);
                if (pRes?.data?.issues) issuesList = pRes.data.issues;
                const currentP = projectList.find(p => String(p._id) === String(projectId));
                if (currentP) setProjectInfo(currentP);
            } else if (projectList.length > 0) {
                const issuePromises = projectList.map(p =>
                    axios.get(\`\${BASE_URL}/teams/\${activeTeamId}/projects/\${p._id}/issues\`, { withCredentials: true })
                        .catch(() => ({ data: { issues: [] } }))
                );
                const issueResults = await Promise.all(issuePromises);
                issuesList = issueResults.flatMap(r => r.data.issues || []);
            }
            setAllIssues(issuesList);`;

const newProjectLogic = `            // NOTE: Currently aggregating issue metrics client-side by fetching issue lists across team projects.
            let issuesList = [];
            const projectList = projectsRes.data.projects || [];
            setTeamProjects(projectList);

            if (selectedProjectId && selectedProjectId !== 'all') {
                const pRes = await axios.get(\`\${BASE_URL}/teams/\${activeTeamId}/projects/\${selectedProjectId}/issues\`, { withCredentials: true }).catch(() => null);
                if (pRes?.data?.issues) issuesList = pRes.data.issues;
                const currentP = projectList.find(p => String(p._id) === String(selectedProjectId));
                if (currentP) setProjectInfo(currentP);
            } else if (projectList.length > 0) {
                const issuePromises = projectList.map(p =>
                    axios.get(\`\${BASE_URL}/teams/\${activeTeamId}/projects/\${p._id}/issues\`, { withCredentials: true })
                        .catch(() => ({ data: { issues: [] } }))
                );
                const issueResults = await Promise.all(issuePromises);
                issuesList = issueResults.flatMap(r => r.data.issues || []);
                setProjectInfo(null);
            }
            setAllIssues(issuesList);`;

code = code.replace(oldProjectLogic, newProjectLogic);

// 5. Update header UI
const oldHeaderUI = `                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 flex flex-wrap items-center gap-2">
                        {!propTeamId && userTeams.length > 0 ? (
                            <select
                                value={activeTeamId || ''}
                                onChange={(e) => setActiveTeamId(e.target.value)}
                                className="bg-black text-white font-black px-4 py-2 rounded-xl focus:outline-none cursor-pointer shadow-inner"
                            >
                                {userTeams.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>
                        ) : (
                            <span>{teamInfo?.name || "Workspace Team"}</span>
                        )}
                        {projectInfo && <span className="text-zinc-500 font-normal text-lg">/ {projectInfo.title}</span>}
                    </h1>`;

const newHeaderUI = `                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 flex flex-wrap items-center gap-3">
                        {!propTeamId && userTeams.length > 0 ? (
                            <select
                                value={activeTeamId || ''}
                                onChange={(e) => {
                                    setActiveTeamId(e.target.value);
                                    setSelectedProjectId('all');
                                }}
                                className="bg-black text-white font-black px-4 py-2 rounded-xl focus:outline-none cursor-pointer shadow-inner"
                            >
                                {userTeams.map(t => (
                                    <option key={t._id} value={t._id}>{t.name}</option>
                                ))}
                            </select>
                        ) : (
                            <span>{teamInfo?.name || "Workspace Team"}</span>
                        )}
                        
                        {teamProjects.length > 0 && (
                            <>
                                <span className="text-zinc-600">/</span>
                                <select
                                    value={selectedProjectId}
                                    onChange={(e) => setSelectedProjectId(e.target.value)}
                                    className="bg-[#111111] text-zinc-300 font-bold px-3 py-1.5 rounded-lg border border-white/[0.08] focus:outline-none cursor-pointer text-sm shadow-sm"
                                >
                                    <option value="all">All Projects</option>
                                    {teamProjects.map(p => (
                                        <option key={p._id} value={p._id}>{p.title}</option>
                                    ))}
                                </select>
                            </>
                        )}
                    </h1>`;

code = code.replace(oldHeaderUI, newHeaderUI);

// 6. Conditionally render the sections
const startSectionA = '{/* 3. CHARTS GRID — SECTION A: CONTRIBUTION ANALYSIS */}';

const newConditionalRender = `            {selectedProjectId !== 'all' ? (
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#A7A0F8] font-mono pl-1 border-l-2 border-[#534AB7]">
                        Project Kanban Tracking
                    </div>
                    <ProjectKanbanBoard issues={allIssues} />
                </div>
            ) : (
                <>
                    {/* 3. CHARTS GRID — SECTION A: CONTRIBUTION ANALYSIS */}`;

code = code.replace(startSectionA, newConditionalRender);

// Add the closing tags for the conditional render right before the end of the return statement
code = code.replace('        </div>\n    );\n};\n\nexport default ProjectManager;', '                </>\n            )}\n        </div>\n    );\n};\n\nexport default ProjectManager;');


fs.writeFileSync(filePath, code);
console.log('Project-Manager.jsx updated successfully.');
