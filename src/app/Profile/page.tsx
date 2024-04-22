"use client";
import React from "react";
// import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";



import firebaseConfig from "@/components/FirebaseConfig/FirebaseConfig"
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";

const database = firebaseConfig();
const dbref = ref(database);

function addHashBetweenInputs(inputs: string[]): string {
    const allEmpty = inputs.every(input => input === '');
    if (allEmpty) {
        return '';
    }
    // Join all inputs with '#'
    return inputs.join('#');
}
function deHash(input: string) {
    // Split the string by '#'
    return input.split('#');
}

function ProfileCRUD() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    let [EduCounter, setEduCounter] = useState<string>('Edu_0')
    const incrementCounter = (counter: string) => {
        const data = counter.split('_')
        const count = parseInt(data[1]);
        const newcounter = `${data[0]}_${count + 1}`;
        return newcounter;
    };

    let [UserName, setUserName] = useState<string>("");
    let [FirstName, setFirstName] = useState<string>("");
    let [LastName, setLastName] = useState<string>('');
    let [MobNo, setMobNo] = useState<string>('');
    let [LinkedIn, setLinkedIn] = useState<string>('');
    let [GitHub, setGitHub] = useState<string>('')

    let [InsttName, setInsttName] = useState<string>('')
    let [Course, setCourse] = useState<string>('')
    let [Score, setScore] = useState<string>('')
    let [EduLocation, setEduLocation] = useState<string>('')
    let [EduStartDate, setEduStartDate] = useState<string>('')
    let [EduEndDate, setEduEndDate] = useState<string>('')

    const isNullorWhiteSpaces = (value: any) => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }

    let InsertData = async () => {
        if (isNullorWhiteSpaces(UserName) || isNullorWhiteSpaces(FirstName) || isNullorWhiteSpaces(MobNo) || isNullorWhiteSpaces(LastName)) {
            alert("Please fill all the Mandatory(*) fields");
            return;
        }

        let inputStrings = [UserName, FirstName, LastName, MobNo, LinkedIn, GitHub];
        const hashedInfo = addHashBetweenInputs(inputStrings);
        inputStrings = [InsttName, Course, Score, EduLocation, EduStartDate, EduEndDate]
        const hashedEdu = addHashBetweenInputs(inputStrings);

        console.log(hashedInfo, hashedEdu);


        get(child(dbref, "user-data/" + UserName))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    alert('Resume Data Exists, Please Select Update')
                    SelectData();
                }
                else {
                    set(ref(database, "user-data/" + UserName), {
                        UserInfo: hashedInfo,
                        Educations: {
                            [EduCounter]: hashedEdu
                        },
                    })
                        .then(() => {
                            alert("Resume Data Created")
                        })
                        .catch(error => {
                            console.log(error);
                            alert("error in inserting userData");
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    let SelectData = () => {
        if (isNullorWhiteSpaces(UserName)) {
            alert("Please enter UserName");
            return;
        }

        get(child(dbref, "user-data/" + UserName)).then(snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                let splittedData = snapshot.val().UserInfo.split("#");
                setUserName(splittedData[0]);
                setFirstName(splittedData[1]);
                setLastName(splittedData[2]);
                setMobNo(splittedData[3]);
                setLinkedIn(splittedData[4]);
                setGitHub(splittedData[5]);
                splittedData = snapshot.val().Educations.Edu_0.split("#");
                setInsttName(splittedData[0]);
                setCourse(splittedData[1]);
                setScore(splittedData[2]);
                setEduLocation(splittedData[3]);
                setEduStartDate(splittedData[4]);
                setEduEndDate(splittedData[5]);
            }
            else {
                alert("no data available")
            }
        })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    let UpdateData = () => {
        if (isNullorWhiteSpaces(UserName)) {
            alert("UserName is empty try to select UserName first with the select button");
            return;
        }

        let inputStrings = [UserName, FirstName, LastName, MobNo, LinkedIn, GitHub];
        const hashedInfo = addHashBetweenInputs(inputStrings);
        inputStrings = [InsttName, Course, Score, EduLocation, EduStartDate, EduEndDate]
        const hashedEdu = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/" + UserName)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, "user-data/" + UserName), {
                    UserInfo: hashedInfo,
                    Educations: {
                        [EduCounter]: hashedEdu
                    },
                }).then(() => {
                    alert("user updated")
                })
                    .catch(error => {
                        console.log(error);
                        alert("error in updating customer");
                    });
            }
            else {

                alert('user doesn not exist')
            }
        })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    let DeleteData = () => {
        if (isNullorWhiteSpaces(UserName)) {
            alert("UserName is empty to delete");
            return;
        }

        get(child(dbref, "user-data/" + UserName)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, "user-data/" + UserName))
                    .then(() => {
                        alert("user deleted")
                    })
                    .catch(error => {
                        console.log(error);
                        alert("error in deleting customer");
                    });
            }
            else {

                alert('user doesn not exist')
            }
        })
            .catch((error) => {
                console.error(error);
                alert("no data exists")
            });
    }

    return (

        <main className="flex flex-row-reverse">
            <div className=" min-w-fit z-20 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black/[0.9]">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    User Profile Details
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Fill the details to Set-up your Profile
                </p>
                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-semibold">Info Data</h1>
                    <div>
                        <label>UserName: </label>
                        <br />
                        <input type="text" value={UserName} onChange={(e: any) => { setUserName(e.target.value) }} />
                        <br />

                        <label>FirstName</label>
                        <br />
                        <input type="text" value={FirstName} onChange={(e: any) => { setFirstName(e.target.value) }} />
                        <br />

                        <label>LastName</label>
                        <br />
                        <input type="text" value={LastName} onChange={(e: any) => { setLastName(e.target.value) }} />
                        <br />

                        <label>MobNo</label>
                        <br />
                        <input type="text" value={MobNo} onChange={(e: any) => { setMobNo(e.target.value) }} />
                        <br />

                        <label>LinkedIn</label>
                        <br />
                        <input type="text" value={LinkedIn} onChange={(e: any) => { setLinkedIn(e.target.value) }} />
                        <br />

                        <label>GitHub</label>
                        <br />
                        <input type="text" value={GitHub} onChange={(e: any) => { setGitHub(e.target.value) }} />
                        <br />
                    </div>

                    <h1 className="text-xl font-semibold">EDU Data</h1>
                    <div>
                        <label>InsttName</label>
                        <br />
                        <input type="text" value={InsttName} onChange={(e: any) => { setInsttName(e.target.value) }} />
                        <br />

                        <label>Course</label>
                        <br />
                        <input type="text" value={Course} onChange={(e: any) => { setCourse(e.target.value) }} />
                        <br />

                        <label>Score</label>
                        <br />
                        <input type="text" value={Score} onChange={(e: any) => { setScore(e.target.value) }} />
                        <br />

                        <label>EduLocation</label>
                        <br />
                        <input type="text" value={EduLocation} onChange={(e: any) => { setEduLocation(e.target.value) }} />
                        <br />

                        <label>EduStartDate</label>
                        <br />
                        <input type="text" value={EduStartDate} onChange={(e: any) => { setEduStartDate(e.target.value) }} />
                        <br />

                        <label>EduEndDate</label>
                        <br />
                        <input type="text" value={EduEndDate} onChange={(e: any) => { setEduEndDate(e.target.value) }} />
                        <br />
                    </div>
                </div>
                {/* <div>
                    <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" onSubmit={InsertData}>Insert data &rarr;<BottomGradient /></button>
                    <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" onSubmit={UpdateData}>Update data &rarr;<BottomGradient /></button>
                    <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" onSubmit={SelectData}>Select data &rarr;<BottomGradient /></button>
                    <button className="bg-gradient-to-br relative 
          group/btn 
          from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-2" type="submit" onSubmit={DeleteData}>Delete data &rarr;<BottomGradient /></button>
</div> */}
                <div className="grid grid-cols-2">
                    <button className="p-1 bg-slate-700 m-2 border-yellow-500 border-2 rounded" onClick={InsertData}>Insert data</button>
                    <button className="p-1 bg-slate-700 m-2 border-yellow-500 border-2 rounded" onClick={UpdateData}>Update data</button>
                    <button className="p-1 bg-slate-700 m-2 border-yellow-500 border-2 rounded" onClick={SelectData}>Select data</button>
                    <button className="p-1 bg-slate-700 m-2 border-yellow-500 border-2 rounded" onClick={DeleteData}>Delete data</button>
                </div>
            </div>
        </main >
    )
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

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

export default ProfileCRUD