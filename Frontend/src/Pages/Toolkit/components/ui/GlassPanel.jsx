import clsx from "clsx";

export default function GlassPanel({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={clsx("glass-panel rounded-2xl", className)} {...props}>
      {children}
    </Tag>
  );
}
