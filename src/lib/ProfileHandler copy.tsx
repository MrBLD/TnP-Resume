// import { Label } from "@/components/ui/Label";
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

function ProfileHandler(formData: any) {
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

    let UserName = formData.UserName;
    let FirstName = formData.FirstName;
    let LastName = formData.LastName;
    let MobNo = formData.MobNo;
    let LinkedIn = formData.LinkedIn;
    let GitHub = formData.GitHub;
    let InsttName = formData.InsttName;
    let Course = formData.Course;
    let Score = formData.Score;
    let EduLocation = formData.EduLocation;
    let EduStartDate = formData.EduStartDate;
    let EduEndDate = formData.EduEndDate;

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
                UserName = (splittedData[0]);
                FirstName = (splittedData[1]);
                LastName = (splittedData[2]);
                MobNo = (splittedData[3]);
                LinkedIn = (splittedData[4]);
                GitHub = (splittedData[5]);
                splittedData = snapshot.val().Educations.Edu_0.split("#");
                InsttName = (splittedData[0]);
                Course = (splittedData[1]);
                Score = (splittedData[2]);
                EduLocation = (splittedData[3]);
                EduStartDate = (splittedData[4]);
                EduEndDate = (splittedData[5]);
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

}

export default ProfileHandler