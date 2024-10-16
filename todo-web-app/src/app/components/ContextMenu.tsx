import React from "react";

interface ContextMenuProps
{
    position: {x: number; y: number};
    OnDelete: () => void;
    CloseMenu: () => void;
}
export default class ContextMenu extends React.Component<ContextMenuProps>
{
    contextMenuRef: React.RefObject<HTMLDivElement>;

    constructor(props: ContextMenuProps)
    {
        super(props);
        this.contextMenuRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }

    handleClickOutside(event: MouseEvent) {
        if (this.contextMenuRef.current && !this.contextMenuRef.current.contains(event.target as Node)) {
          this.props.CloseMenu();
        }
      }

    render()
    {

        return(
            <div ref={this.contextMenuRef} style={{
                position: "absolute",
                top: this.props.position.y,
                left: this.props.position.x,
                backgroundColor: "#151515",
                border: "1px solid #ccc",
                zIndex: 1000,
                padding: '8px', 
                borderRadius: '4px', 
                minWidth: '120px',
              }}
            >
            <ul>
              <button onClick={this.props.OnDelete}>Delete</button>
            </ul>
        </div>
        );
    }
}