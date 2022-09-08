import React from 'react'

function Footer() {
  return (
    <div>
    <div className="bg-black w-screen h-96"> 
      <div className="flex flex-col">
      <div className="text-3xl text-white ml-16 py-16">Logo</div>
      <div className="flex flex-row">
    <div className="text-white ml-16">acceuil</div>
    <div className="text-white ml-5">à propos</div>
    <div className="text-white ml-5">contact</div>
    <div className="text-white ml-5">language</div>
    <div className="w-96"></div>
    <div className="flex flex-col">
      <div className="text-white">Contenu de ce site web</div>
    <input type="text" placeholder="Recheche" className="w-80 px-2" />
    </div>
    <div className=" bg-red-600 px-3 mt-5 text-white ml-2 w-32">recherche</div>
      </div>
      </div>
    
    </div>
      </div>
  )
}

export default Footer