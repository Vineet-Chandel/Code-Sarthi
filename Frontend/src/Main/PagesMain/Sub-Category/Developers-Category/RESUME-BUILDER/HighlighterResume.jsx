import { PointerHighlight } from "@/components/ui/pointer-highlight";

const colorVariants = {
    orange: {
        pointer: "text-orange-500",
        border: "border-orange-500",
        bg: "bg-orange-500/20",
    },

    yellow: {
        pointer: "text-yellow-500",
        border: "border-yellow-500",
        bg: "bg-yellow-500/20",
    },

    blue: {
        pointer: "text-blue-500",
        border: "border-blue-500",
        bg: "bg-blue-500/20",
    },

    green: {
        pointer: "text-emerald-400",
        border: "border-emerald-400",
        bg: "bg-emerald-400/20",
    },

    red: {
        pointer: "text-red-400",
        border: "border-red-400",
        bg: "bg-red-400/20",
    },

    purple: {
        pointer: "text-purple-400",
        border: "border-purple-400",
        bg: "bg-purple-400/20",
    },

    violet: {
        pointer: "text-violet-500",
        border: "border-violet-500",
        bg: "bg-violet-500/20",
    },
};

export default function Highlighter({
    text2,
    color = "orange",
}) {
    const selected = colorVariants[color];

    return (
        <div className="rounded-md">
            <div className="w-full rounded-lg bg-gradient-to-r from-orange-200 to-yellow-200" />

            <div className="text-4xl md:text-5xl font-bold leading-tight font-generalbold flex flex-col gap-1">
                <PointerHighlight
                    rectangleClassName={`${selected.bg} ${selected.border} text-white leading-loose`}
                    pointerClassName={`${selected.pointer} h-3 w-3`}
                    containerClassName="inline-block ml-1"
                >
                    <span className="relative z-10 text-white">
                        {text2}
                    </span>
                </PointerHighlight>
            </div>
        </div>
    );
}