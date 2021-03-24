import React, {Component} from 'react';

import HoursTable from './hoursTable';

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

            pickTime: false,

            open_hours:[
                "",  "",  "",  "",  "",  "", "12:00 AM"
            ],
                
                
            close_hours:{
                0: "", 1: "", 2: "", 3: "", 4: "", 5: "", 6: ""
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleHoursTable = this.handleHoursTable.bind(this);
        this.closeHoursTable = this.closeHoursTable.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleHoursSubmit = this.handleHoursSubmit.bind(this);

        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    // This method updates the state of the form
    handleChange(e){
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        console.log(name);
        console.log(value);
        this.setState({
            [name]: value
        });
        e.stopPropagation();
    }

    handleHoursTable(){
        console.log("handleHoursTable() fired");
        this.setState({pickTime: !this.state.pickTime});
    }

    closeHoursTable(){
        this.setState({pickTime: false});
    }

    handleHoursChange(e){
        console.log("handleHoursChange() fired");
        //console.log(e.target);
        //console.log(e.target.name);
        //console.log(e.target.value);
        var args = e.target.name.split(" ");
        var open_hours = this.state.open_hours;
        console.log(args[1]);
        console.log(open_hours.keys.length);
        for(var i = 0; i < this.state.open_hours.length; i++){
            console.log(open_hours[i]);
            if(Number(args[1]) === i){
                console.log("index match");
                open_hours[i] = e.target.value;
            }
        }
        this.setState({open_hours: open_hours}, console.log(this.state.open_hours));
    }

    handleHoursSubmit(e){
        e.preventDefault();
        console.log(this.state);
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
                {
                    this.state.pickTime && 
                    <HoursTable
                        pickTime = {this.state.pickTime}
                        closeHoursTable = {this.closeHoursTable}
                    />
                }
            </div>
        );
    }
}

export default MarkerWindow;