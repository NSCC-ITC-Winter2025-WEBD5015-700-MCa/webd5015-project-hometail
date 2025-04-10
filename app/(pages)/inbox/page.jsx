"use client";

import { useEffect, useState } from "react";
import Chats from "./_components/Chats";
import Messages from "./_components/Messages";
import { Loader } from "@/utils/loader";
import { useSession } from "next-auth/react";
import Subscribe from "../subscribe/page";

const Inbox = () => {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const session = useSession();

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/chat`);

      if (!response.ok) {
        console.error("Failed to load conversations:", response.statusText);
        return;
      }

      const data = await response.json();

      setChats(data.chats);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleChatClick = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    session?.user?.isSubscribed ? (
      <>
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <Loader />
          </div>
        ) : (
          <div
            id="inbox"
            className="w-full h-full flex max-lg:flex-col border rounded-lg border-black text-black dark:text-white dark:border-white"
          >
            <Chats chats={chats} onChatClick={handleChatClick} />
            <Messages selectedChatId={selectedChatId} />
          </div>
        )}
      </>
    ) : (
      <Subscribe />
    )
  );
  
};

export default Inbox;
