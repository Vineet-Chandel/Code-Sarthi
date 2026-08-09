const fs = require('fs');
const filePath = '/Users/vineetchandel/Developer/CodeSarthi/Frontend/src/Pages/Project-Manager.jsx';

let code = fs.readFileSync(filePath, 'utf8');

// 1. Add CustomDropdown component at the top after imports
const customDropdownCode = `
// Reusable Custom Dropdown Component
const CustomDropdown = ({ options, value, onChange, placeholder = "Select...", minWidth = "min-w-[160px]" }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);
    const selectedOption = options.find(o => String(o.value) === String(value));

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={\`relative \${minWidth}\`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#111111] hover:bg-[#1a1a1a] text-white font-bold px-4 py-2 rounded-xl border border-white/[0.08] focus:outline-none shadow-sm flex items-center justify-between gap-3 transition-colors"
            >
                <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
                <svg className={\`w-4 h-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-full bg-[#0a0a0a] border border-white/[0.08] rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                        {options.map((opt) => (
                            <div 
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={\`px-4 py-2.5 cursor-pointer text-sm font-semibold transition-colors \${String(value) === String(opt.value) ? 'bg-white/[0.08] text-white' : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white'}\`}
                            >
                                {opt.label}
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};
`;

if (!code.includes('const CustomDropdown =')) {
    code = code.replace(
        "// Semantic Color Palette as mandated by build brief",
        customDropdownCode + "\n// Semantic Color Palette as mandated by build brief"
    );
}

// 2. Replace Team and Project native selectors with CustomDropdown
const headerFindStr = `<h1 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1 flex flex-wrap items-center gap-3">`;

const headerOldPart = `                        {!propTeamId && userTeams.length > 0 ? (
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
                        )}`;

const headerNewPart = `                        {!propTeamId && userTeams.length > 0 ? (
                            <CustomDropdown
                                value={activeTeamId || ''}
                                onChange={(val) => {
                                    setActiveTeamId(val);
                                    setSelectedProjectId('all');
                                }}
                                options={userTeams.map(t => ({ value: t._id, label: t.name }))}
                                minWidth="min-w-[200px]"
                            />
                        ) : (
                            <span>{teamInfo?.name || "Workspace Team"}</span>
                        )}
                        
                        {teamProjects.length > 0 && (
                            <>
                                <span className="text-zinc-600">/</span>
                                <CustomDropdown
                                    value={selectedProjectId}
                                    onChange={(val) => setSelectedProjectId(val)}
                                    options={[
                                        { value: 'all', label: 'All Projects' },
                                        ...teamProjects.map(p => ({ value: p._id, label: p.title }))
                                    ]}
                                    minWidth="min-w-[180px]"
                                />
                            </>
                        )}`;

code = code.replace(headerOldPart, headerNewPart);

// 3. Make Kanban Board 100vw
const oldKanbanRender = `                        {selectedProjectId !== 'all' ? (
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#A7A0F8] font-mono pl-1 border-l-2 border-[#534AB7]">
                        Project Kanban Tracking
                    </div>
                    <ProjectKanbanBoard issues={allIssues} teamId={activeTeamId} onRefresh={() => fetchAllData(true)} />
                </div>
            ) : (`

const newKanbanRender = `                        {selectedProjectId !== 'all' ? (
                <div className="w-screen relative left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] bg-black border-t border-white/[0.05] mt-6 pt-8 pb-12">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#A7A0F8] font-mono pl-1 border-l-2 border-[#534AB7]">
                            Project Kanban Tracking
                        </div>
                        <div className="w-full">
                            <ProjectKanbanBoard issues={allIssues} teamId={activeTeamId} onRefresh={() => fetchAllData(true)} />
                        </div>
                    </div>
                </div>
            ) : (`

code = code.replace(oldKanbanRender, newKanbanRender);

fs.writeFileSync(filePath, code);
console.log('Project-Manager.jsx updated UI.');
