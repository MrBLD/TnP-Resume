'use client'
import './nav.css'

function Navbar() {
    return (
        <div className='flex'>
            <div className='font-semibold text-3xl'>TnP</div>
            <div className='flex justify-center flex-end end-1 absolute mr-5 text-xl'>
                <button className="nav-button" onClick={() => window.location.href = '/'}>Dash</button>
                <button className="nav-button" onClick={() => window.location.href = '/Manager'}>Manager</button>
                <button className="nav-button" onClick={() => window.location.href = '/Profile'}>Profile</button>
                <button className="nav-button" onClick={() => window.location.href = '/Profile'}>Pic</button>
            </div>
        </div>
    )
}

export default Navbar