import React from "react";
import { connect } from "react-redux";
import FileNav from "./filenav";
import FileList from "./filelist";
import * as FileManagerActions from "./actions/filemanager.actions";
import ContextMenu from "./contextmenu";
import NavPath from "./navpath";
import Properties from "./properties";
class FileManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextPosition: {}
    };
    this.filemanagerRef = React.createRef();
  }

  componentDidMount() {
    this.filemanagerRef.addEventListener("contextmenu", evt => {
      evt.preventDefault();
      this.props.dispatch(FileManagerActions.toggleContext("FILEMANAGER"));
      this.setState({
        contextPosition: {
          x: evt.x,
          y: evt.y
        }
      });
    });

    this.filemanagerRef.addEventListener("click", evt => {
      evt.preventDefault();
      if (this.props.CurrentContext !== "") {
        this.props.dispatch(FileManagerActions.toggleContext(""));
      }
    });
  }

  componentWillUnmount() {
    this.filemanagerRef.removeEventListener("contextmenu", evt => {
      evt.preventDefault();
      this.props.dispatch(FileManagerActions.toggleContext("FILEMANAGER"));
      this.setState({
        contextPosition: {
          x: evt.x,
          y: evt.y
        }
      });
    });

    this.filemanagerRef.removeEventListener("click", evt => {
      evt.preventDefault();
      if (this.props.CurrentContext !== "") {
        this.props.dispatch(FileManagerActions.toggleContext(""));
      }
    });
  }

  rebuildStack = Files => {
    const { StackTrace } = this.props;
    let Stack = [Files];
    StackTrace.forEach(trace => {
      let lastItem = [...Stack].slice(-1, Stack.length);
      let item = lastItem.find(
        _item =>
          _item.id === trace.id &&
          _item.parent_folder_id === trace.parent_folder_id
      );
      if (item) {
        Stack = [...Stack, [...item.folder_files, ...item.children]];
      }
    });
    this.props.dispatch(FileManagerActions.rebuildStack(Stack));
  };

  apiCallToAddFolder = () => {
    // TODO
    // call the api to create a folder here
    // get the new files
    // this.rebuildStack(Files)
  };

  addNewFolder = () => {
    let folderName = prompt("FolderName");
    if (folderName.length === 0) {
      return;
    }
    this.apiCallToAddFolder();
  };

  onDoubleClick = item => {
    this.props.dispatch(FileManagerActions.pushToSTack(item));
  };

  onPrev = () => {
    this.props.dispatch(FileManagerActions.popFromSTack());
  };

  onClick = item => {
    this.props.dispatch(FileManagerActions.select(item));
  };

  closeProperties = () => {
    this.props.dispatch(FileManagerActions.toggleProperties({}));
  };

  render() {
    const { Info, CurrentPath, IsRoot, Stack, IsContextOpen } = this.props;
    const { contextPosition } = this.state;
    const showInfo = Object.keys(Info).length !== 0;
    return (
      <div className={"filemanager-main"}>
        <FileNav onPrev={this.onPrev} isRoot={IsRoot} />
        <NavPath currentPath={CurrentPath} />
        <div
          className={showInfo ? "files-container blur" : "files-container"}
          ref={ele => (this.filemanagerRef = ele)}
        >
          <FileList stack={Stack} />
        </div>
        {IsContextOpen && (
          <ContextMenu
            name="file manager"
            menu={[
              {
                name: "New Folder",
                onClick: this.addNewFolder
              }
            ]}
            position={contextPosition}
          />
        )}
        {showInfo && <Properties item={Info} onClose={this.closeProperties} />}
      </div>
    );
  }
}

let mapStateToProps = state => {
  let { Stack } = state.FileManagerReducer;
  const IsRoot = [...Stack].length === 1;
  const stackLen = Stack.length;
  const lastInStack = [...Stack.slice(-1, stackLen)];
  Stack = lastInStack.length > 0 ? Stack[stackLen - 1] : [];
  let { Selected } = state.FileManagerReducer;
  const selectedLen = Selected.length;
  const lastInSelected = [...Selected.slice(-1, selectedLen)];
  Selected = lastInSelected.length > 0 ? Selected[selectedLen - 1] : {};

  return {
    Stack,
    IsRoot,
    Selected,
    StackTrace: state.FileManagerReducer.StackTrace,
    Files: state.FileManagerReducer.Files,
    IsContextOpen: state.FileManagerReducer.CurrentContext === "FILEMANAGER",
    CurrentContext: state.FileManagerReducer.CurrentContext,
    CurrentPath: state.FileManagerReducer.CurrentPath,
    Info: state.FileManagerReducer.Info
  };
};
let mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileManager);
