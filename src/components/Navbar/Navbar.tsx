'use client'
import './NavBar.css'

function Navbar() {
    return (
        <div className=' flex w-full border-b-2 border-slate-300 fixed z-10 '>
            {/* <div className=' flex w-full dark:bg-white/[0.5] bg-black/[0.5] border-b-2 border-slate-300'> */}
            <div className='font-semibold text-3xl m-4 '>TnP@NITAP</div>
            <div className='flex justify-center flex-end end-1 absolute mt-4 mr-5 text-xl'>
                <button className="nav-button" onClick={() => window.location.href = '/'}>Dash</button>
                <button className="nav-button" onClick={() => window.location.href = '/Manager'}>Manager</button>
                <button className="nav-button" onClick={() => window.location.href = '/Profile'}>Profile</button>
                <button className="nav-button" onClick={() => window.location.href = '/Sign-in'}>Pic</button>
            </div>
        </div>
    )
}

export default Navbar