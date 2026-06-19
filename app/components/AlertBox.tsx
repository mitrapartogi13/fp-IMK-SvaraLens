import { WarningIcon, CheckIcon } from "./Icons";

const VARIANTS = {
  warning: {
    icon: WarningIcon,
    className: "bg-primary text-black",
  },
  safe: {
    icon: CheckIcon,
    className: "bg-green-100 text-green-900",
  },
} as const;

/** Kotak status nilai gizi — kuning untuk peringatan, hijau muda untuk aman. */
export default function AlertBox({
  type,
  text,
  className = "",
}: {
  type: "warning" | "safe";
  text: string;
  className?: string;
}) {
  const { icon: Icon, className: variantClass } = VARIANTS[type];
  return (
    <div
      className={`flex flex-col items-start gap-2 rounded-xl border-2 border-line p-4 ${variantClass} ${className}`}
    >
      <Icon className="text-[28px]" />
      <p className="text-lg font-black leading-snug">{text}</p>
    </div>
  );
}