import React from 'react'

function Navbar() {
  return (
    <div>
    <div className="bg-slate-700 w-screen h-16">
      <div className="flex flex-row">
      <div className="ml-2 mt-2 text-3xl text-white">Logo</div>
      <input type="text" placeholder="recheche" className="ml-96 rounded-full mt-2 pl-5 w-96" />
    <div className="text-white mt-3 ml-40">acceuil</div>
    <div className="text-white mt-3 ml-5">à propos</div>
    <div className="text-white mt-3 ml-5">contact</div>
    
      </div>
      
    </div>
      </div>
  )
}

export default Navbar