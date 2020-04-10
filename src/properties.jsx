import React from "react";

const Properties = props => {
  const { item, onClose } = props;
  const {
    name = "",
    children = [],
    folder_files = [],
    status = 0,
    created_by = "",
    updated_by = "",
    created_at = "",
    updated_at = "",
    type = ""
  } = item;

  return (
    <div className="properties">
      <div className="properties-header">
        <div className="properties-h">{name} properties</div>
        <div className="properties-close" onClick={onClose}>
          X
        </div>
      </div>
      {Object.keys(item).length > 0 && (
        <div>
          <fieldset>
            <legend>basic</legend>
            <div className="properties-item">
              <div className="properties-name">name</div>
              <div className="properties-value">{name}</div>
            </div>
            <div className="properties-item">
              <div className="properties-name">status</div>
              <div className="properties-value">{status}</div>
            </div>
            <div className="properties-item">
              <div className="properties-name">type</div>
              <div className="properties-value">{type}</div>
            </div>
          </fieldset>
          <fieldset>
            <legend>other</legend>
            <div className="properties-item">
              <div className="properties-name">created by</div>
              <div className="properties-value">{created_by}</div>
            </div>
            <div className="properties-item">
              <div className="properties-name">updated by</div>
              <div className="properties-value">{updated_by}</div>
            </div>
            <div className="properties-item">
              <div className="properties-name">created at</div>
              <div className="properties-value">{created_at}</div>
            </div>
            <div className="properties-item">
              <div className="properties-name">updated at</div>
              <div className="properties-value">{updated_at}</div>
            </div>
          </fieldset>
          {type === "folder" && (
            <fieldset>
              <legend>volume</legend>

              <div className="properties-item">
                <div className="properties-name">files</div>
                <div className="properties-value">{folder_files.length}</div>
              </div>
              <div className="properties-item">
                <div className="properties-name">subfolders</div>
                <div className="properties-value">{children.length}</div>
              </div>
            </fieldset>
          )}
        </div>
      )}
      {Object.keys(item).length === 0 && (
        <div>Please select a file/folder to see it's properties</div>
      )}
    </div>
  );
};

export default Properties;
