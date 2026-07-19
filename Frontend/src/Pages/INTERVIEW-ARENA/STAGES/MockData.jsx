export const mockAuditData = {
    "success": true,
    "data": {
        data: {
            "overallHealthScore": {
                "score": 72,
                "outOf": 100,
                "verdict": "Solid foundation, but several critical fields are missing and content quality needs cleanup before applying."
            },
            "contentIssues": [
                {
                    "severity": "critical",
                    "section": "projects",
                    "field": "projects[1].description",
                    "issue": "The project description is unclear and seems to be a placeholder.",
                    "flaggedText": "KUCHH TOOO TABHAII HAII BHAII",
                    "fix": "Replace with a clear and concise description of the project."
                },
                {
                    "severity": "warning",
                    "section": "experience",
                    "field": "experience[1].startDate",
                    "issue": "The start date is in the future, which is unlikely.",
                    "flaggedText": "2029-06",
                    "fix": "Update the start date to a plausible value."
                }
            ],
            "missingFields": [
                {
                    "section": "certifications",
                    "field": "relevant certifications",
                    "importance": "recommended",
                    "whyItMatters": "Certifications can demonstrate expertise and commitment to the field.",
                    "prompt": "Add relevant certifications, such as Azure Developer Associate or AWS Certified Developer."
                },
                {
                    "section": "experience",
                    "field": "achievements",
                    "importance": "recommended",
                    "whyItMatters": "Achievements can showcase impact and accomplishments in previous roles.",
                    "prompt": "Add 2-3 achievements for each experience, focusing on specific accomplishments and metrics."
                }
            ],
            "dataInconsistencies": [
                {
                    "type": "date_anomaly",
                    "section": "experience",
                    "field": "experience[1].startDate",
                    "description": "The start date is in the future.",
                    "flaggedValue": "2029-06",
                    "suggestedFix": "Update the start date to a plausible value, such as 2022-06."
                },
                {
                    "type": "duplicate",
                    "section": "achievements",
                    "field": "achievements[0] and achievements[1]",
                    "description": "The achievements are identical.",
                    "flaggedValue": "Achieved top 5% ranking on LeetCode, demonstrating advanced algorithmic proficiency.",
                    "suggestedFix": "Remove the duplicate achievement."
                }
            ],
            "skillGapAnalysis": {
                "roleRequiresSkills": [
                    "TypeScript",
                    "Azure",
                    "Cloud Computing",
                    "Machine Learning"
                ],
                "candidateHasSkills": [
                    "Java",
                    "Spring Boot",
                    "Python",
                    "PostgreSQL",
                    "React",
                    "MongoDB"
                ],
                "matchedSkills": [
                    "Python",
                    "PostgreSQL"
                ],
                "missingCriticalSkills": [
                    {
                        "skill": "TypeScript",
                        "importance": "critical",
                        "reason": "TypeScript is a key skill for Microsoft's Software Development Engineer role."
                    },
                    {
                        "skill": "Azure",
                        "importance": "critical",
                        "reason": "Azure is a key technology for Microsoft, and experience with it is highly valued."
                    }
                ],
                "irrelevantSkills": [
                    {
                        "skill": "Vue",
                        "suggestion": "Remove from this resume version or move to lower priority."
                    }
                ],
                "skillCoveragePercent": 30
            },
            "growthRecommendations": [
                {
                    "priority": 1,
                    "category": "skill",
                    "title": "Learn TypeScript to depth",
                    "why": "TypeScript is a key skill for Microsoft's Software Development Engineer role, and having in-depth knowledge will make you a stronger candidate.",
                    "howTo": "Take the TypeScript course on Pluralsight, and practice building projects with it.",
                    "estimatedImpact": "high",
                    "timeToAchieve": "2-3 months"
                },
                {
                    "priority": 2,
                    "category": "certification",
                    "title": "Get Azure Developer Associate certification",
                    "why": "Having an Azure certification will demonstrate your expertise and commitment to the technology.",
                    "howTo": "Study for the Azure Developer Associate exam, and take practice tests to prepare.",
                    "estimatedImpact": "high",
                    "timeToAchieve": "1-2 months"
                }
            ],
            "quickWins": [
                "Fix the start date on your Backend Developer role at CodeSarthi (currently shows 2029, likely a typo)",
                "Remove duplicate LeetCode achievement — you have it listed twice word-for-word"
            ],
            "auditSummary": "This profile has a solid foundation, but there are several critical fields missing and content quality needs cleanup before applying. The biggest strength is the candidate's experience with Java and Spring Boot, but the most urgent thing to fix is the lack of relevant skills, such as TypeScript and Azure. With some focused effort on learning these skills and cleaning up the profile, the candidate can become a stronger contender for the Software Development Engineer role at Microsoft."
        }
    }
}
export const mockStrategyData = {
    "success": true,
    "data": {
        "data": {
            "positioningStatement": "A full-stack engineer with experience building React and Node.js products at CodeSarthi, targeting a mid-level SDE role at Microsoft with strong DSA fundamentals and backend experience.",
            "coreNarrative": "His experience in optimizing RESTful API endpoints, implementing JWT authentication, and designing microservices architecture showcases his technical expertise. Vineet's achievements, such as achieving a top 5% ranking on LeetCode and securing a high CGPA in his academic pursuits, demonstrate his commitment to excellence and problem-solving skills.",
            "mustIncludeKeywords": [
                "React",
                "Node.js",
                "REST API",
                "RESTful API",
                "TypeScript",
                "Azure",
                "Cloud Computing",
                "Machine Learning",
                "JavaScript",
                "Backend Development",
                "Full Stack Development"
            ],
            "niceToIncludeKeywords": [
                "Agile Development",
                "Scrum",
                "Kanban",
                "Test-Driven Development",
                "Continuous Integration",
                "Continuous Deployment"
            ],
            "keywordsToAvoid": [
                "Vue",
                "Java",
                "Spring Boot",
                "Python"
            ],
            "strengthsToAmplify": [
                "Strong DSA fundamentals",
                "Experience with React and Node.js",
                "Backend development expertise",
                "Achievements in coding challenges and hackathons",
                "Experience with microservices architecture and RESTful APIs"
            ],
            "weaknessesToDownplay": [
                "Limited experience with TypeScript and Azure",
                "Short duration of experience in some roles"
            ],
            "sectionPriority": [
                "summary",
                "experience",
                "projects",
                "skills",
                "education",
                "certifications"
            ],
            "summaryStrategy": {
                "openWith": "Lead with the React and Node.js full-stack experience at CodeSarthi and the LeetCode top 5% ranking as proof of DSA strength",
                "keywordsToFrontload": [
                    "React",
                    "Node.js",
                    "Full Stack Development",
                    "DSA"
                ],
                "toneInstruction": "Technical and confident, not modest. Avoid buzzwords like results-driven or passionate.",
                "avoid": [
                    "Do not open with I",
                    "Do not mention Java or Spring Boot — not relevant for this role"
                ]
            },
            "experienceStrategy": {
                "general": "Emphasize technical skills, achievements, and impact in each role. Use strong past-tense action verbs like Built, Engineered, and Architected.",
                "perRole": [
                    {
                        "company": "CodeSarthi",
                        "role": "Frontend Developer",
                        "relevanceToTarget": "high",
                        "instruction": "Emphasize experience with React, Node.js, and RESTful APIs. Highlight achievements in optimizing API endpoints and implementing JWT authentication."
                    },
                    {
                        "company": "CodeSarthi",
                        "role": "Backend Developer",
                        "relevanceToTarget": "high",
                        "instruction": "Emphasize experience with Node.js, RESTful APIs, and microservices architecture. Highlight achievements in optimizing database queries and implementing OAuth2 flow."
                    }
                ]
            },
            "projectStrategy": {
                "general": "Emphasize technical decisions, metrics, and impact in each project. Use strong past-tense action verbs like Built, Engineered, and Architected.",
                "perProject": [
                    {
                        "name": "code sarhti",
                        "relevanceToTarget": "high",
                        "shouldInclude": true,
                        "instruction": "Emphasize experience with React, Node.js, and MongoDB. Highlight achievements in optimizing React rendering pipeline and implementing JWT authentication."
                    },
                    {
                        "name": "DEV CONNECT",
                        "relevanceToTarget": "low",
                        "shouldInclude": false,
                        "instruction": "Do not include this project as it has placeholder content and is not relevant to the target role."
                    }
                ]
            },
            "skillsStrategy": {
                "categoriesToUse": [
                    "Programming Languages",
                    "Frameworks",
                    "Databases",
                    "Cloud Platforms"
                ],
                "skillsToKeep": [
                    "JavaScript",
                    "React",
                    "Node.js",
                    "MongoDB"
                ],
                "skillsToRemove": [
                    "Vue",
                    "Java",
                    "Spring Boot",
                    "Python"
                ],
                "skillsToSurface": [
                    "TypeScript",
                    "Azure"
                ],
                "orderBy": "Most relevant to Microsoft SDE role first"
            },
            "toneGuidance": {
                "overall": "Professional and technical, with a confident tone.",
                "verbStyle": "Strong past-tense action verbs like Built, Engineered, and Architected.",
                "formality": "Formal but not stiff — this is Microsoft, not a startup."
            },
            "redFlagsToAddress": [
                "projects[1].description is placeholder text — rewriters must work from bullets only for that project",
                "experience[1].startDate is 2029 — do not reference dates in bullets"
            ],
            "versionLabel": "Microsoft SDE — Full Stack Focus"
        }
    }
}

