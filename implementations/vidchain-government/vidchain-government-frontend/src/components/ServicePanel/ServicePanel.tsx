import React from 'react';
import "./ServicePanel.css";

type Props = {
  title: string;
  description: string;
  requirements: string;
  credentialName: string;
  icon: any;
  functionClickButton: any;
};

const ServicePanel = (props: Props) => {
  const {title, description, requirements, credentialName, icon} = props;
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
                <h3 className="panelBodyTitle">Description:</h3>
                <p className="panelBodyText">{description}</p>
                <h3 className="panelBodyTitle">Requirements:</h3>
                <p className="panelBodyText">{requirements}</p>
                <p className="panelBodyText">{credentialName} issued by Government of Freedonia</p>
            </div>
        </div>
    </div>
  );
};

export default ServicePanel;
