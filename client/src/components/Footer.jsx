import React from "react";
import { AiOutlineDesktop } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";
import style from "../styles/Footer.module.css";

function Footer() {
  return (
    <div className={style.footer}>
      <div>
        <AiOutlineDesktop
          className={style.ft_icon}
          fontSize={80}
          color="#0161c7"
        />
        <h1 className={style.ft_h1}>Reading is Faster</h1>
        <p className={style.ft_para}>Blah blah welcome to my video begone!</p>
      </div>
      <div>
        <MdContentCopy
          className={style.ft_icon}
          fontSize={80}
          color="#0161c7"
        />
        <h1 className={style.ft_h1}>Probably Won't Fail</h1>
        <p className={style.ft_para}>
          Featuring the latest build of an undocumented API.
        </p>
      </div>
      <div>
        <BsCheckCircle
          className={style.ft_icon}
          fontSize={80}
          color="#0161c7"
        />
        <h1 className={style.ft_h1}>Easy to Use</h1>
        <p className={style.ft_para}>
          Website definitely made with a bootstrap template.
        </p>
      </div>
    </div>
  );
}

export default Footer;
