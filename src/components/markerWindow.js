import React, {Component} from 'react'

import "./css/markerWindow.css";

class MarkerWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.place.name || "",
            addr: this.props.place.addr || "",
            description: this.props.place.description || ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        e.stopPropagation();
    }

    markerWindowClick(e){
        e.stopPropagation();
    }  

    handleSubmit(e){
        e.preventDefault();
        var marker = {
            lat: this.props.lat,
            lng: this.props.lng,
            name: this.state.name,
            addr: this.state.addr,
            description: this.state.description,
            show: false,
            id: this.props.id
        }
        this.props.submitMarker(marker);
    }

    render(){
        return(
            <div onClick={this.markerWindowClick}>
                <div className="MarkerWindowTail"/>

                <div className="MarkerWindowStyle">
                    <div className="closeWindowStyle" onClick={this.props.closeMarkerWindow}>
                        X
                    </div>

                    <form 
                        onSubmit={this.handleSubmit}
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
                            Address:
                        </label>
                        <input
                            type="text"
                            name="addr"
                            placeholder="Street, City, State ZIP"
                            value={this.state.addr}
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

                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default MarkerWindow;