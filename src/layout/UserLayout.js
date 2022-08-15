import React, { Fragment, useEffect, useState } from "react";
import LogoArea from "../components/UserComponents/LogoArea";
import MainMenu from "../components/UserComponents/MainMenu";
import FooterArea from "../components/UserComponents/FooterArea";
import { ToastContainer } from "react-toastify";
import ScrollTopButton from "../components/UserComponents/ScrollTopButton";
import { useSpeechSynthesis } from "../components/AdminComponents/commons/Speech";

const UserLayout = (props) => {
  const { component: Component } = props;
  const { speak, voices, speaking } = useSpeechSynthesis();
  const [voicesChosen, setVoiceChosen] = useState();
  const langDefault = "en-US";

  useEffect(() => {
    if (voices) {
      const arrVoices = voices.filter((voice) => voice?.lang === langDefault);
      setVoiceChosen(arrVoices);
    }
  }, [voices]);

  return (
    <Fragment>
      <div className={props.parentClass}>
        <Fragment>
          <LogoArea className="white_bg" />
          <MainMenu />
        </Fragment>
        <Component
          {...props}
          speak={speak}
          voices={voicesChosen}
          speaking={speaking}
        />
        {/* <FooterArea className="primay_bg" /> */}
        <ToastContainer position="top-center" />
        <ScrollTopButton />
      </div>
    </Fragment>
  );
};
export default UserLayout;
