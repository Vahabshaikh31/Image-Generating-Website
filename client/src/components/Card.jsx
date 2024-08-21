import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => (
  <div className=" w-auto flex justify-center items-center relative group rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img className="object-cover rounded-t-xl" src={photo} alt={prompt} />
    <div className="hidden group-hover:flex flex-col absolute inset-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-xl transition-opacity duration-300 ease-in-out justify-between">
      <p className="text-white font-bold text-sm overflow-y-auto mb-4">{prompt}</p>
      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-2 ">
          <div className="w-8 h-8 bg-green-600 font-bold text-white text-sm font-bold flex justify-center items-center rounded-full">
            {name[0].toUpperCase()}
          </div>
          <p className="text-white text-sm font-bold">{name}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadImage(_id, photo)}
          className="p-2 bg-white bg-opacity-20 hover:bg-opacity-40 transition-colors duration-200 rounded-full"
        >
          <img
            src={download}
            alt="download"
            className="w-5 h-5 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
