"use client";

type PreviewKind = "jungle" | "pekin" | "cardio" | "luvyer" | "mishi" | "burgers";

/** Preview stilizat pe brand, cu zoom la hover. */
export default function ProjectPreview({ kind }: { kind: PreviewKind }) {
  if (kind === "jungle") {
    return (
      <div className="flex h-full flex-col bg-[#0d1a12] p-4 text-[#e8f6dc]">
        <div className="mb-3 h-4 w-28 rounded-sm bg-[#7dff6b]/80" />
        <div className="mb-3 h-10 w-3/4 bg-[#d7f5c4]/90" />
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="bg-[#1f6b3a]" />
          <div className="bg-[#3d8f4a]" />
          <div className="bg-[#163322]" />
        </div>
      </div>
    );
  }

  if (kind === "pekin") {
    return (
      <div className="flex h-full flex-col bg-[#1a0b0b] p-4">
        <div className="mb-3 h-3 w-24 bg-[#e2b35a]" />
        <div className="mb-4 h-10 w-2/3 bg-[#f3d27a]/90" />
        <div className="grid flex-1 grid-cols-2 gap-2">
          <div className="bg-[#8b1e1e]" />
          <div className="bg-[#5c1212]" />
          <div className="bg-[#c43b2c]/80" />
          <div className="bg-[#2a0f0f]" />
        </div>
      </div>
    );
  }

  if (kind === "mishi") {
    return (
      <div className="flex h-full flex-col bg-[#0c0c0c] p-4">
        <div className="mb-3 h-3 w-20 bg-[#e11d2e]" />
        <div className="mb-3 h-8 w-2/3 bg-[#f5f5f5]/90" />
        <div className="flex flex-1 items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-[#f4e6d4]" />
          <div className="h-10 w-10 rounded-full bg-[#c45c4a]" />
          <div className="h-10 w-10 rounded-full bg-[#f4e6d4]" />
          <div className="h-10 w-10 rounded-full bg-[#2a2a2a] ring-1 ring-[#e11d2e]" />
        </div>
      </div>
    );
  }

  if (kind === "burgers") {
    return (
      <div className="flex h-full flex-col bg-[#1a100c] p-4">
        <div className="mb-3 h-3 w-24 bg-[#c9a227]" />
        <div className="grid flex-1 grid-cols-3 gap-2">
          <div className="bg-[#6b2a1a]" />
          <div className="bg-[#c43b22]" />
          <div className="bg-[#3d2418]" />
        </div>
      </div>
    );
  }

  if (kind === "luvyer") {
    return (
      <div className="flex h-full flex-col bg-[#111111] p-4">
        <div className="mb-3 h-3 w-16 bg-[#cfc6b8]" />
        <div className="flex flex-1 items-center justify-center gap-3">
          <div className="h-16 w-16 rounded-full border-4 border-[#8a8478] bg-[#2a2a28] shadow-[inset_0_0_0_6px_#1a1a18]" />
          <div className="h-16 w-16 rounded-full border-4 border-[#6b5c3d] bg-[#3d4a32]" />
          <div className="h-16 w-16 rounded-full border-4 border-[#b9a27a] bg-[#4a4034]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-[#f4f7fb] p-4 text-[#12324d]">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-[#1d4e89]" />
        <div className="h-6 w-16 rounded-full bg-[#3b82c4]" />
      </div>
      <div className="mb-3 h-8 w-1/2 bg-[#1d4e89]/80" />
      <div className="grid flex-1 grid-cols-3 gap-2">
        <div className="rounded bg-[#d7e6f5]" />
        <div className="rounded bg-[#b9d0e8]" />
        <div className="rounded bg-[#8fb4d6]" />
      </div>
    </div>
  );
}

export type { PreviewKind };
