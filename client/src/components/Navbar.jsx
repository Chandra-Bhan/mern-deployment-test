import React, { useState } from "react";
import style from "../styles/Navbar.module.css";

function Navbar({ submitURL, hiddenTitle }) {
  const [url, setUrl] = useState("");
  return (
    <div className={style.navbar}>
      <div style={{ display: hiddenTitle ? "none" : "flex" }}>
        <input
          className={style.nav_url_input}
          type="text"
          placeholder="enter youtube url..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className={style.nav_go_btn} onClick={() => submitURL(url)}>
          Go
        </button>
      </div>
      <div style={{ display: hiddenTitle ? "block" : "none" }}>
        YouTube Transcript
      </div>
      <div>
        Try my new{" "}
        <a className={style.nav_link} href="#">
          automatic PDF summary
        </a>{" "}
        site
      </div>
    </div>
  );
}

export default Navbar;
