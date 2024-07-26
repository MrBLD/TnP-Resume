/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";
import { log } from "console";
// import { format } from "date-fns";


function Profile() {
    const isNullorWhiteSpaces = (value: any) => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const UserName = (document.getElementById("UserName") as HTMLInputElement).value;
        const FirstName = (document.getElementById("FirstName") as HTMLInputElement).value;
        const LastName = (document.getElementById("LastName") as HTMLInputElement).value;
        const MobNo = (document.getElementById("MobNo") as HTMLInputElement).value;
        const LinkedIn = (document.getElementById("LinkedIn") as HTMLInputElement).value;
        const GitHub = (document.getElementById("GitHub") as HTMLInputElement).value;
        const InsttName = (document.getElementById("InsttName") as HTMLInputElement).value;
        const Course = (document.getElementById("Course") as HTMLInputElement).value;
        const Score = (document.getElementById("Score") as HTMLInputElement).value;
        const EduLocation = (document.getElementById("EduLocation") as HTMLInputElement).value;
        const EduStartDate = (document.getElementById("EduStartDate") as HTMLInputElement).value;
        const EduEndDate = (document.getElementById("EduEndDate") as HTMLInputElement).value;
        
        if (isNullorWhiteSpaces(UserName) || isNullorWhiteSpaces(FirstName) || isNullorWhiteSpaces(MobNo) || isNullorWhiteSpaces(LastName)) {
            alert("Please fill all the Mandatory(*) fields");
            return;
        }

        const formData = {
            UserName,
            FirstName,
            LastName,
            MobNo,
            LinkedIn,
            GitHub,
            InsttName,
            Course,
            Score,
            EduLocation,
            EduStartDate,
            EduEndDate,
        };
        console.log(formData);
        try {
            const response = await fetch('/api/Profile-Submit', {
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
    const [date, setDate] = React.useState<Date>()

    return (
        <>
            <main className="flex flex-row py-40 ">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-zinc-950">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        User Profile Details
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Fill the details to Set-up your Profile
                    </p>
                    <form className="my-2" onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="UserName">UserName*</Label>
                                    <Input type="text" placeholder="Give Your Username Here" id="UserName" />
                                </LabelInputContainer>

                                <div className="flex flex-col md:flex-row py-4">
                                    <LabelInputContainer >
                                        <Label htmlFor="FirstName">FirstName*</Label>
                                        <Input type="text" placeholder="FirstName" id="FirstName" />
                                    </LabelInputContainer>

                                    <LabelInputContainer className=" ml-2">
                                        <Label htmlFor="LastName">LastName*</Label>
                                        <Input type="text" placeholder="LastName" id="LastName" />
                                    </LabelInputContainer>
                                </div>

                                <LabelInputContainer className=" py-4">
                                    <Label htmlFor="MobNo">Mobile Number*</Label>
                                    <Input type="number" placeholder="Enter your mobile No." id="MobNo" />
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="LinkedIn">LinkedIn</Label>
                                    <Input type="text" placeholder="Your LinkedIn id" id="LinkedIn" />
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="GitHub">GitHub</Label>
                                    <Input type="text" placeholder="Your GitHub id" id="GitHub" />
                                </LabelInputContainer>
                            </div>
                            <div>
                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="InsttName">Institute Name</Label>
                                    <Input type="text" placeholder="Give your Intitute Name" id="InsttName" />
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="Course">Course</Label>
                                    <Input type="text" placeholder="Name of your Course" id="Course" />
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="Score">Score</Label>
                                    <Input type="number" placeholder="Give your Final/Last Score" id="Score" />
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="EduLocation">College/School Location</Label>
                                    <Input type="text" placeholder="Location of your School/College" id="EduLocation" />
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="EduStartDate">Degree Start Date</Label>
                                    <Input type="month" placeholder="Start Month/Year of your Degree" id="EduStartDate" max={new Date().toISOString().slice(0, 7)} />
                                    <span className="text-xs ml-4 text-slate-50/50">Start Month/Year of your Degree</span>
                                </LabelInputContainer>

                                <LabelInputContainer className="py-4">
                                    <Label htmlFor="EduEndDate">Degree End Date</Label>
                                    <Input type="month" placeholder="End Month/Year of your Degree" id="EduEndDate" />
                                    <span className="text-xs ml-4 text-slate-50/50">End Month/Year of your Degree</span>
                                </LabelInputContainer>
                            </div>
                        </div>

                        <div>
                            <button className="my-3 py-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" >Update &rarr;<BottomGradient /></button>
                        </div>
                    </form>


                </div>
            </main>
        </>
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


export default Profile;