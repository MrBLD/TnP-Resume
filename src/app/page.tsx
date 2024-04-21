import Image from "next/image";
import FirebaseCrud from "@/components/FirebaseCrud/FirebaseCrud";

export default function Home() {
  return (
    <div className="flex-auto min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <FirebaseCrud/>
    </div>
  );
}
