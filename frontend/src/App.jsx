import { useState } from "react";
import { FaTrash, FaRegCircle, FaCheckCircle, FaTasks } from 'react-icons/fa'

const App = () => {
  const [color, setColor] = useState("gray");
  return (
    <div className="py-50 px-10 min-h-screen w-full bg-gray-900 flex items-center justify-center text-white">

      {/* Container */}
      <div className="w-250">

        {/* Header */}
        <div className="bg-gray-800 w-full h-fit p-5 rounded-xl flex items-center justify-between gap-5">

          {/* Left */}
          <div>
            <h1 className="text-3xl mb-2">Codiarc Planner</h1>
            <p className="text-sm text-zinc-400">
              Use this app to remember whatever you want to do
            </p>
          </div>

          {/* Right */}
          <div className="text-5xl text-gray-400">
            <FaTasks />
          </div>

        </div>

        {/* Form */}
        <form className="bg-gray-800 flex justify-between gap-5 p-5 rounded-xl mt-3 w-full">
          <input
            type="text"
            placeholder="Write your task here ..."
            className="px-3 py-2 bg-gray-900 w-full rounded-md outline-0"
          />

          {/* Colors */}
          <div className="flex items-center gap-4">

            {/* Red */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="red"
                checked={color === "red"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span className={`w-6 h-6 rounded-full bg-red-500 block ${color === "red" ? "border-2 border-white"
                 : "border-2 border-transparent"}`}>
              </span>
            </label>

                   {/* Blue */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="blue"
                checked={color === "blue"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span className={`w-6 h-6 rounded-full bg-blue-500 block ${color === "blue" ? "border-2 border-white"
                 : "border-2 border-transparent"}`}>
              </span>
            </label>

                         {/* Green */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="green"
                checked={color === "green"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span className={`w-6 h-6 rounded-full bg-green-500 block ${color === "green" ? "border-2 border-white"
                 : "border-2 border-transparent"}`}>
              </span>
            </label>

                         {/* Yellow */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="yellow"
                checked={color === "yellow"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span className={`w-6 h-6 rounded-full bg-yellow-500 block ${color === "yellow" ? "border-2 border-white"
                 : "border-2 border-transparent"}`}>
              </span>
            </label>

                         {/* Pink */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="pink"
                checked={color === "pink"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span className={`w-6 h-6 rounded-full bg-pink-500 block ${color === "pink" ? "border-2 border-white"
                 : "border-2 border-transparent"}`}>
              </span>
            </label>

                         {/* Gray */}
            <label className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value="gray"
                checked={color === "gray"}
                onChange={(e) => setColor(e.target.value)}
                className="hidden"
              />
              <span className={`w-6 h-6 rounded-full bg-gray-300 block ${color === "gray" ? "border-2 border-white"
                 : "border-2 border-transparent"}`}>
              </span>
            </label>
          </div>

          <button className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md cursor-pointer "> 
            {" "}
            Submit{" "}
           </button>
        </form>
      
      {/* Tasks */}
       
       <ul className="flex flex-col gap-2 w-full mt-3">
            {/* Task */}

            <li className="w-full bg-gray-950 px-6 py-5 rounded-xl flex justify-between">
               {/* Content */}
              
              <div className="border-l-5 border-red-400 pl-3 rounded-md">
                 <p className="text-xl mb-1">
                This is a sample task for showing the template and learn
              </p>
              <span className="text-5m text-zinc-400">Created On</span> {" "}
              <span className="text-5m text-red-400 font-bold">Tuesday</span> {" "}
              <span className="text-5m text-red-400"> March 19 2026 - 12 AM </span>
              </div>  
               
               {/* Button */}
               <div className="flex items-center gap-3">
              <button className="text-red-500 cursor-pointer" >
                <FaTrash/>
              </button>

              <button className="text-gray-400 cursor-pointer text-lg">
               <FaRegCircle/>
              </button>
              </div>
            </li>

               <li className="w-full bg-gray-950 px-6 py-5 rounded-xl flex justify-between">
               {/* Content */}
              
              <div className="border-l-5 border-blue-400 pl-3 rounded-md">
                 <p className="text-xl mb-1 line-through text-gray-400">
                This is a sample task for showing the template and learn
              </p>
              <span className="text-5m text-zinc-400">Created On</span> {" "}
              <span className="text-5m text-blue-400 font-bold">Tuesday</span> {" "}
              <span className="text-5m text-blue-400"> March 19 2026 - 12 AM </span>
              </div>  
               
               {/* Button */}
               <div className="flex items-center gap-3">
              <button className="text-blue-500 cursor-pointer" >
                <FaTrash/>
              </button>

              <button className="text-gray-400 cursor-pointer text-lg">
               <FaCheckCircle/>
              </button>
              </div>
            </li>
       </ul>

      </div>
    </div>
  )
}

export default App;