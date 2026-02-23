import Image from "next/image";

export function AdinkraDivider({ symbol = "gye-nyame" }: { symbol?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <Image
        src={`/symbols/${symbol}.svg`}
        alt=""
        width={14}
        height={14}
        className="opacity-15"
      />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
    </div>
  );
}
