"use client";
import Image from "next/image";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from "react";
import { axiosPrivate } from "@/api/apiConfig";
import { useRouter } from "next/router";

export default function Home() {
  const [isTextQuery, setIsTextQuery] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [conversations, setConversations] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [auth, setAuth] = useState(null); // Initialize as null to handle unauthenticated state
  const [newConversation, setNewConversation] = useState({});
  const [spokenTranscript, setSpokenTranscript] = useState('');

  const isMount = useRef(false);

  // Toggle between text and voice query mode
  function isPressed() {
    setIsTextQuery(!isTextQuery);
  }

  // Google authentication function
  function continueWithGoogle() {
    window.location.href = `${process.env.NEXT_PUBLIC_BASEURL}/v1/auth/google`;
  }

  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;

      axiosPrivate.get("/v1/auth")
        .then(res => {
          if (res.data.success) {
            setAuth(res.data.data);
          } else {
            setAuth(null); // Ensure auth is null if not authenticated
          }
        })
        .catch(() => setAuth(null));

      axiosPrivate.get("/conversations")
        .then(res => {
          setConversations(res.data.data);
        })
        .catch(() => setError("Failed to load conversations."));
    }
  }, []);

  const createVoiceConversation = async () => {
    if (!('webkitSpeechRecognition' in window) || !('speechSynthesis' in window)) {
      alert("Your browser does not support voice recognition or speech synthesis.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenTranscript(transcript);
      const responseText = await generateAndSaveResponse(transcript);
      speakResponse(responseText);
    };

    recognition.onerror = () => {
      alert("An error occurred during voice recognition.");
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const generateAndSaveResponse = async (transcript) => {
    try {
      const res = await axiosPrivate.post("/conversations", {
        asked_conversation_data: transcript,
      });
      const responseText = res.data.data?.response_text;
      setNewConversation(responseText);
      return responseText;
    } catch {
      setError("Failed to save conversation.");
      return "";
    }
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const createTextConversation = async () => {
    alert(`Search input: ${searchInput}`);
    // Add any further logic to handle text conversation creation
  };

  return (
    <div className="bg-gray-50 h-screen w-screen">
      <div className="md:grid grid-cols-12">
        <div className="col-span-2 relative h-screen bg-[#020617]">
          <div className="logo w-fit mx-auto mt-5">
            <Image src={"/logo.png"} width={180} height={50} priority alt="Logo" />
          </div>

          <div className="w-full md:h-[500px] overflow-y-auto">
            {conversations.length > 0 ? (
              <div>
                {conversations.map(conversation => (
                  <Link key={conversation._id} href={`?token=${conversation._id}`}>
                    <section className="border-t mt-5 cursor-pointer border-gray-700 w-11/12 mx-auto rounded-lg hover:bg-blue-gray-900 p-3 ">
                      <Typography as={"h3"} className="text-base text-purple-100">
                        {conversation.asked_conversation_data.split(" ").slice(0, 24).join(" ") + "..."}
                      </Typography>
                      <Typography as={"h5"} className="text-sm text-white">
                        {conversation.asked_conversation_data.split(" ").slice(0, 55).join(" ") + "..."}
                      </Typography>
                    </section>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center w-full mt-5 px-4 text-sm poppins-regular text-[#ebeef0]">
                {auth ? <p>No conversation found</p> : <p>No conversation yet, sign in to continue</p>}
              </div>
            )}
          </div>

          <div className="google-auth-wrapper w-fit mx-auto absolute bottom-5 left-0 right-0">
            {auth ? (
              <div className="grid gap-1 grid-cols-12">
                <div className="col-span-2 mt-1">
                  <Image src={auth.profile_img} className="rounded-full" priority width={55} height={55} alt={auth.display_name} />
                </div>
                <div className="col-span-10 text-white">
                  <h3 className="poppins-semibold poppins-regular">{auth.display_name}</h3>
                  <h3 className="text-xs poppins-regular">{auth.email}</h3>
                </div>
              </div>
            ) : (
              <Button onClick={continueWithGoogle} className="capitalize poppins-regular font-medium bg-purple-700">
                Continue with Google
              </Button>
            )}
          </div>
        </div>

        <div className="col-span-7 relative">
          <div className="conversation-container">
            <form method="post" className="absolute bottom-5 left-5 right-5">
              <div className="relative">
                <Input className="" onChange={(e) => setSearchInput(e.target.value)} name="searchInput" label="Tap button to start a conversation" variant="outlined" />
                <div className="record-or-search-action z-50 absolute top-0 right-0">
                  <IconButton id="buttonStart" className="bg-gray-300" onClick={createVoiceConversation}>
                    <FontAwesomeIcon icon={isTextQuery ? faSearch : faMicrophone} size="2x" color="blue" />
                  </IconButton>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-3 px-5 h-screen bg-[#020617]">
          <fieldset className="border-t-2 md:mt-7 border-gray-500 w-full">
            <legend className="poppins-medium px-4 text-white w-fit mx-auto mt-4">Recent Transcription</legend>
            <p className="text-white mt-5">{spokenTranscript || ' '}</p>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
