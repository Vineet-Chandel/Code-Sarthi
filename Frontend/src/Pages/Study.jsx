import { useSelector } from "react-redux";

const Study = () => {
    const user = useSelector((store) => store.user);

    const categories = [
        {
            title: "WEB DEVELOPMENT",
            items: [
                { name: "HTML", color: "red" },
                { name: "CSS", color: "blue" },
                { name: "Flask", color: "green" },
                { name: "Perl", color: "yellow" },
                { name: "React", color: "red" },
                { name: "Express", color: "blue" },
                { name: "Window Cmd", color: "green" },
                { name: "Django", color: "yellow" },
                { name: "Selenium", color: "red" },
                { name: "Bash", color: "blue" },
                { name: "HTML Canvas", color: "green" },
                { name: "HTMX", color: "yellow" },
                { name: "Socket.io", color: "red" },
                { name: "PowerShell", color: "blue" },
                { name: "Markdown", color: "green" },
                { name: "Saas", color: "yellow" },
                { name: "jQuery", color: "red" },
                { name: "YAML", color: "blue" },
                { name: "TOML", color: "green" },
                { name: "Docker", color: "yellow" },
                { name: "GraphQL", color: "red" },
                { name: "Dart", color: "blue" },
                { name: "Laravel", color: "green" },
                { name: "INI", color: "yellow" },
                { name: "LaTeX", color: "red" },
                { name: "MATLAB", color: "blue" },
                { name: "Kotlin", color: "green" },
                { name: "Kubernetes", color: "yellow" },
                { name: "Swift", color: "red" },
                { name: "FastAPI", color: "blue" },
                { name: "HOOK", color: "green" },
                { name: "Terraform", color: "yellow" },

            ]
        },
        {
            title: "IMPORTANT TOOLS",
            items: [
                { name: "ChatGPT", color: "red" },
                { name: "Github CLI", color: "blue" },
                { name: "Github Actions", color: "green" },
                { name: "Colour Picker", color: "yellow" },
                { name: "VSCode", color: "red" },
                { name: "Vim", color: "blue" },
                { name: "Homebrew", color: "green" },
                { name: "Emmet", color: "yellow" },

            ]
        },
        {
            title: "PROGRAMMING LANGUAGE",
            items: [
                { name: "Python", color: "red" },
                { name: "Java", color: "blue" },
                { name: "C++", color: "green" },
                { name: "C", color: "yellow" },
                { name: "C#", color: "red" },
                { name: "TypeScript", color: "blue" },
                { name: "JavaScript", color: "green" },
                { name: "Ruby", color: "yellow" },
                { name: "ES6", color: "red" },
                { name: "Json", color: "blue" },
                { name: "Numpy", color: "green" },
                { name: "Pandas", color: "yellow" },
                { name: "Rust", color: "red" },

            ]
        },
        {
            title: "DATABASE",
            items: [
                { name: "MySQL", color: "red" },
                { name: "Redis", color: "blue" },
                { name: "PostgreSQL", color: "green" },
                { name: "Neo4j", color: "yellow" },

            ]
        }
    ];

    return (
        <div className="h-auto w-screen text-black">
            <div className="bg-gradient-to-br from-[#d9d7f3] via-[#b9e3f6] to-[#6ec6e8] p-10 border rounded-b-[50px]">
                <div className="w-full flex flex-col justify-center items-center font-head font-extrabold text-[5rem] leading-none">
                    DEVELOPERS TOOLKIT
                </div>
                <p className="text-xl font-circular-web w-full flex flex-col justify-center items-center">
                    Smart toolkits designed to help you code faster, cleaner, and smarter.
                </p>
            </div>

            <div>
                <div className="flex flex-col gap-5 mt-10">
                    {categories.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <div className="heading text-[2rem] font-extrabold font-head text-white w-full flex justify-center items-center mb-5">
                                {category.title}
                            </div>
                            <div className="grid grid-cols-4 gap-5 max-w-6xl mx-auto px-5">
                                {category.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className={`bg-${item.color}-600/70 hover:bg-${item.color}-600 cursor-pointer h-[50px] rounded-xl flex justify-center items-center border-transparent transition-colors duration-200`}
                                    >
                                        <div className="butData text-white text-xl font-circular-web font-extrabold">
                                            {item.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Study;