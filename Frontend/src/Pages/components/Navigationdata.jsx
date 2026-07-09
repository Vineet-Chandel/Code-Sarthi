import {
    Home,
    Sparkles,
    Lightbulb,
    Rocket,
    Brain,
    MessageSquareText,
    Users,
    TrendingUp,
    Wand2,
    FolderKanban,
    Star,
    NotebookPen,
    GraduationCap,
    Newspaper,
    Globe2,
    Trophy,
    Settings,
} from "lucide-react";

// Every entry maps 1:1 to a NavItem. Badges are optional and rendered
// as a small animated dot (unread) or a count pill.
export const navigationSections = [
    {
        label: "Discover",
        items: [
            { id: "home", label: "Home", icon: Home, hint: "Start here" },
            { id: "getting-started", label: "Getting started", icon: Sparkles, badge: "new" },
            { id: "daily-inspiration", label: "Daily inspiration", icon: Lightbulb },
            { id: "whats-new", label: "What's new", icon: Rocket, badge: "dot" },
        ],
    },


];

export const settingsItem = {
    id: "settings",
    label: "Settings",
    icon: Settings,
};