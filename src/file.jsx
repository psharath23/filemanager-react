import React from "react";
import Image from "./image";
import { connect } from "react-redux";
import * as FileManagerActions from "./actions/filemanager.actions";
import ContextMenu from "./contextmenu";
const FILE = "https://img.icons8.com/cotton/2x/file.png";

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextPosition: {},
      showProperties: false
    };
    this.fileRef = React.createRef();
  }

  componentDidMount() {
    const { id, parent_folder_id } = this.props.item;
    this.fileRef.addEventListener("contextmenu", evt => {
      evt.preventDefault();
      evt.stopPropagation();
      this.props.dispatch(
        FileManagerActions.toggleContext(`FILE${id}${parent_folder_id}`)
      );
      this.setState({
        contextPosition: {
          x: evt.x,
          y: evt.y
        }
      });
    });

    this.fileRef.addEventListener("click", evt => {
      evt.preventDefault();
      if (this.props.CurrentContext !== "") {
        this.props.dispatch(FileManagerActions.toggleContext(""));
      }
    });
  }

  componentWillUnmount() {
    const { id, parent_folder_id } = this.props.item;
    this.fileRef.removeEventListener("contextmenu", evt => {
      evt.preventDefault();
      evt.stopPropagation();
      this.props.dispatch(
        FileManagerActions.toggleContext(`FILE${id}${parent_folder_id}`)
      );
      this.setState({
        contextPosition: {
          x: evt.x,
          y: evt.y
        }
      });
    });

    this.fileRef.removeEventListener("click", evt => {
      evt.preventDefault();
      if (this.props.CurrentContext !== "") {
        this.props.dispatch(FileManagerActions.toggleContext(""));
      }
    });
  }

  onClick = selectedItem => {
    const { id, parent_folder_id } = selectedItem;
    const ids = this.props.Selected.map(f => ({
      id: f.id,
      parent_folder_id: f.parent_folder_id
    }));
    let { Selected } = this.props;
    let found = ids.find(
      itm => itm.id === id && itm.parent_folder_id === parent_folder_id
    );
    if (found) {
      Selected = Selected.filter(
        _item => _item.id !== id && _item.parent_folder_id !== parent_folder_id
      );
    } else {
      Selected = [...Selected, selectedItem];
    }
    this.props.dispatch(FileManagerActions.select(Selected));
  };

  onDoubleClick = item => {
    return;
    // props.dispatch(FileManagerActions.pushToSTack(item));
  };

  rename = () => {
    const { item } = this.props;
    const name = prompt("Name", item.name);
    alert(`Renamed to ${name}`);
  };

  delete = () => {
    alert("you've clicked delete");
  };

  showProperties = () => {
    const { item } = this.props;
    this.props.dispatch(FileManagerActions.toggleProperties(item));
  };

  render() {
    const { item, CurrentContext } = this.props;
    const { id, parent_folder_id, name } = item;
    const isSelected = this.props.Selected.find(
      _item =>
        _item.id === item.id && _item.parent_folder_id === item.parent_folder_id
    );
    const isContextOpen = `FILE${id}${parent_folder_id}` === CurrentContext;
    return (
      <div
        className={isSelected ? "file selected" : "file"}
        onDoubleClick={evt => {
          evt.preventDefault();
          this.onDoubleClick(item);
        }}
        onClick={evt => {
          evt.preventDefault();
          this.onClick(item);
        }}
        ref={ele => (this.fileRef = ele)}
      >
        <Image url={FILE} />
        <div className="name">{this.props.item.name}</div>
        {isContextOpen && (
          <ContextMenu
            name={name}
            menu={[
              {
                name: "Rename",
                onClick: this.rename
              },
              {
                name: "Delete",
                onClick: this.delete
              },
              {
                name: "properties",
                onClick: this.showProperties
              }
            ]}
            position={this.state.contextPosition}
          />
        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({
  Selected: state.FileManagerReducer.Selected,
  CurrentContext: state.FileManagerReducer.CurrentContext
});
let mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(File);
