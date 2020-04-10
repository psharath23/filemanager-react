import React from "react";
import Image from "./image";
const FileNav = props => {
  return (
    <div className="filemanager-nav">
      <div className="back-nav">
        {!props.isRoot && (
          <Image
            onClick={evt => {
              evt.preventDefault();
              props.onPrev();
            }}
            url={`https://cdn3.iconfinder.com/data/icons/mobile-friendly-ui/100/back_arrow-512.png`}
          />
        )}
      </div>
      <div className="heading">Files</div>
    </div>
  );
};
export default FileNav;
