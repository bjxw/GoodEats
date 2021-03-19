import React, {Component} from 'react'

import "./css/markerWindow.css";

/*
    This class defines the MarkerWindow component that comes attached to the NewMarker component.
    The MarkerWindow is a form that allows users to submit the Marker it is attached to for Map expansion.
*/
class MarkerWindow extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: this.props.place.name,
            addr: this.props.place.addr,
            hours: this.props.place.hours,
            phone: this.props.place.phone,
            website: this.props.place.website,
            description: this.props.place.description,
            isVeggie: this.props.place.isVeggie,

            editHours: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleHoursTable = this.handleHoursTable.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // This method updates the state of the form
    handleChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        e.stopPropagation();
    }

    handleHoursTable(){
        console.log("handleHoursTable() fired");
        this.setState({editHours: true});
    }

    // This method prevents clicks in the Window from propagating to the parent Map and causing unintended events
    markerWindowClick(e){
        e.stopPropagation();
    }  

    // This method submits the inputted information for a new Marker
    handleSubmit(e){
        e.preventDefault();
        var marker = {
            lat: this.props.place.lat,
            lng: this.props.place.lng,
            name: this.state.name || this.props.place.name,
            addr: this.state.addr || this.props.place.name,
            hours: this.state.hours || this.props.place.hours,
            phone: this.state.phone || this.props.place.phone,
            website: this.state.website || this.props.place.website,
            isVeggie: this.state.isVeggie || this.props.place.isVeggie,
            description: this.state.description || this.props.place.description,
            show: false,
            id: this.props.id
        }
        console.log(marker);
        this.props.submitMarker(marker);
    }

    render(){
        var hoursTable = 
        <div className={`HoursContainer ${this.state.editHours ? "": "Hide"}`}>
            Test
        </div>

        return(
            <div onClick={this.markerWindowClick}>
                <div className="MarkerWindowTail"/>

                <div className="MarkerWindowStyle">
                    <div className="closeWindowStyle" onClick={this.props.closeMarkerWindow}>
                        X
                    </div>

                    <div className="MarkerWindowTitle">
                        Add A New Marker
                    </div>

                    <form 
                        onSubmit={this.handleSubmit}
                        className="MarkerWindowForm"
                    >
                        <label>
                            Name:
                        </label>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Location Name"
                            value={this.state.name || this.props.place.name} 
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <br/>

                        <label>
                            Address:
                        </label>
                        <input
                            type="text"
                            name="addr"
                            placeholder="Street, City, State ZIP"
                            value={this.state.addr || this.props.place.addr}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <br/>

                        <label>
                            Hours:
                        </label>
                        <input
                            type="text"
                            name="hours"
                            placeholder="Hours"
                            onClick={this.handleHoursTable}
                        />
                        <br/>

                        <label>
                            Phone:
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={this.state.phone || this.props.place.phone}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <br/>

                        <label>
                            Website:
                        </label>
                        <input
                            type="text"
                            name="website"
                            placeholder="Website"
                            value={this.state.website || this.props.place.website}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <br/>

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

                        <input
                            type="checkbox"
                            name="isVeggie"
                            checked={this.state.isVeggie}
                            onChange={this.handleChange}
                        />
                        <label className="VeggieLabel">
                            Vegetarian Dishes
                        </label>
                        <br/>
                        

                        <br/>
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default MarkerWindow;