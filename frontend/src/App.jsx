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
              <span className={`w-6 h-6 rounded-full bg-red-500 block ${color === "red" ? "border-2 border-white" : ""}`}>
              </span>
            </label>

          </div>
        </form>

      </div>
    </div>
  )
}

export default App;