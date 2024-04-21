import Image from "next/image";
import FirebaseCrud from "@/components/FirebaseCrud/FirebaseCrud";

export default function Home() {
  return (
    <div className="flex-auto min-h-screen">
      <FirebaseCrud/>
    </div>
  );
}
