'use client'
import firebaseConfig from "../FirebaseConfig/FirebaseConfig"
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

function FirebaseCrud() {

    let [EduCounter, setEduCounter] = useState<string>('Edu_0')
    let [ExpCounter, setExpCounter] = useState<string>('Exp_0')
    let [ProjCounter, setProjCounter] = useState<string>('Proj_0')
    let [AchCounter, setAchCounter] = useState<string>('Ach_0')
    const incrementCounter = (counter: string) => {
        const data = counter.split('_')
        const count = parseInt(data[1]);
        const newcounter = `${data[0]}_${count + 1}`;
        return newcounter;
    };

    let [ResumeName, setResumeName] = useState<string>("");
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

    let [OrgName, setOrgName] = useState<string>('')
    let [Title, setTitle] = useState<string>('')
    let [Role, setRole] = useState<string>('')
    let [Description, setDescription] = useState<string>('')
    let [ExpLocation, setExpLocation] = useState<string>('')
    let [ExpStartDate, setExpStartDate] = useState<string>('')
    let [ExpEndDate, setExpEndDate] = useState<string>('')

    let [PTitle, setPTitle] = useState<string>('')
    let [PRole, setPRole] = useState<string>('')
    let [PDescription, setPDescription] = useState<string>('')
    let [PExpLocation, setPExpLocation] = useState<string>('')
    let [PStartDate, setPStartDate] = useState<string>('')
    let [PEndDate, setPEndDate] = useState<string>('')

    let [ProggLang, setProggLang] = useState<string>('')
    let [Tools, setTools] = useState<string>('')
    let [Lang, setLang] = useState<string>('')
    let [more_info, setmore_info] = useState<string>('')

    let [AchTitle, setAchTitle] = useState<string>('')
    let [AchInfo, setAchInfo] = useState<string>('')

    const isNullorWhiteSpaces = (value: any) => {
        value = value.toString();
        return (value == null || value.replaceAll(' ', '').length < 1);
    }

    let InsertData = async () => {
        if (isNullorWhiteSpaces(ResumeName) || isNullorWhiteSpaces(FirstName) || isNullorWhiteSpaces(MobNo) || isNullorWhiteSpaces(LastName)) {
            alert("Please fill all the Mandatory(*) fields");
            return;
        }

        let inputStrings = [ResumeName, FirstName, LastName, MobNo, LinkedIn, GitHub];
        const hashedInfo = addHashBetweenInputs(inputStrings);
        inputStrings = [InsttName, Course, Score, EduLocation, EduStartDate, EduEndDate]
        const hashedEdu = addHashBetweenInputs(inputStrings);
        inputStrings = [OrgName, Title, Role, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PExpLocation, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/email-user1/" + ResumeName))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    alert('Resume Data Exists, Please Select Update')
                    SelectData();
                }
                else {
                    set(ref(database, "user-data/email-user1/" + ResumeName), {
                        UserInfo: hashedInfo,
                        [EduCounter]: {
                            EducationInfo: hashedEdu
                        },
                        [ExpCounter]: {
                            ExperienceInfo: hashedExp
                        },
                        [ProjCounter]: {
                            ProjectInfo: hashedProj
                        },
                        SkillInfo: hashedSkill,
                        [AchCounter]: {
                            AchievementInfo: hashedAch
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
        if (isNullorWhiteSpaces(ResumeName)) {
            alert("Please enter ResumeName");
            return;
        }

        get(child(dbref, "user-data/email-user1/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                let splittedData = snapshot.val().UserInfo.split("#");
                setResumeName(splittedData[0]);
                setFirstName(splittedData[1]);
                setLastName(splittedData[2]);
                setMobNo(splittedData[3]);
                setLinkedIn(splittedData[4]);
                setGitHub(splittedData[5]);
                splittedData = snapshot.val().Edu_0.EducationInfo.split("#");
                setInsttName(splittedData[0]);
                setCourse(splittedData[1]);
                setScore(splittedData[2]);
                setEduLocation(splittedData[3]);
                setEduStartDate(splittedData[4]);
                setEduEndDate(splittedData[5]);
                splittedData = snapshot.val().Exp_0.ExperienceInfo.split("#");
                setOrgName(splittedData[0]);
                setTitle(splittedData[1]);
                setRole(splittedData[2]);
                setDescription(splittedData[3]);
                setExpLocation(splittedData[4]);
                setExpStartDate(splittedData[5]);
                setExpEndDate(splittedData[6]);
                splittedData = snapshot.val().Proj_0.ProjectInfo.split("#");
                setPTitle(splittedData[0])
                setPRole(splittedData[1])
                setPDescription(splittedData[2])
                setPExpLocation(splittedData[3])
                setPStartDate(splittedData[4])
                setPEndDate(splittedData[5])
                splittedData = snapshot.val().Skill.SkillInfo.split("#");
                setProggLang(splittedData[0]);
                setTools(splittedData[1]);
                setLang(splittedData[2]);
                setmore_info(splittedData[3]);
                splittedData = snapshot.val().Ach_0.AchievementInfo.split("#");
                setAchTitle(splittedData[0]);
                setAchInfo(splittedData[1]);
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
        if (isNullorWhiteSpaces(ResumeName)) {
            alert("ResumeName is empty try to select ResumeName first with the select button");
            return;
        }

        let inputStrings = [ResumeName, FirstName, LastName, MobNo, LinkedIn, GitHub];
        const hashedInfo = addHashBetweenInputs(inputStrings);
        inputStrings = [InsttName, Course, Score, EduLocation, EduStartDate, EduEndDate]
        const hashedEdu = addHashBetweenInputs(inputStrings);
        inputStrings = [OrgName, Title, Role, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PExpLocation, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/email-user1/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, "user-data/email-user1/" + ResumeName), {
                    UserInfo: hashedInfo,
                    [EduCounter]: {
                        EducationInfo: hashedEdu
                    },
                    [ExpCounter]: {
                        ExperienceInfo: hashedExp
                    },
                    [ProjCounter]: {
                        ProjectInfo: hashedProj
                    },
                    SkillInfo: hashedSkill,
                    [AchCounter]: {
                        AchievementInfo: hashedAch
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
        if (isNullorWhiteSpaces(ResumeName)) {
            alert("ResumeName is empty to delete");
            return;
        }
        
        get(child(dbref, "user-data/email-user1/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, "user-data/email-user1/" + ResumeName))
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
        <div className=" flex flex-rowin">
            <div>
                <h1>Info Data</h1>
                <label>ResumeName: </label>
                <input type="text" value={ResumeName} onChange={(e: any) => { setResumeName(e.target.value) }} />
                <br />

                <label>FirstName</label>
                <input type="text" value={FirstName} onChange={(e: any) => { setFirstName(e.target.value) }} />
                <br />

                <label>LastName</label>
                <input type="text" value={LastName} onChange={(e: any) => { setLastName(e.target.value) }} />
                <br />

                <label>MobNo</label>
                <input type="text" value={MobNo} onChange={(e: any) => { setMobNo(e.target.value) }} />
                <br />

                <label>LinkedIn</label>
                <input type="text" value={LinkedIn} onChange={(e: any) => { setLinkedIn(e.target.value) }} />
                <br />

                <label>GitHub</label>
                <input type="text" value={GitHub} onChange={(e: any) => { setGitHub(e.target.value) }} />
                <br />
            </div>
            <div>
            <h1>EDU Data</h1>
                <label>InsttName</label>
                <input type="text" value={InsttName} onChange={(e: any) => { setInsttName(e.target.value) }} />
                <br />

                <label>Course</label>
                <input type="text" value={Course} onChange={(e: any) => { setCourse(e.target.value) }} />
                <br />

                <label>Score</label>
                <input type="text" value={Score} onChange={(e: any) => { setScore(e.target.value) }} />
                <br />

                <label>EduLocation</label>
                <input type="text" value={EduLocation} onChange={(e: any) => { setEduLocation(e.target.value) }} />
                <br />

                <label>EduStartDate</label>
                <input type="text" value={EduStartDate} onChange={(e: any) => { setEduStartDate(e.target.value) }} />
                <br />

                <label>EduEndDate</label>
                <input type="text" value={EduEndDate} onChange={(e: any) => { setEduEndDate(e.target.value) }} />
                <br />
            </div>
            <div>
            <h1>Exp Data</h1>
                <label>OrgName</label>
                <input type="text" value={OrgName} onChange={(e: any) => { setOrgName(e.target.value) }} />
                <br />

                <label>Title</label>
                <input type="text" value={Title} onChange={(e: any) => { setTitle(e.target.value) }} />
                <br />

                <label>Role</label>
                <input type="text" value={Role} onChange={(e: any) => { setRole(e.target.value) }} />
                <br />

                <label>Description</label>
                <input type="text" value={Description} onChange={(e: any) => { setDescription(e.target.value) }} />
                <br />

                <label>ExpLocation</label>
                <input type="text" value={ExpLocation} onChange={(e: any) => { setExpLocation(e.target.value) }} />
                <br />

                <label>EduStartDate</label>
                <input type="text" value={ExpStartDate} onChange={(e: any) => { setExpStartDate(e.target.value) }} />
                <br />

                <label>EduEndDate</label>
                <input type="text" value={ExpEndDate} onChange={(e: any) => { setExpEndDate(e.target.value) }} />
                <br />
            </div>
            <div>
            <h1>Proj Data</h1>
                <label>PTitle</label>
                <input type="text" value={PTitle} onChange={(e: any) => { setPTitle(e.target.value) }} />
                <br />

                <label>PRole</label>
                <input type="text" value={PRole} onChange={(e: any) => { setPRole(e.target.value) }} />
                <br />

                <label>PDescription</label>
                <input type="text" value={PDescription} onChange={(e: any) => { setPDescription(e.target.value) }} />
                <br />

                <label>PStartDate</label>
                <input type="text" value={PStartDate} onChange={(e: any) => { setPStartDate(e.target.value) }} />
                <br />

                <label>PEndDate</label>
                <input type="text" value={PEndDate} onChange={(e: any) => { setPEndDate(e.target.value) }} />
                <br />
            </div>
            <div>
            <h1>Skills Data</h1>
                <label>ProggLang</label>
                <input type="text" value={ProggLang} onChange={(e: any) => { setProggLang(e.target.value) }} />
                <br />

                <label>Tools</label>
                <input type="text" value={Tools} onChange={(e: any) => { setTools(e.target.value) }} />
                <br />

                <label>Lang</label>
                <input type="text" value={Lang} onChange={(e: any) => { setLang(e.target.value) }} />
                <br />

                <label>more_info</label>
                <input type="text" value={more_info} onChange={(e: any) => { setmore_info(e.target.value) }} />
                <br />
            </div>
            <div>
            <h1>Ach Data</h1>
                <label>AchTitle</label>
                <input type="text" value={AchTitle} onChange={(e: any) => { setAchTitle(e.target.value) }} />
                <br />
                <label>AchInfo</label>
                <input type="text" value={AchInfo} onChange={(e: any) => { setAchInfo(e.target.value) }} />
                <br />
            </div>

            <button onClick={InsertData}>Insert data</button>
            <button onClick={UpdateData}>Update data</button>
            <button onClick={SelectData}>Select data</button>
            <button onClick={DeleteData}>Delete data</button>
        </div>
    )
}

export default FirebaseCrud
