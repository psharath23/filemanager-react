import React from "react";
import * as FileManagerActions from "./actions/filemanager.actions";
import { connect } from "react-redux";

const ContextMenu = props => {
  const { name = "options", menu } = props;

  const onClick = (evt, item) => {
    evt.preventDefault();
    item.onClick();
    props.dispatch(FileManagerActions.toggleContext(""));
  };
  return (
    <div
      className="custom-context-menu"
      style={{
        position: "absolute",
        top: props.position.y,
        left: props.position.x
      }}
    >
      <div className="context-heading">{name}</div>
      {menu.map((item, index) => {
        return (
          <div
            key={`menu-${item.name}-${index}`}
            className="context-item"
            onClick={evt => onClick(evt, item)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

let mapStateToProps = state => ({});
let mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContextMenu);
