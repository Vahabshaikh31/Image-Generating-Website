import { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [data, setData] = useState({
    messages: [{ id: 1, message: "Hello! I'm here to help you.", type: "Bot" }],
  });
  const [value, setValue] = useState("");
  const messagesEndRef = useRef(null); // Reference for scrolling to the bottom

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

  const renderFormattedMessage = (message) => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const bulletPattern = /\*(.*?)\*/g;

    const formattedMessage = message
      .replace(boldPattern, "<strong>$1</strong>")
      .replace(bulletPattern, "<li>$1</li>");

    return <div dangerouslySetInnerHTML={{ __html: formattedMessage }} />;
  };

  // Scroll to the bottom of the messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data.messages]);

  return (
    <div className="max-w-full bg-black mx-auto relative flex items-center justify-center flex-col p-5 overflow-hidden rounded-lg shadow-lg">
      <h1 className="text-4xl mb-4 text-white">Futuristic ChatBot</h1>
      <div className="bg-gray-800 p-4 rounded-lg w-full h-[70vh] overflow-auto max-w-2xl shadow-md">
        <div className="flex flex-col space-y-4">
          {data.messages.map((curr) => (
            <div
              key={curr.id}
              className={`p-3 rounded-lg transition-all duration-300 ${
                curr.type === "Bot"
                  ? "text-gray-300 bg-gray-700"
                  : "text-white bg-blue-600 ml-auto"
              } max-w-sm`}
            >
              {curr.type === "Bot" ? "Bot: " : "You: "}
              {renderFormattedMessage(curr.message)}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Reference for scrolling */}
        </div>
      </div>
      <div className="flex max-w-46 mt-4 overflow-hidden">
        <input
          type="text"
          placeholder="Type your message..."
          value={value}
          onChange={handleChange}
          name="text"
          className="p-3 border rounded-l-lg w-full bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          className="p-3 rounded-r-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200"
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
