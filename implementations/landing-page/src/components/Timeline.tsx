import React from "react";
import './Timeline.css';

const Timeline = ({
    
  }) => (
    <div>
        <div className="bar"></div>
        <div className="timeline">
            <div className="entry">
                <h1>1990</h1>
                <h2>Entry Title</h2>
                <img src="http://dummyimage.com/300x200/000/fff" /> Here's the info about this date
            </div>
            <div className="entry">
                <h1>1995</h1>
                Here's the info about this date
            </div>
            <div className="entry">
                <h1>2000</h1>
                Here's the info about this date
            </div>
            <div className="entry">
                <h1>2005</h1>
                Here's the info about this date
            </div>
            <div className="entry">
                <h1>2010</h1>
                Here's the info about this date
            </div>
        </div>
    </div>
  );

export default Timeline;