
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Link } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Rosie, your AI care companion. How can I help you today?",
      sender: "bot",
      timestamp: "Just now"
    },
    {
      id: 2,
      text: "I'm feeling overwhelmed with my mom's care. Any advice?",
      sender: "user",
      timestamp: "2 min ago"
    },
    {
      id: 3,
      text: "I understand how challenging caregiving can be. It's completely normal to feel overwhelmed. Would you like to talk about what specific aspects are causing you the most stress?",
      sender: "bot",
      timestamp: "1 min ago"
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: "Just now"
      }]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f2d0] via-[#e8e5e0] to-[#d6e5f0] flex flex-col">
      <header className="p-4 bg-white/80 backdrop-blur-md border-b border-[#c4a91a]/20">
        <div className="max-w-md mx-auto flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm" className="text-[#5a7a85]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#c4a91a] rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#5a7a85]">Rosie AI</h1>
              <p className="text-sm text-[#7a8a90]">Online • Ready to help</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-xs ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-[#5a7a85]' : 'bg-[#c4a91a]'}`}>
                  {msg.sender === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                </div>
                <Card className={`p-3 ${msg.sender === 'user' ? 'bg-[#5a7a85] text-white' : 'bg-white/80 text-[#5a7a85]'} border-none shadow-md`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 opacity-70`}>{msg.timestamp}</p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-[#c4a91a]/20">
        <div className="max-w-md mx-auto flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-[#c4a91a]/30"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} className="bg-[#c4a91a] hover:bg-[#c4a91a]/80 text-white">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
