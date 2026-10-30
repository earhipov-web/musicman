// Shared button styles. Sign up is solid white; Log in is black with a white outline.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

export const btn = {
  solid: `${base} bg-white text-black hover:bg-[#e5e5e5]`,
  outline: `${base} border border-white bg-black text-white hover:bg-white/10`,
  quiet: `${base} border border-line bg-black text-white hover:border-[#525252] hover:bg-white/5`,
  sm: "h-9 px-3 text-sm sm:px-4",
  md: "h-11 px-5 text-[15px]",
  lg: "h-12 px-6 text-base",
};
