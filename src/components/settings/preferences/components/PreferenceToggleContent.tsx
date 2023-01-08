import React, { useEffect, useState } from "react";
import Svg from "../../../common/Svg";
import SwitchComponent from "./SwitchComponent";

interface Props {
  preferenceType: string;
  title: string;
  description: string;
  isToggled: boolean;
  changePreference: any;
}

const PreferenceToggleContent: React.FC<Props> = ({
  preferenceType,
  title,
  description,
  isToggled,
  changePreference
}) => {
  const [isToggle, setIsToggle] = useState(false);

  const changeToggle = (status: boolean) => {
    setIsToggle(status);
    changePreference(preferenceType, status, title, description);
  };

  useEffect(() => {
    if (isToggled) {
      setIsToggle(isToggled);
    }
  }, []);

  return (
    <div className="glasshover h-full p-3">
      <div className="flex justify-between">
        <div>
          <Svg type={preferenceType} />
          <h1 className="font-bold mt-1 text-white text-lg">{title}</h1>
          <p className="font-medium text-white text-sm">{description}</p>
        </div>
        <div>
          <SwitchComponent enabled={isToggle} setEnabled={changeToggle} />
        </div>
      </div>
    </div>
  );
};

export default PreferenceToggleContent;
