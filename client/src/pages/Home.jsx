import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import style from "../styles/Home.module.css";
import Youtube from "react-youtube";
import Footer from "../components/Footer";

function Home() {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=83-oicTOL70");
  const [transcript, setTranscript] = useState([]);
  const [hiddenTitle, setHiddentitle] = useState(true);
  const transcriptDivRef = useRef();
  const [isTranscriptCopied, setIsTranscriptCopied] = useState(false);
  const [videoID, setVideoID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isChecked = useRef();

  const handleCopyTranscript = () => {
    const textArea = document.createElement("textarea");

    textArea.value = transcriptDivRef.current.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      setIsTranscriptCopied(true);
      console.log("Text copied successfully!");
    } catch (err) {
      setIsTranscriptCopied(false);
      console.error("Failed to copy text: ", err);
    }
  };

  const submitURL = async (url) => {
    try {
      const videoIdvar = url.match(/v=([^&]+)/)[1];
      setVideoID(videoIdvar);
      if (url) {
        setIsLoading(true);
        setHiddentitle(false);
        const response = await axios.post("http://localhost:5000/transcript", {
          url,
        });
        const url_data = url;
        setUrl(url_data);
        setTranscript(response.data.transcript);
        setIsLoading(false);
      } else {
        alert("Fill the url !!!!");
      }
    } catch (err) {
      alert("Provided Url is not a youtube url!");
    }
  };

  const scrollTopFunc = () => {
    if (isChecked.current.checked) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  //!updated and fixed the inputbox issue
  // useEffect(() => {
  //   const videoIdvar = url.match(/v=([^&]+)/)[1];
  //   setVideoID(videoIdvar);
  // }, [url]);
  return (
    <div>
      <Navbar submitURL={submitURL} hiddenTitle={hiddenTitle} />
      <div
        className={style.video_info}
        style={{ display: hiddenTitle ? "none" : "flex" }}
      >
        <div
          style={{ display: hiddenTitle ? "none" : "flex" }}
          className={style.video_copybtn_div}
        >
          <div className={style.video_div}>
            <Youtube videoId={videoID} key={videoID}></Youtube>
          </div>
          <div className={style.copybtn_div}>
            <button
              onClick={handleCopyTranscript}
              className={style.copy_trans_btn}
            >
              {isTranscriptCopied
                ? "Copied entire transcript"
                : "Copy entire transcript"}
            </button>
            <a className={style.jump_to_video_link} href="#">
              Jump to video position in transcript
            </a>
            <div>
              <input type="checkbox" ref={isChecked} onChange={scrollTopFunc} />
              <label>Autoscroll</label>
            </div>
          </div>
        </div>
        <div ref={transcriptDivRef} style={{ width: "40rem" }}>
          {transcript.map((line, index) => (
            <div key={index}>
              <p>
                <a href="#" className={style.transcript_line}>
                  "{line}"
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className={style.url_div}>
        <h1 className={style.body_head}>
          {isLoading ? "Loading..." : "Get a Transcript:"}
        </h1>
        <div className={style.url_form}>
          <input
            className={style.url_input}
            type="text"
            value={url}
            placeholder="enter youtube url..."
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className={style.go_btn} onClick={() => submitURL(url)}>
            Go
          </button>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
