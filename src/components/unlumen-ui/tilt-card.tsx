import * as React from "react";
import { cn } from "../../lib/utils";
import { ClippedCircle } from "./primitives/clipped-circle";
import { Tilt, type TiltProps } from "./primitives/tilt";
import { ArrowUpRight, Star, Clock, MapPin, Sparkles } from "lucide-react";

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  key?: React.Key;
  title: string;
  subtitle?: string;
  description?: string;
  circuit?: string;
  duration?: string;
  stopNumber?: number;
  /** left half of the split badge pill; e.g. "From ₹18,500" */
  price?: string;
  /** right half of the split pill */
  badgeLabel?: string;
  badgeVariant?: "success" | "warning" | "sacred" | "gold";
  imageSrc?: string;
  imageAlt?: string;
  highlights?: string[];
  ctaLabel?: string;
  compact?: boolean;
  href?: string;
  onSelect?: () => void;
  children?: React.ReactNode;
  tiltProps?: Omit<TiltProps, "children" | "className">;
}

const BADGE_LABEL_CLASSES: Record<
  NonNullable<TiltCardProps["badgeVariant"]>,
  string
> = {
  success: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  warning: "bg-amber-500/25 text-amber-200 border-amber-500/40",
  sacred: "bg-rose-500/20 text-rose-200 border-rose-500/40",
  gold: "bg-yellow-500/25 text-yellow-200 border-yellow-500/40",
};

