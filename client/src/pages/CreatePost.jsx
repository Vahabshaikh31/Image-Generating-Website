import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [Msg, setMsg] = useState(false);

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          // `https://imagegeneratingwebsite.onrender.com/api/v1/dalle`,
          `https://localhost/api/v1/dalle`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();

        const imageUrl = data.result.images[0].url;

        if (imageUrl) {
          setForm({
            ...form,
            photo: imageUrl,
          });
        } else {
          alert("Failed to generate image");
        }
      } catch (error) {
        alert("An unexpected error occurred: " + error.message);
        setMsg(true);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://imagegeneratingwebsite.onrender.com/api/v1/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form }),
          }
        );

        await response.json();
        navigate("/");
      } catch (error) {
        alert("Sorry Currently out Of Credits");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-full p-3 sm:px-0 md:px-10 lg:px-20 mx-auto bg-black">
      <div>
        <h1 className="font-extrabold text-[#fff] text-[32px]">Create</h1>
        <p className="mt-2 text-[#fff] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images through DALL-E AI and
          share them with the community.
        </p>
        <p className="text-red-700">
          {Msg && <h1>Sorry Currently out Of Credits</h1>}
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name} // Corrected: Use form.name instead of a static value
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-slate-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 p-2.5 text-center"
            onClick={generateImage}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-10 text-[#fff] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
