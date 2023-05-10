import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export const NeedHelp = () => {
  return (
    <div className="needHelp">
      Tap icon, and let's chat on Facebook....
      <Link>
        <i className="facebook messenger huge icon "></i>
      </Link>
    </div>
  );
};
