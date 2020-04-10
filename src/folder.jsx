import React from "react";
import Image from "./image";
import { connect } from "react-redux";
import * as FileManagerActions from "./actions/filemanager.actions";
import ContextMenu from "./contextmenu";

const FOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgNDQ0NCAgICAgIDQ0ICAgHCA8ICQcNFREiFhURExMYHCggGB0lGxUTITEnJSkrMy4uFx8zODMsNygtLisBCgoKDQ0NFg8PFTcfFh03LC0rNy83Ky0rLystLSstNy0rLS0tLSstLysrKy0tKysrKy0rKy0rKysrLSsrKysrK//AABEIAOEA4QMBEQACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEFBAMH/8QANBABAQABAQMJBwQCAwEAAAAAAAECAwQxcREhMlFSkrGywQUSE0FTgpEiM3KBYaFCYqIj/8QAGgEBAQADAQEAAAAAAAAAAAAAAAECAwQFBv/EACwRAQABAgMHBAIDAQEAAAAAAAABAjEDMvAEERITQVGRBSFSgTNxobHRImH/2gAMAwEAAhEDEQA/AP3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZbrwqVWlYu4G06Gp0tLU1OvLT9+/6fO1RXemqXdEx1h4/i6n1NTv1o5lfyls4Y7NmrqfUz79OZX8pOGOypq6n1M+/TmV/KThjs34mp9TPv1eZX8pOGOypqanbz79OZX8pOGOzZqZ9vPvU5lfylOGOyviZ9vPvU5lfyk4Y7Nmpn28+9TmV/KTdHZXxM+3l3qvMr+Upujs338+3l3qcyv5ScMdlTPPt5d6nMr+Rujs2Z5drLvVeZX3OGOzZnl2su9V46u6bo7Oh7P1MrjZleX3bOS3e9fYMSqqiYqnfucuNTETEw9bvaQAAAAAAAAAAAGZbrwrGq0rF3Kx9b5Xgxrw7JfHadlxz58f06nX8suLGvDir9sqatzn5Y5Y3kylmU+VcsxMTultj3sQGwFQGwFQRUBSjYCoqNgKio9/s3dnxj1vTctX05se8Pa9NzgAAAAAAAAAAAMy3XhWNVpWLuVPW+V4MdNdHZOvLWQjW0sM5yZTn+WU34saqYqjdKxMxZztbRzwvJlzy9HKbsnLXRNN22mqJTGCtiioDYCoIpRUBsEbFFRR0PZm7PjHrem5avpy7ReHtem5wAAAAAAAAAAAGZbrwrGq0rF3KnrfK8GOmujtnXlrJADKSzkykyxu+U/8AJsPBtGzXDnw5ctP/AHhxc2JhbveLNlNW+74RqZqgKgNgioCooqCNiioDoezN2fGPX9Ny1fTl2i8Pa9NzgAAAAAAAAAAAMy3XhWNWWVi7lY+t8rwY6a6OydeWsgAQOU3jn7VhMc77s5JlJlJPk5sWIir2baZ3w+UamSooqAqCKgNiioqNgOj7M3Z8Y9f03LX9OXaLw9r03OAAAAAAAAAAAAzLdeFY1ZZWLuVj8uN8rwY6a6OydeWsgAQYivDt3Tn8J41oxs0fr/Wyiz4xpZKgNiioIqAqKjYCoo6Hszdnxj1/TMtf05dovD3PTc4AAAAAAAAAAADMt14VjVllYu5WPrfK8GOmujtnXlrJBARWUHg27pz+M8a58bNH6/1sos+MamSoCgVFGwRcUbAVFR0PZm7PjHr+mZa/py7ReHuem5wAAAAAAAAAAAGZbrwrGrLKxdysflxvleDHTXR2Try1QBiKIPBt3T+2eNaMXNH6/wBbKLPhGpkqAqAqKKEVAVFRsB0fZe7PjHr+mZa/py7ReHueo5wAAAAAAAAAAAGZbrwrGrLKxdyp63yvBjpro7Z15aqCKwGIrwbd0/tnjWjFzQzos+LUybAXAVAVFGxUVAVBHR9l7s+Mev6Zlr+nLtF4e56jnAAAAAAAAAAAAZluvCsassrF3Kx9b5XgRrw7Z15bWSMRRBiK5+3dP7Z41oxc0M6LPjGtkoFQFQFRRUEVAVFR0fZe7PjHr+mZa/py7ReHueo5wAAAAAAAAAAAGZbrwrGrLKxdyp8uN8rwI6a6O3X8tUZQYxVgPBt3T+2eNaMXMzps+Ea2axFQFQFRRsEXAVFR0fZe7PjHr+mZa/pzbReHueo5gAAAAAAAAAAAGZbrwrGrLKxdyZ63yvAjXh26/lqjEBFYg5+3dP7Z41pxLw2U2fGNbJUEUCoCoCoqKgKio6Xsvdnxj1/TMtf05tovD3PUcwAAAAAAAAAAADMt14VjVllYu5M9b5Xz8a8O2deW1RiKwBFc7bv3J/GeNacS8M6bPi1slQFiKgKgKiioIqKPXsOvMLZlzY58nP2a7th2iMKqYqtLRjYc1Rvjo6r3XGAAAAAAAAAAAAzLdeFY1ZZWLuTPW+V8/GvDt1/LVGIrEGVFc/bv3PtnjWrEuzps+Ma2SoC4IqAqAqKNgi4ooR7dg18pZhefG9H/AKvT2DaKoqjCm3Rz41EbuJ0XsOUAAAAAAAAAABmW68KxqyysXciet8r5+NeHdr+WgxAFZUHO27p/bPGtOJdnTZ8YwZLgKgioC4Coo0RcUbBHo2P9zH+/B1bH+elrxckuu+hcIAAAAAAAAAADM914VjVllYu5GPrfK+ejXh3Try1RiDKisRXP27p/bPGtWJdlS+MYMlAuCKgKgKiihFRRUEejYv3Mf7dWx/npa8XJLrvoXCAAAAAAAAAAAzPdeFY1ZZWLuPPW+V89GvDunXloMFZUCornbbf/AKb92OMv+K1V3ZU2fKMGShFQVYioCoooRUUVBHo2L9zH+/B1bH+elrxckuu+hcIAAAAAAAAAADM914VjVllYu48+XG+V87GvDvlqoyorEVOWXJLezLl+Ig5HLbbbeW5c9vXWlsVEFwFQFiKgKiihFYqKgj0bF+5j/fg6tj/PS14uSXXfQuEAAAAAAAAAABme68KxqyysXceet8r52NeHfr+SgyoFFfPW6Gf8MvBBycWhsXAXAVAWIqAqKKgiooqCPvsl5NTH+3VsX56WvFyS60zj6Fwt5YDQAAAAAAAAAZnuvCsassrF3Gny42/+XzsdNdHe0GIrEEa3Qz/hl4IrkY2dc/LTvhm+ks65+U3wKlnXPyb4FSzrn5N8C+Wdc/JvgVLOufld8IuWdc/JvgbLOuLvgXLOuG+EVLOs3wProcvvT3ZbZ1c7t2GJnHpmOjTje1Eujp6epd/6eO977iffHDk/yCgAAAAAAAAAAeHadks/VpTlnzw+c4PL2jY5j/rDt2/x04eLv9qnjec3grEG6XTx5eeXKSy88vOzwvyU/uEqyy63wdL6Wn3I+g5dHZwcU92/B0vp6fchy6OxxT3Pg6X09PuQ5dHY4p7nwtP6eHchy6OxxT3Phaf08O7Dl0djinufC0/p4d2HLo+JxT3PhafYw7sOXR8TinufD0+xh3Ycuj4nFPdvw8Oxh3YcujscU9z4eHYx7sOXR8Tinu2Y4zdJOE5GUUxFoJmZaqAAAAAAAAAAAAAPNtOyzLnw5Jn1fLJxbRskYn/VPtU3YeLw+02c7LGy8mUss3yvIqpmmd0xul1RMT7wysGTdHp4fyx8WeF+Sn9x/bGvLLtPpHngAAAAAAAAAAAAAAAAAAAAAAAAPlr6GOc5+bKbspvjRj7PTix73Z0Yk0uXraWeF5Mpws3ZPExcGvCq3VQ7aK4qjfCdO/qx/wAZS/7Y4P5aP3H9leWXVx1o+keeuakBYAAAAAAAAAAAAAAAAAAAAAAAAJ1MMcpyZTllYV4dNdPDVHstNU0zvhztTY9THKe5Pfxt5r2eLyp2OvDxqZp96d8OrnRVRO+71aezX/lly8HsOR98cMZugKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z";

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextPosition: {}
    };
    this.folderRef = React.createRef();
  }

  componentDidMount() {
    const { id, parent_folder_id } = this.props.item;
    this.folderRef.addEventListener("contextmenu", evt => {
      evt.preventDefault();
      evt.stopPropagation();
      this.props.dispatch(
        FileManagerActions.toggleContext(`FOLDER${id}${parent_folder_id}`)
      );
      this.setState({
        contextPosition: {
          x: evt.x,
          y: evt.y
        }
      });
    });

    this.folderRef.addEventListener("click", evt => {
      evt.preventDefault();
      if (this.props.IsContextOpen) {
        this.props.dispatch(FileManagerActions.toggleContext(""));
      }
    });
  }

  componentWillUnmount() {
    const { id, parent_folder_id } = this.props.item;
    this.folderRef.removeEventListener("contextmenu", evt => {
      evt.preventDefault();
      evt.stopPropagation();
      this.props.dispatch(
        FileManagerActions.toggleContext(`FOLDER${id}${parent_folder_id}`)
      );
      this.setState({
        contextPosition: {
          x: evt.x,
          y: evt.y
        }
      });
    });

    this.folderRef.removeEventListener("click", evt => {
      evt.preventDefault();
      if (this.props.IsContextOpen) {
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
    this.props.dispatch(FileManagerActions.pushToSTack(item));
  };

  rename = () => {
    alert("Youv've clicked rename");
  };

  delete = () => {
    alert("you've clicked delete");
  };

  openFolder = () => {
    const { item } = this.props;
    this.props.dispatch(FileManagerActions.pushToSTack(item));
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
    const isContextOpen = `FOLDER${id}${parent_folder_id}` === CurrentContext;
    return (
      <div
        className={isSelected ? "folder selected" : "folder"}
        onDoubleClick={evt => {
          evt.preventDefault();
          this.onDoubleClick(item);
        }}
        onClick={evt => {
          evt.preventDefault();
          this.onClick(item);
        }}
        ref={ele => (this.folderRef = ele)}
      >
        <Image url={FOLDER} />
        <div className="name">{item.name}</div>
        {isContextOpen && (
          <ContextMenu
            name={name}
            menu={[
              {
                name: "Open",
                onClick: this.openFolder
              },
              {
                name: "Rename",
                onClick: this.rename
              },
              {
                name: "Delete",
                onClick: this.delete
              },
              {
                name: "Properties",
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
  Selected: state.FileManagerReducer.Selected.map(item => ({
    id: item.id,
    parent_folder_id: item.parent_folder_id
  })),
  CurrentContext: state.FileManagerReducer.CurrentContext
});
let mapDispatchToProps = dispatch => ({
  dispatch: dispatch
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Folder);
