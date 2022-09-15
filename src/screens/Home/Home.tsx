import React, { useEffect, useState } from "react";
import axios from "axios";
import SvgButton from "../../components/button/SvgButton";
import {
  getLiveDetails,
  getUserDetailsService
} from "../../firebase/functions/UserDetailsActions";
import { homedir } from "os";
import LinksDropdown from "../../components/links/LinksDropdown";
import { getUserLinksService } from "../../firebase/functions/LinksActions";
import {
  getLinksList,
  getSettingsList,
  getTodoList
} from "../../Redux/Actions/User.actions";
import { useDispatch, useSelector } from "react-redux";
import TodoDropdown from "../../components/todo/TodoDropdown";
import SettingsDropdown from "../../components/settings/SettingsDropdown";
import { RootStore } from "../../Redux/Store";
import Svg from "../../components/common/Svg";
import { startTime } from "./home.utils";
import { getUserActiveData } from "../../firebase/functions/UsersActiveData";

const Home = () => {
  const [clockTimer, setClockTimer] = useState("");
  const [date, setDate] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [preference, setPreference] = useState([]);
  const [liveData, setLiveData] = useState<any>([]);
  const [activeUserData, setActiveUserData] = useState<any>([]);

  const dispatch = useDispatch();

  const SettingsDataRedux: any = useSelector(
    (state: RootStore) => state.userSettingsData
  );
  // console.log(
  //   SettingsDataRedux?.data?.settings &&
  //     JSON.parse(SettingsDataRedux?.data?.settings)
  // );

  const userData = async () => {
    const res: any = dispatch(getSettingsList());
  };

  const getUserLinks = async () => {
    const res: any = dispatch(getLinksList());
  };

  const getUserTodo = async () => {
    const res: any = dispatch(getTodoList());
  };

  const getLiveData = async () => {
    const liveData: any = await getLiveDetails();
    setLiveData(liveData);
  };

  const getActiveData = async () => {
    const activeData: any = await getUserActiveData();
    console.log(activeData);
    setActiveUserData(activeData?.data);
  };

  const getPreferenceValue = (preferenceType: string) => {
    let truth;
    if (SettingsDataRedux.data) {
      const settingsData = JSON.parse(SettingsDataRedux.data.settings);
      truth = settingsData.find(
        (x: any) => x.type === preferenceType
      ).isToggled;
      return truth;
    } else return true;
  };

  function toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  useEffect(() => {
    startTime(setClockTimer, setDate);
    userData();
    getActiveData();
    getUserLinks();
    getUserTodo();
    getLiveData();
  }, []);

  const get_live_picture = getPreferenceValue("picture-source-settings");
  const file_url: string = get_live_picture
    ? liveData?.data?.background_url
    : activeUserData?.background_url;

  const get_live_quote = getPreferenceValue("quotes-source-settings");
  const quote = get_live_quote ? liveData?.data?.quote : activeUserData?.quote;
  const author_name = get_live_quote
    ? liveData?.data?.author_name
    : activeUserData?.author_name;
  // useEffect(() => {
  //   try {
  //     axios
  //       .get(
  //         `https://api.unsplash.com/photos/random?query=mountains&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_SECRET_ID}`
  //       )
  //       .then(response => {
  //         if (response.data.links) {
  //           console.log(response.data.links);
  //           console.log(response.data.links.download);
  //           console.log(response.data.links.html);
  //         }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${file_url})`,
          backgroundSize: "cover"
        }}
        className="w-full h-screen">
        {/* div that renders the clock, date and the time */}
        <div className="clockdate-wrapper">
          {getPreferenceValue("clock-settings") === true && (
            <div id="clock">{clockTimer}</div>
          )}
          {getPreferenceValue("date-settings") === true && (
            <div id="date">{date}</div>
          )}
        </div>
        {/* rendering the qoutes at the bottom of the screen */}
        {getPreferenceValue("quotes-settings") === true && (
          <div>
            <div className="qoutes-wrapper qoutes">
              <p>"{quote}"</p>
              <p className="text-sm"> - {author_name}</p>
            </div>
          </div>
        )}
        {getPreferenceValue("links-settings") === true && <LinksDropdown />}
        {getPreferenceValue("todo-settings") === true && <TodoDropdown />}
        {getPreferenceValue("weather-settings") === true && (
          <SvgButton type="weather" position="top-0 right-0" />
        )}
        <SettingsDropdown />

        {/* <SvgButton type="todo" position="bottom-0 right-0" /> */}
      </div>
    </div>
  );
};

export default Home;
