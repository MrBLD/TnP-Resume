import firebaseConfig from "@/components/FirebaseConfig/FirebaseConfig"
import { ref, set, get, update, remove, child } from "firebase/database";

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
    console.log("Resume Handler called: " + formData.UserName);

    let ExpCounter = 'Exp_0'
    let ProjCounter = 'Proj_0'
    let AchCounter = 'Ach_0'

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
    let PStartDate = formData.PStartDate;
    let PEndDate = formData.PEndDate;
    let ProggLang = formData.ProggLang;
    let Tools = formData.Tools;
    let Lang = formData.Lang;
    let more_info = formData.more_info;
    let AchExpTitle = formData.AchExpTitle;
    let AchInfo = formData.AchInfo;

    // const isNullorWhiteSpaces = (value: any) => {
    //     value = value.toString();
    //     return (value == null || value.replaceAll(' ', '').length < 1);
    // }

    let InsertData = async () => {
        console.log("Insert Handler called: " + UserName);

        let inputStrings = [OrgName, ExpTitle, ExpRole, Description, ExpLocation, ExpStartDate, ExpEndDate]
        const hashedExp = addHashBetweenInputs(inputStrings);
        inputStrings = [PTitle, PRole, PDescription, PStartDate, PEndDate]
        const hashedProj = addHashBetweenInputs(inputStrings);
        inputStrings = [ProggLang, Tools, Lang, more_info]
        const hashedSkill = addHashBetweenInputs(inputStrings);
        inputStrings = [AchExpTitle, AchInfo]
        const hashedAch = addHashBetweenInputs(inputStrings);

        get(child(dbref, "user-data/" + UserName + ResumeName))
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    console.log('Resume Data Exists, Please Select Update')
                    // SelectData();
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
                            console.log("Resume Data Created")
                        })
                        .catch(error => {
                            console.log(error);
                            console.log("error in inserting userData");
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                console.log("no data exists")
            });
    }
    InsertData();
}

export default NewResumeHandler;