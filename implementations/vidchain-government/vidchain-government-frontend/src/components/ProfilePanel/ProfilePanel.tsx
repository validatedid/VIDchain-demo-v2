import React from 'react';
import "./ProfilePanel.css";

type Props = {
  title: string;
  data: any;
  icon: any;
  functionClickButton?: any;
};

const ProfilePanel = (props: Props) => {
  const {title, data, icon} = props;
  return (
    <div>
        <div className="panelTitle">
            {title}
        </div>
        <div className="panelBody">
            <div className="panelImageContainer">
            <img
                src={icon}
                alt=""
                role="presentation"
                className="panelImage"
            />
            </div>
            <div className="panelMainContent">
            <h3 className="panelBodyTitle">{title}</h3>
            <p className="panelBodyText">{JSON.stringify(data)}</p>
            </div>
        </div>
    </div>
  );
};

export default ProfilePanel;
