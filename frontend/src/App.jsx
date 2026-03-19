import { useState } from "react";
import { FaTrash, FaRegCircle, FaCheckCircle, FaTasks } from 'react-icons/fa'

const App = () => {
  return (
    <div className="py-50 px-10 min-h-screen w-full bg-gray-900 flex items-center justify-center text-white">
     
      {/* Container */}
      <div className="w-250">

        {/* Header */}
        <div className="bg-gray-800 w-full h-fit p-5 rounded-xl flex items-center justify-between gap-5"> 
        
        {/*Left */}
          <div>
                 <h1 className="text-3xl mb-2">Codiarc Planner</h1>
                 <p text-5m text-zinc-400>
                  Use this app to remember whatever you want to do 
                 </p>
          </div>

          {/*Right*/ }


        </div>
      </div>
    </div>
  )
}

export default App;