import Image from "next/image";
import Dashboard from "./Dashboard/page";

export default function Home() {
  return (
    <div className="flex-auto min-h-screen">
      <Dashboard/>
    </div>
  );
}