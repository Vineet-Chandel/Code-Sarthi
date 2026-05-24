import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { MoveDown } from "lucide-react";

export default function Highlighter() {
    return (

        <div className="rounded-md">
            <div
                className=" w-full rounded-lg bg-linear-45 from-orange-200 to-yellow-200" />
            <div
                className="text-4xl md:text-5xl text-white font-bold text-accent-content leading-tight font-generalbold flex flex-col gap-1">
                Built by Developer,{" "}
                <PointerHighlight
                    rectangleClassName="bg-orange-100/20  border-orange-300 text-white leading-loose"
                    pointerClassName="text-orange-500 h-3 w-3"
                    containerClassName="inline-block ml-1">
                    <span className="relative z-10">‎ ‎ For Developers‎ ‎ ‎ </span>
                </PointerHighlight>

            </div>


        </div>
    );
}
