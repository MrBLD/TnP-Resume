"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

function Profile() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
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

                            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                                <LabelInputContainer>
                                    <Label htmlFor="FirstName">FirstName</Label>
                                    <Input type="text" placeholder="FirstName" id="FirstName" />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="LastName">LastName</Label>
                                    <Input type="text" placeholder="LastName" id="LastName" />
                                </LabelInputContainer>
                            </div>

                            <LabelInputContainer>
                                <Label htmlFor="MobNo">MobNo</Label>
                                <Input type="text" placeholder="MobNo" id="MobNo" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="LinkedIn">LinkedIn</Label>
                                <Input type="text" placeholder="LinkedIn" id="LinkedIn" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="GitHub">GitHub</Label>
                                <Input type="text" placeholder="GitHub" id="GitHub" />
                            </LabelInputContainer>
                        </div>
                        <div>
                            <LabelInputContainer>
                                <Label htmlFor="InsttName">InsttName</Label>
                                <Input type="text" placeholder="InsttName" id="InsttName" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="Course">Course</Label>
                                <Input type="text" placeholder="Course" id="Course" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="Score">Score</Label>
                                <Input type="text" placeholder="Score" id="Score" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="EduLocation">EduLocation</Label>
                                <Input type="text" placeholder="EduLocation" id="EduLocation" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="EduStartDate">EduStartDate</Label>
                                <Input type="text" placeholder="EduStartDate" id="EduStartDate" />
                            </LabelInputContainer>

                            <LabelInputContainer>
                                <Label htmlFor="EduEndDate">EduEndDate</Label>
                                <Input type="text" placeholder="EduEndDate" id="EduEndDate" />
                            </LabelInputContainer>
                        </div>
                    </div>
                </form>
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


export default Profile;