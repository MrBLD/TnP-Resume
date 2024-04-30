'use client'
import firebaseConfig from "@/components/FirebaseConfig/FirebaseConfig"
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";

const database = firebaseConfig();
const dbref = ref(database);

const UserName = "email-user0";


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

function NewResumeHandler(formData: any) {

    let ExpCounter='Exp_0'
    let ProjCounter='Proj_0'
    let AchCounter='Ach_0'
    
    console.log("Profile Handler called: " + formData.UserName);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    let EduCounter = 'Edu_0';

    const incrementCounter = (counter: string) => {
        const data = counter.split('_')
        const count = parseInt(data[1]);
        const newcounter = `${data[0]}_${count + 1}`;
        return newcounter;
    };
    let UserName = formData.UserName;
    let ResumeName = formData.ResumeName;
    let OrgName = formData.OrgName;
    let ExpTitle = formData.ExpTitle;
    let ExpRole = formData.ExpRole;
    let Description = formData.Description;
    let ExpLocation = formData.ExpLocation;
    let ExpStartDate = formData.ExpStartDate;
    let ExpEndDate = formData.ExpEndDate;
    let PTitle = formData.PTitle;
    let PRole = formData.PRole;
    let PDescription = formData.PDescription;
    let PExpLocation= formData.PExpLocation;
    let PStartDate = formData.PStartDate;
    let PEndDate = formData.PEndDate;
    let ProggLang = formData.ProggLang;
    let Tools = formData.Tools;
    let Lang = formData.Lang;
    let more_info = formData.more_info;
    let AchExpTitle = formData.AchExpTitle;
    let AchInfo = formData.AchInfo;

    const isNullorWhiteSpaces = (value: any) => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }

    let InsertData = async () => {

        let inputStrings = [OrgName, ExpTitle, ExpRole, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PExpLocation, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchExpTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/" + UserName + ResumeName))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    alert('Resume Data Exists, Please Select Update')
                    SelectData();
                }
                else {
                    console.log("user-data/" + UserName + "/" + ResumeName)
                    set(ref(database, "user-data/" + UserName + "/" + ResumeName), {
                        Experiences: {
                            [ExpCounter]: hashedExp
                        },
                        Projects: {
                            [ProjCounter]: hashedProj
                        },
                        SkillsInfo: hashedSkill,
                        Achievements: {
                            [AchCounter]: hashedAch
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

        get(child(dbref, "user-data/" + UserName + "/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                let splittedData = snapshot.val().Experiences.Exp_0.split("#");
                OrgName=(splittedData[0]);
                ExpTitle=(splittedData[1]);
                ExpRole=(splittedData[2]);
                Description=(splittedData[3]);
                ExpLocation=(splittedData[4]);
                ExpStartDate=(splittedData[5]);
                ExpEndDate=(splittedData[6]);
                splittedData= snapshot.val().Projects.Proj_0.split("#");
                PTitle=(splittedData[0])
                PRole=(splittedData[1])
                PDescription=(splittedData[2])
                PExpLocation=(splittedData[3])
                PStartDate=(splittedData[4])
                PEndDate=(splittedData[5])
                splittedData= snapshot.val().SkillsInfo.split("#");
                ProggLang=(splittedData[0]);
                Tools=(splittedData[1]);
                Lang=(splittedData[2]);
                more_info=(splittedData[3]);
                splittedData= snapshot.val().Achievements.Ach_0.split("#");
                AchExpTitle=(splittedData[0]);
                AchInfo=(splittedData[1]);
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

        let inputStrings = [OrgName, ExpTitle, ExpRole, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PExpLocation, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchExpTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/" + UserName)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, "user-data/" + UserName + "/" + ResumeName), {
                    Experiences: {
                        [ExpCounter]: hashedExp
                    },
                    Projects: {
                        [ProjCounter]: hashedProj
                    },
                    SkillsInfo: hashedSkill,
                    Achievements: {
                        [AchCounter]: hashedAch
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

        get(child(dbref, "user-data/" + UserName + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, "user-data/" + UserName + ResumeName))
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
}
