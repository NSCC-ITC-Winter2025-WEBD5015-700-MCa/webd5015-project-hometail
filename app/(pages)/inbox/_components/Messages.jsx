import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/utils/loader"; // Assuming you have a loader component

const Messages = ({ selectedChatId }) => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const { data: session } = useSession();

  const handleInputChange = (e) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;

    setLoadingMessages(true);

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: selectedChatId,
          content: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      setMessageContent("");
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error.message);
    } finally {
      setLoadingMessages(false);
    }
  };

  const fetchMessages = async () => {
    if (!selectedChatId) return;

    setLoading(true);
    const response = await fetch(`/api/chat/${selectedChatId}`);

    if (!response.ok) {
      setLoading(false);
      return;
    }

    const data = await response.json();

    setMessages(data.messages);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChatId]);

  return (
    <div className="w-3/4 p-5 overflow-y-auto flex flex-col gap-4 max-lg:w-full flex-grow">
      <div className="flex flex-col flex-grow gap-4 overflow-y-scroll">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader />
          </div>
        ) : messages.length === 0 ? (
          <p>No messages to show</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${
                message.senderId === session.user.id ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  message.senderId === session.user.id
                    ? "chat-bubble-success"
                    : "chat-bubble-primary"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="dark:text-white text-black input input-bordered bg-gray-300 dark:bg-[#1D232A] w-full"
          onChange={handleInputChange}
          value={messageContent}
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>
          {loadingMessages ? <Loader /> : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Messages;
