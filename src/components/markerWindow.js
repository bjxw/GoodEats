import React, {Component} from 'react'
import "./css/markerWindow.css"

const infoWindowStyle = {
    position: 'relative',
    bottom: 190,
    left: '-40px',

    width: 220,
    height: 135,

    backgroundColor: 'white',
    boxShadow: '2px 2px 7px 1px rgba(0, 0, 0, 0.3)',

    padding: 10,
    fontSize: 14,
    
    zIndex: 199,
};

const infoWindowTail = {
    position: 'relative',

    left: '-4px',
    bottom: 25,

    width: 20,
    height: 20,

    backgroundColor: 'white',
    boxShadow: '1px 1px rgba(0, 0, 0, 0.3)',
    transform: 'rotate(45deg)',

    zIndex: 200
}

class MarkerWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            description: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.closeMarkerWindow = this.closeMarkerWindow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    markerWindowClick(e){
        e.stopPropagation();
    }    

    closeMarkerWindow(){
        this.props.closeMarkerWindow();
    }

    handleSubmit(e){
        e.preventDefault();
        var marker = {
            lat: this.props.lat,
            lng: this.props.lng,
            name: this.state.name,
            description: this.state.description,
            show: false,
            id: this.props.index
        }
        this.props.submitMarker(marker);
    }

    render(){
        return(
            <div>
                <div onClick={this.markerWindowClick}>
                    <div style={infoWindowTail}/>

                    <div style={infoWindowStyle}>
                        <div className="closeWindowStyle" onClick={this.closeMarkerWindow}>
                            X
                        </div>
                        <br/>

                        <form 
                            onSubmit={this.handleSubmit}
                            ref={(ref) => this.form = ref}
                        >
                            <label>
                                Name:
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Location Name"
                                value={this.state.name} 
                                onChange={this.handleChange}
                                autoComplete="off"
                            />

                            <label>
                                Description:
                            </label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />

                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default MarkerWindow;