export const mockRewritingData =
{
    data1: {
        "data": {
            "summaryTitle": "Software Development Engineer",
            "summaryBody": "Built scalable React and Node.js applications, achieving top 5% ranking on LeetCode and demonstrating expertise in designing RESTful APIs. Engineered high-performance systems with a strong foundation in computer science, utilizing JavaScript and TypeScript to drive cloud computing solutions on Azure. With a focus on scalability, developed and maintained systems that enhanced user engagement and reduced latency, leveraging cloud computing to drive business growth."
        }
    },
    data2: {
        "data": [
            {
                "role": "Frontend Developer",
                "company": "CodeSarthi",
                "location": "Kanpur, India",
                "startDate": "2026-01",
                "endDate": "2026-01",
                "currentlyWorking": true,
                "employmentType": "Internship",
                "bullets": [
                    "Built responsive React UI components, reducing load time 35% via lazy loading and Server-Side Rendering (SSR) with Node.js",
                    "Streamlined RESTful API endpoints, cutting response latency 28% using Azure Cloud Computing and Redis caching",
                    "Deployed automated CI/CD pipelines with GitHub Actions, accelerating deployment cycles 4x and ensuring scalability with Docker",
                    "Designed microservices architecture, enhancing scalability 3x through Kubernetes and MongoDB integration",
                    "Implemented secure user authentication flow, integrating OAuth2 and JWT, reducing breach risk 99% with TypeScript and Cloud Computing"
                ]
            },
            {
                "role": "Backend Developer",
                "company": "CodeSarthi",
                "location": "Kanpur, India",
                "startDate": "2029-06",
                "endDate": "2030-12",
                "currentlyWorking": true,
                "employmentType": "Internship",
                "bullets": [
                    "Built a stateless REST API using Node.js, cutting latency 35% measured by response time",
                    "Streamlined PostgreSQL queries, boosting throughput 4x measured by transactions per second with JavaScript and TypeScript",
                    "Deployed automated CI/CD pipelines with GitHub Actions and Docker, accelerating deployments 2x measured by release frequency",
                    "Designed a microservices architecture, scaling horizontally to 10 instances measured by uptime 99.9% with Kubernetes and Azure Cloud Computing",
                    "Implemented a secure OAuth2 flow with JWT, cutting breach risk 90% measured by scans, and integrated with React and React.js applications"
                ]
            }
        ]
    },
    data3: {
        "data": [
            {
                "name": "code sarhti",
                "stack": "React, Mongo db",
                "github": "https://github.com/Vineet-Chandel/Code-Sarthi",
                "live": "https://www.codesarthi.in/",
                "description": "CodeSarthi connects you with a global developer community to build and scale. Designed to boost productivity while keeping workflows fast and efficient.",
                "bullets": [
                    "Engineered a scalable React.js component architecture, integrating with a Node.js backend via RESTful API, to achieve a 35% reduction in load time and significantly boost user engagement",
                    "Architected a MongoDB database with sharding, ensuring seamless support for 50k concurrent developers and showcasing expertise in Cloud Computing with Azure",
                    "Implemented a secure authentication mechanism using JWT and OAuth2, integrating with the REST API to reduce unauthorized access incidents by 90% and protect sensitive data",
                    "Optimized the React rendering pipeline, cutting the bundle size by 28% and improving SEO scores, while ensuring scalability and performance in a microservices-based architecture"
                ]
            }
        ]
    },
    data4: {
        "data": {
            "skills": [
                {
                    "skillCategory": "Languages",
                    "skills": [
                        "JavaScript",
                        "TypeScript"
                    ]
                },
                {
                    "skillCategory": "Frameworks",
                    "skills": [
                        "React"
                    ]
                },
                {
                    "skillCategory": "Databases",
                    "skills": [
                        "MongoDB",
                        "PostgreSQL"
                    ]
                },
                {
                    "skillCategory": "Tools",
                    "skills": [
                        "Node.js",
                        "Docker",
                        "Kubernetes",
                        "JWT",
                        "OAuth2"
                    ]
                },
                {
                    "skillCategory": "Cloud",
                    "skills": [
                        "Azure"
                    ]
                }
            ]
        }
    }
}