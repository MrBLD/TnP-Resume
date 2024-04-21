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
        
        get(child(dbref, "user-data/email-user0/" + ResumeName))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    alert('Resume Data Exists, Please Select Update')
                    SelectData();
                }
                else {
                    set(ref(database, "user-data/email-user0/"), {
                        UserInfo: hashedInfo,
                        Edu: {
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
        if (isNullorWhiteSpaces(ResumeName)) {
            alert("Please enter ResumeName");
            return;
        }

        get(child(dbref, "user-data/email-user0/" + ResumeName)).then(snapshot => {
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
    
        get(child(dbref, "user-data/email-user0/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                update(ref(database, "user-data/email-user0/"), {
                    UserInfo: hashedInfo,
                    Edu: {
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
        if (isNullorWhiteSpaces(ResumeName)) {
            alert("ResumeName is empty to delete");
            return;
        }
        
        get(child(dbref, "user-data/email-user0/" + ResumeName)).then(snapshot => {
            if (snapshot.exists()) {
                remove(ref(database, "user-data/email-user0/" + ResumeName))
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

            <button onClick={InsertData}>Insert data</button>
            <button onClick={UpdateData}>Update data</button>
            <button onClick={SelectData}>Select data</button>
            <button onClick={DeleteData}>Delete data</button>
        </div>
    )
}

export default ProfileCRUD
