import './Dashboard.css';
import {
    IconMailFilled,
    IconPhoneFilled,
    IconHomeFilled,
    IconBrandGithubFilled,
    IconBrandLinkedin,
} from "@tabler/icons-react";

function Dashboard() {
    return (
        <>
            <div className='flex flex-row-reverse items-center h-screen mr-24 '>
                <div >
                    <div className='text-cyan-900  font-bold text-6xl'>Bhaskar Lal Das</div>
                    <div className='flex flex-row-reverse '>
                        <div className='flex items-end flex-col p-10'>                    <div className='flex space-x-2'>
                            <span className="text-cyan-900 font-semibold text-2xl">
                                Email
                            </span>
                            <IconMailFilled className=" text-cyan-900" />
                        </div>
                            <div className='flex space-x-2'>
                                <span className="text-cyan-900 font-semibold text-2xl">
                                    Phone
                                </span>
                                <IconPhoneFilled className=" text-cyan-900" />
                            </div>
                            <div className='flex space-x-2'>
                                <span className="text-cyan-900 font-semibold text-2xl">
                                    Address
                                </span>
                                <IconHomeFilled className=" text-cyan-900" />
                            </div>
                            <div className='flex space-x-2'>
                                <span className="text-cyan-900 font-semibold text-2xl">
                                    Linkedin
                                </span>
                                <IconBrandLinkedin className=" text-cyan-900" />
                            </div>
                            <div className='flex space-x-2'>
                                <span className="text-cyan-900 font-semibold text-2xl">
                                    Github
                                </span>
                                <IconBrandGithubFilled className=" text-cyan-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;