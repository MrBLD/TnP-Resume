"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

function ResumePage() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const UserName = (document.getElementById("UserName") as HTMLInputElement).value
        const ResumeName = (document.getElementById("ResumeName") as HTMLInputElement).value
        const OrgName = (document.getElementById("OrgName") as HTMLInputElement).value
        const ExpTitle = (document.getElementById("ExpTitle") as HTMLInputElement).value
        const ExpRole = (document.getElementById("ExpRole") as HTMLInputElement).value
        const Description = (document.getElementById("Description") as HTMLInputElement).value
        const ExpLocation = (document.getElementById("ExpLocation") as HTMLInputElement).value
        const ExpStartDate = (document.getElementById("ExpStartDate") as HTMLInputElement).value
        const ExpEndDate = (document.getElementById("ExpEndDate") as HTMLInputElement).value
        const PTitle = (document.getElementById("PTitle") as HTMLInputElement).value
        const PRole = (document.getElementById("PRole") as HTMLInputElement).value
        const PDescription = (document.getElementById("PDescription") as HTMLInputElement).value
        const PStartDate = (document.getElementById("PStartDate") as HTMLInputElement).value
        const PEndDate = (document.getElementById("PEndDate") as HTMLInputElement).value
        const ProggLang = (document.getElementById("ProggLang") as HTMLInputElement).value
        const Tools = (document.getElementById("Tools") as HTMLInputElement).value
        const Lang = (document.getElementById("Lang") as HTMLInputElement).value
        const more_info = (document.getElementById("more_info") as HTMLInputElement).value
        const AchExpTitle = (document.getElementById("AchExpTitle") as HTMLInputElement).value
        const AchInfo = (document.getElementById("AchInfo") as HTMLInputElement).value

        const formData = {
            UserName,
            ResumeName,
            OrgName,
            ExpTitle,
            ExpRole,
            Description,
            ExpLocation,
            ExpStartDate,
            ExpEndDate,
            PTitle,
            PRole,
            PDescription,
            PStartDate,
            PEndDate,
            ProggLang,
            Tools,
            Lang,
            more_info,
            AchExpTitle,
            AchInfo,
        }
        // console.log(formData);
        try {
            const response = await fetch('/api/Resume-Submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Form data submitted successfully');
            } else {
                console.error('Failed to submit form data');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <main className="flex flex-row-reverse ">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    User Profile Details
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Fill the details to Set-up your Profile
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <LabelInputContainer>
                                <Label htmlFor="UserName">UserName</Label>
                                <Input type="text" placeholder="UserName" id="UserName" />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="ResumeName">ResumeName</Label>
                                <Input type="text" placeholder="ResumeName" id="ResumeName" />
                            </LabelInputContainer>

                            <h1 className="text-xl font-semibold">Exp Data</h1>
                            <LabelInputContainer>
                                <Label htmlFor="OrgName">OrgName</Label>
                                <Input type="text" placeholder="OrgName" id="OrgName" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="ExpTitle">ExpTitle</Label>
                                <Input type="text" placeholder="ExpTitle" id="ExpTitle" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="ExpRole">ExpRole</Label>
                                <Input type="text" placeholder="ExpRole" id="ExpRole" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="Description">Description</Label>
                                <Input type="text" placeholder="Description" id="Description" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="ExpLocation">ExpLocation</Label>
                                <Input type="text" placeholder="ExpLocation" id="ExpLocation" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="ExpStartDate">ExpStartDate</Label>
                                <Input type="text" placeholder="ExpStartDate" id="ExpStartDate" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="ExpEndDate">ExpEndDate</Label>
                                <Input type="text" placeholder="ExpEndDate" id="ExpEndDate" />
                            </LabelInputContainer>
                        </div>
                        <h1 className="text-xl font-semibold">Proj Data</h1>
                        <div>
                            <LabelInputContainer>
                                <Label htmlFor="PTitle">PTitle</Label>
                                <Input type="text" placeholder="PTitle" id="PTitle" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="PRole">PRole</Label>
                                <Input type="text" placeholder="PRole" id="PRole" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="PDescription">PDescription</Label>
                                <Input type="text" placeholder="PDescription" id="PDescription" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="PStartDate">PStartDate</Label>
                                <Input type="text" placeholder="PStartDate" id="PStartDate" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="PEndDate">PEndDate</Label>
                                <Input type="text" placeholder="PEndDate" id="PEndDate" />
                            </LabelInputContainer>
                        </div>
                        <h1 className="text-xl font-semibold">Skills Data</h1>
                        <div>
                            <LabelInputContainer>
                                <Label htmlFor="ProggLang">ProggLang</Label>
                                <Input type="text" placeholder="ProggLang" id="ProggLang" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="Tools">Tools</Label>
                                <Input type="text" placeholder="Tools" id="Tools" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="Lang">Lang</Label>
                                <Input type="text" placeholder="Lang" id="Lang" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="more_info">more_info</Label>
                                <Input type="text" placeholder="more_info" id="more_info" />
                            </LabelInputContainer>
                        </div>
                        <h1 className="text-xl font-semibold">Ach Data</h1>
                        <div>
                            <LabelInputContainer>
                                <Label htmlFor="AchExpTitle">AchExpTitle</Label>
                                <Input type="text" placeholder="AchExpTitle" id="AchExpTitle" />
                            </LabelInputContainer>
                            <LabelInputContainer>
                                <Label htmlFor="AchInfo">AchInfo</Label>
                                <Input type="text" placeholder="AchInfo" id="AchInfo" />
                            </LabelInputContainer>
                        </div>
                    </div>
                    <div>
                        <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" >Insert data &rarr;<BottomGradient /></button>
                        <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" >Update data &rarr;<BottomGradient /></button>
                        <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" >Select data &rarr;<BottomGradient /></button>
                        <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" >Delete data &rarr;<BottomGradient /></button>
                    </div>
                </form>
            </div>
        </main>
    )
}


const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};


const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

export default ResumePage;