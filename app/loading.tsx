import { SectionSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="container" style={{ padding: "84px 0 10px" }} role="status" aria-label="Loading page">
        <div className="skel" style={{ height: 14, width: 180 }} />
        <div className="skel" style={{ height: 56, width: "70%", marginTop: 18 }} />
        <div className="skel" style={{ height: 20, width: "55%", marginTop: 14 }} />
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <div className="skel" style={{ height: 46, width: 170, borderRadius: 999 }} />
          <div className="skel" style={{ height: 46, width: 170, borderRadius: 999 }} />
        </div>
      </div>
      <SectionSkeleton lines={2} />
      <SectionSkeleton lines={2} />
    </div>
  );
}
