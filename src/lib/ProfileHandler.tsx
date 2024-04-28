// import { Label } from "@/components/ui/Label";
import firebaseConfig from "@/components/FirebaseConfig/FirebaseConfig"
import { ref, set, get, update, remove, child } from "firebase/database";

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
    let UpdateData = async () => {
        console.log("Insert Handler called: " + UserName);
        if (isNullorWhiteSpaces(UserName) || isNullorWhiteSpaces(FirstName) || isNullorWhiteSpaces(MobNo) || isNullorWhiteSpaces(LastName)) {
            console.log("Please fill all the Mandatory(*) fields");
            return;
        }

        let inputStrings = [UserName, FirstName, LastName, MobNo, LinkedIn, GitHub];
        const hashedInfo = addHashBetweenInputs(inputStrings);
        inputStrings = [InsttName, Course, Score, EduLocation, EduStartDate, EduEndDate]
        const hashedEdu = addHashBetweenInputs(inputStrings);

        console.log(hashedInfo, hashedEdu);


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

    UpdateData();
}

export default ProfileHandler