export function TiltCard({
  title,
  subtitle,
  description,
  circuit,
  duration,
  stopNumber,
  price,
  badgeLabel,
  badgeVariant = "gold",
  imageSrc,
  imageAlt = "",
  highlights = [],
  ctaLabel = "View More Details",
  compact = false,
  href,
  onSelect,
  children,
  tiltProps,
  className,
  ...props
}: TiltCardProps) {
  const inner = (
    <Tilt
      rotationFactor={11}
      {...tiltProps}
      className={cn(
        "relative group overflow-hidden",
        "bg-gradient-to-b from-[#FEFBF2] via-[#FDF9F0] to-[#F5EEDD]",
        "border-2 border-[#C59239]/40 hover:border-[#C59239]",
        "flex flex-col justify-between select-none",
        compact
          ? "w-[240px] sm:w-[260px] md:w-[270px] aspect-square p-3.5 sm:p-4 rounded-2xl shadow-[0_15px_35px_rgba(34,21,8,0.22)] hover:shadow-[0_20px_45px_rgba(197,146,57,0.35)]"
          : "w-full max-w-[430px] aspect-square min-h-[380px] sm:min-h-[420px] p-5 sm:p-6 rounded-3xl shadow-[0_15px_35px_rgba(34,21,8,0.2)] hover:shadow-[0_25px_60px_rgba(197,146,57,0.35)]",
        "transition-all duration-300 ease-out",
        className,
      )}
    >
      {/* Background Sacred Texture Vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, rgba(197,146,57,0.25) 0%, transparent 70%)`,
        }}
      />

      {compact ? (
        /* COMPACT CARD: ONLY NAME OF DHAM, CLEAN IMAGE & CTA BUTTON */
        <>
          {/* Top Header: Stop Number & Dham Title */}
          <div className="relative z-10 flex flex-col">
            <div className="flex items-center justify-between mb-1">
              {stopNumber !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-[#C59239]/15 text-[#3D2619] border border-[#C59239]/40 text-[9px] font-dm font-bold tracking-wider uppercase">
                  Stop 0{stopNumber}
                </span>
              )}
              {circuit && (
                <span className="text-[9px] font-dm font-bold tracking-wider text-[#C59239] uppercase">
                  {circuit}
                </span>
              )}
            </div>
            <h3 className="font-cormorant text-base sm:text-lg font-bold text-[#221508] group-hover:text-[#FE7613] transition-colors leading-snug line-clamp-1">
              {title}
            </h3>
          </div>

          {/* Middle: Clean Sacred Dham Photo */}
          {imageSrc && (
            <div className="relative z-10 my-auto w-full h-24 sm:h-28 rounded-xl overflow-hidden border border-[#C59239]/30 shadow-md group-hover:scale-[1.03] transition-transform duration-300">
              <img
                src={imageSrc}
                alt={imageAlt || title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Bottom Action: CTA Button "View More Details" */}
          <div className="relative z-10 pt-2 border-t border-[#C59239]/25">
            <button
              type="button"
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect();
                }
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-[#FE7613] to-[#FE8D3B] hover:brightness-105 text-white font-dm font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 shadow-sm shadow-[#FE7613]/25 group-hover:scale-[1.02] active:scale-95 cursor-pointer border border-[#FE7613]/30"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </>
      ) : (
        /* STANDARD DETAILED CARD */
        <>
          {/* Top Header: Stop Number, Circuit, Title & Split Badge */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                {stopNumber !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-[#221508] text-[#E4B968] border border-[#C59239]/40 text-[10px] font-dm font-bold tracking-wider uppercase">
                    Stop 0{stopNumber}
                  </span>
                )}
                {circuit && (
                  <span className="text-[10px] sm:text-[11px] font-dm font-semibold tracking-[0.2em] text-[#E4B968] uppercase">
                    {circuit}
                  </span>
                )}
              </div>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#FEFBF2] group-hover:text-[#E4B968] transition-colors leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="font-dm text-xs text-[#E4B968]/90 mt-0.5 line-clamp-1">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Split Badge Pill */}
            {price && badgeLabel ? (
              <div className="inline-flex h-fit items-center text-[11px] font-dm whitespace-nowrap shrink-0 shadow-sm border border-[#C59239]/40 rounded-full overflow-hidden bg-black/60">
                <span className="bg-[#221508] text-[#FEFBF2] py-1 px-2.5 font-bold">
                  {price}
                </span>
                <span
                  className={cn(
                    "py-1 px-2.5 font-bold uppercase tracking-wider text-[10px]",
                    BADGE_LABEL_CLASSES[badgeVariant],
                  )}
                >
                  {badgeLabel}
                </span>
              </div>
            ) : price ? (
              <span className="h-fit rounded-full bg-[#221508] border border-[#C59239]/40 px-3 py-1 text-xs font-dm font-semibold text-[#FEFBF2] whitespace-nowrap shrink-0">
                {price}
              </span>
            ) : null}
          </div>

          {/* Middle: Floating 3D Image & Quick Snapshot */}
          <div className="relative z-10 my-auto flex items-center gap-4">
            {imageSrc && (
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden border border-[#C59239]/40 shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300">
                <img
                  src={imageSrc}
                  alt={imageAlt || title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            <div className="flex-1 flex flex-col justify-center min-w-0">
              {duration && (
                <div className="inline-flex items-center gap-1.5 text-xs text-[#FEFBF2] font-dm mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FE7613]" />
                  <span className="font-semibold">{duration}</span>
                </div>
              )}

              {description && (
                <p className="font-dm text-xs text-white/80 line-clamp-2 leading-relaxed mb-2">
                  {description}
                </p>
              )}

              {highlights.length > 0 && (
                <div className="flex flex-col gap-1">
                  {highlights.slice(0, 2).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-dm text-[#E4B968] line-clamp-1 flex items-center gap-1.5"
                    >
                      <span className="text-[#FE7613] text-xs">✦</span>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="relative z-10 pt-3 border-t border-[#C59239]/25 flex items-center justify-between">
            <span className="text-[11px] font-dm text-[#E4B968]/70 tracking-wider uppercase">
              VIP Darshan & Stay
            </span>

            <button
              type="button"
              onClick={(e) => {
                if (onSelect) {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FE7613] hover:bg-[#e0650d] text-white font-dm font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group-hover:scale-105 active:scale-95 cursor-pointer border border-[#FE7613]/40"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </>
      )}

      {/* Unlumen UI Radial Cursor Shine Spotlight */}
      <ClippedCircle circleClassName="bg-[#C59239]/20" circleSize={compact ? 500 : 700} />
    </Tilt>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block cursor-pointer"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer"
      {...props}
    >
      {inner}
    </div>
  );
}
