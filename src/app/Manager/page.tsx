'use client';
import ResumeCards from "@/components/Resume-cards"

function page() {
  const handleAddNew = () => {
    window.location.href = '/NewResume';
  };

  return (
    <div>
      <ResumeCards/>
      <button className="add-button" onClick={handleAddNew}>Add New</button>
    </div>
  )
}

export default page