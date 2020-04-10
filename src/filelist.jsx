import React from "react";
import File from "./file";
import Folder from "./folder";
import NoRecs from "./norecs";

const FileList = props => {
  return (
    <div className="files-list">
      {props.stack.length === 0 && <NoRecs />}
      {props.stack.map(item => {
        const { type, id, parent_folder_id } = item;
        return item.type === "folder" ? (
          <Folder item={item} key={`${type}-${id}-${parent_folder_id}`} />
        ) : (
          <File item={item} key={`${type}-${id}-${parent_folder_id}`} />
        );
      })}
    </div>
  );
};

export default FileList;
