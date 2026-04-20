import React, { useState } from "react";

const UserDetails = ({ user, isOpen, handleClick }) => {
  return (
    <div
      className={`border border-gray-200 rounded p-4 mb-4  ${
        isOpen ? "bg-white" : "bg-white"
      }`}
    >
      <div
        className="cursor-pointer font-semibold text-black"
        onClick={handleClick}
      >
        {user.name}
      </div>
      {isOpen && (
        <div className="mt-4 max-w-screen-sm overflow-x-auto">
          <div>
            {user.tweets.map((tweet) => (
              <div
                key={tweet.id}
                className={`mb-4 p-4 rounded-lg shadow-md ${
                  tweet.isDrugAddicted ? "bg-red-100" : "bg-green-100"
                }`}
              >
                <p className="text-black">{tweet.content}</p>
                <div className="p-2 rounded-md">
                  <span
                    className={
                      tweet.isDrugAddicted ? "text-red-700" : "text-green-700"
                    }
                  >
                    {tweet.isDrugAddicted ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-black">
              Final report - {user.finalReport}
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {user.tweets
                .filter((tweet) => tweet.isDrugAddicted)
                .map((tweet) => (
                  <p
                    key={tweet.id}
                    className="bg-red-100 p-2 rounded-md text-red-700"
                  >
                    {tweet.content}
                  </p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserCard = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  const users = [
    {
      name: "Person 1",
      tweets: [
        {
          id: 1,
          content:
            "Decluttered my closet – goodbye to clothes that no longer spark joy",
          isDrugAddicted: false,
        },
        { id: 2, content: "Just post photo", isDrugAddicted: false },
        {
          id: 3,
          content: "Lavender tea comfy tea cyprus",
          isDrugAddicted: false,
        },
        {
          id: 4,
          content:
            "Have just watch YouTube Excellent speech Thanks for the Government House book tip",
          isDrugAddicted: false,
        },
        {
          id: 5,
          content:
            "Vladimir Putin Has Plan for Destroying the Westand Looks Lot Like Donald Trump",
          isDrugAddicted: false,
        },
      ],
      finalReport: "Normal",
    },
    {
      name: "Person 2",
      tweets: [
        {
          id: 6,
          content:
            "Alphabet announce their Deep Mind subsidiary have teach computers win big step forward",
          isDrugAddicted: false,
        },
        {
          id: 7,
          content:
            "You need consistent test one test doesnt much unless target",
          isDrugAddicted: false,
        },
        {
          id: 8,
          content: "STARBUCKS GET OUT NORTH END",
          isDrugAddicted: false,
        },
        {
          id: 9,
          content:
            "how do the last graphic make sense with freeze rain but with rain Sunday night",
          isDrugAddicted: false,
        },
        {
          id: 10,
          content:
            "true first rounder steep price pay for potential one year rental",
          isDrugAddicted: false,
        },
      ],
      finalReport: "Normal",
    },
    {
      name: "Person 3",
      tweets: [
        {
          id: 11,
          content: "Workout done, feeling accomplished.",
          isDrugAddicted: false,
        },
        {
          id: 12,
          content:
            "A joint a day keeps the worries at bay. It's the secret to a chill life",
          isDrugAddicted: true,
        },
        {
          id: 13,
          content:
            "Caught up with an old friend today – nostalgia and laughter galore",
          isDrugAddicted: false,
        },
        {
          id: 14,
          content: "Weekend road trip plan underway. Exploring nearby gems.",
          isDrugAddicted: false,
        },
        { id: 15, content: "Virtual game night.", isDrugAddicted: false },
      ],
      finalReport: "Drug Addicted",
    },
  ];

  return (
    <div className=" p-6 flex flex-col items-center justify-center max-h-full overflow-auto ">
      <div>
        <h2 className="font-bold text-4xl mb-4 text-white ">Tweet Classification</h2>
      </div>
      <div className="flex flex-col items-center justify-center p-3">
        {users.map((user, index) => (
          <UserDetails
            key={index}
            user={user}
            isOpen={index === openIndex}
            handleClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="mt-4">
        <a
          href="https://jfsqz8ngjex2lcpfmpbjce.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default UserCard;