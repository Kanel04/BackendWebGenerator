import React from 'react'

function NavbarTemplate() {
  return (
    <div>
    <div className="bg-black w-screen h-16">
      <div className="flex flex-row">
      <div className="ml-2 mt-2 text-3xl text-white">Logo</div>
    <div className="w-96 ml-80 pl-40"></div>
    <div className="text-white mt-3 ml-40">acceuil</div>
    <div className="text-white mt-3 ml-5">à propos</div>
    <div className="text-white mt-3 ml-5">contact</div>
    <div className="bg-white mt-3  h-11 ml-32 w-36 text-center items-center text-xl py-1 ">commencer</div>
      </div>
      
    </div>
      </div>
  )
}

export default NavbarTemplate