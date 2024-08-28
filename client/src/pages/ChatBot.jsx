import { useState } from "react";
import { Loader } from "../components";

const ChatBot = () => {
  const [data, setData] = useState({
    messages: [
      { id: 1, message: "Hello! I'm here to help you.", type: "Bot" },
    
    ],
  });
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: value }), // Send 'prompt' in request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rs = await response.json();
      const botMessage = rs.data;

      setData((prevData) => ({
        ...prevData,
        messages: [
          ...prevData.messages,
          { id: Date.now(), message: botMessage, type: "Bot" },
        ],
      }));
      
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleClick = () => {
    if (value.trim() === "") return; // Prevent empty messages from being sent

    // Add user's message to the messages
    setData((prevData) => ({
      ...prevData,
      messages: [
        ...prevData.messages,
        { id: Date.now(), message: value, type: "human" },
      ],
    }));

    console.log("Message sent:", value);
    setValue("");

    fetchData();
  };

  // Function to render formatted text
  const renderFormattedMessage = (message) => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const bulletPattern = /\*(.*?)\*/g;

    // Replace bold and bullets with HTML elements
    const formattedMessage = message
      .replace(boldPattern, "<strong>$1</strong>")
      .replace(bulletPattern, "<li>$1</li>");

    return <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />;
  };

  return (
    <div className="max-w-7xl mx-auto relative flex items-center justify-center flex-col p-5 rounded-lg shadow-lg">
      <h1 className="text-4xl mb-2">Futuristic ChatBot</h1>
      <div className="bg-gray-800 p-4 rounded-lg w-full  h-[70vh] overflow-auto max-w-2xl">
        <div className="flex flex-col space-y-4">
          {data.messages.map((curr) => (
            <div
              key={curr.id}
              className={`p-3 rounded-lg ${
                curr.type === "Bot"
                  ? "text-gray-300 bg-gray-700"
                  : "text-white bg-gray-600 ml-auto"
              } max-w-sm`}
            >
              {curr.type === "Bot" ? "Bot: " : "You: "}
              {  renderFormattedMessage(curr.message)}
            </div>
          ))}
        </div>
          </div>
        <div className="flex mt-5">
          <input
            type="text"
            placeholder="Type your message..."
            value={value}
            onChange={handleChange}
            name="text"
            className="p-2 border rounded-l-lg w-full bg-gray-700 border-gray-600 text-white focus:outline-none"
          />
          <button
            className="p-2 py-1 rounded-r-lg text-white bg-blue-500 hover:bg-blue-600"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
    </div>
  );
};

export default ChatBot;
