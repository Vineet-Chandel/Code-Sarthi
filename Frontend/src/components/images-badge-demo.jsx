"use client";
import { ImagesBadge } from "@/components/ui/images-badge";

export default function ImagesBadgeDemo() {
  return (
    <div className="flex h-[10rem] w-full items-center justify-center">
      <ImagesBadge
        text="Introducing Agenforce Marketing Template"
        images={[
          "https://assets.aceternity.com/pro/agenforce-1.webp",
          "https://assets.aceternity.com/pro/agenforce-2.webp",
          "https://assets.aceternity.com/pro/agenforce-3.webp",
        ]} />
    </div>
  );
}
