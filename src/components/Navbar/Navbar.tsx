'use client'
import './NavBar.css'

function Navbar() {
    return (
        <div className=' flex w-full fixed z-10 '>
            {/* <div className=' flex w-full dark:bg-white/[0.5] bg-black/[0.5] border-b-2 border-slate-300'> */}
            <div className='font-semibold text-3xl m-4 text-white'>Training and Placements@NITAP</div>
            <div className='flex justify-center flex-end end-1 absolute mt-4 mr-5 text-xl'>
                <button><a className="nav-button" href = '/'>Dash</a></button>
                <button><a className="nav-button" href = '/Manager'>Manager</a></button>
                <button><a className="nav-button" href='/Profile'>Profile</a></button>
                <button><a className="nav-button" href='/Sign-in'>Pic</a></button>
            </div>
        </div>
    )
}

export default Navbar