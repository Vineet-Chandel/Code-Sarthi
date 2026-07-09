import React from "react";
import NavItem from "./Navitem";

export default function NavSection({ section, collapsed, activeId, onSelect }) {
    return (
        <div className="flex flex-col gap-1">
            {!collapsed && (
                <p className="px-3 pb-1 pt-3 text-[10.5px] font-medium uppercase tracking-wider text-zinc-600">
                    {section.label}
                </p>
            )}
            {section.items.map((item) => (
                <NavItem
                    key={item.id}
                    item={item}
                    collapsed={collapsed}
                    active={activeId === item.id}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}