import React, {Component} from 'react'

import "./css/markerWindow.css";

class MarkerWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.name || "",
            description: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
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
            </div>
        );
    }
}

export default MarkerWindow;