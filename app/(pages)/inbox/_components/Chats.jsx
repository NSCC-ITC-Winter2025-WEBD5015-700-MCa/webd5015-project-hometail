const Chats = ({ chats, onChatClick }) => {
  return (
    <div className="text-black dark:text-white overflow-y-auto w-1/4 max-lg:w-full border-r border-black dark:border-white">
      {chats &&
        chats.map((chat) => (
          <div
            key={chat.id}
            className="w-full border-b px-5 py-10 text-lg font-semibold cursor-pointer text-center hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => onChatClick(chat.id)}
          >
            {chat.participants?.[0]?.email || chat.id}
          </div>
        ))}
    </div>
  );
};

export default Chats;
