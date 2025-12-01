import { useState } from "react";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]); // chat history

  async function sendMessage() {
    // add user message
    setMessages(prev => [...prev, { from: "user", text: msg }]);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await res.json();

    // add bot reply
    setMessages(prev => [...prev, { from: "bot", text: data.reply }]);

    setMsg("");
  }

  return (
    <div className="container">
      <h2>Chatbot</h2>

      <div className="chat">
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.from === "user" ? "userBubble" : "botBubble"}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="inputRow">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
