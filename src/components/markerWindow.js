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
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleHoursTable = this.handleHoursTable.bind(this);
        this.closeHoursTable = this.closeHoursTable.bind(this);

        this.setHours = this.setHours.bind(this);

        this.markerWindowClick = this.markerWindowClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.place.name !== this.state.name){
            this.setState({name: nextProps.place.name});
            this.setState({addr: nextProps.place.addr});
            this.setState({hours: nextProps.place.hours});
            this.setState({phone: nextProps.place.phone});
            this.setState({website: nextProps.place.website});
            this.setState({description: nextProps.place.description});
            this.setState({isVeggie: nextProps.place.isVeggie});
        }
        
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
        //console.log("handleHoursTable() fired");
        this.setState({pickTime: !this.state.pickTime});
    }

    closeHoursTable(){
        this.setState({pickTime: false});
    }

    setHours(hours){
        //console.log("setHours() fired");
        //console.log(hours);
        this.setState({hours: hours});
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
            name: this.state.name,
            addr: this.state.addr,
            hours: this.state.hours,
            phone: this.state.phone,
            website: this.state.website,
            isVeggie: this.state.isVeggie,
            description: this.state.description,
            show: false,
            id: this.props.place.id
        }
        console.log(marker);
        this.props.submitMarker(marker);
    }

    render(){
        console.log(this.props.place);
        console.log(this.state.name);
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
                        autoComplete="off"
                    >
                        <div className="InputBox">
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
                            <br/>
                        </div>
                        

                        <div className="InputBox">
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
                            <br/>
                        </div>
                       

                        <div className="InputBox">
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
                        </div>
                        
                        <div className="InputBox">
                            <label>
                                Phone:
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={this.state.phone}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <br/>
                        </div>
                      
                        <div className="InputBox">
                            <label>
                                Website:
                            </label>
                            <input
                                type="text"
                                name="website"
                                placeholder="Website"
                                value={this.state.website}
                                onChange={this.handleChange}
                                autoComplete="off"
                            />
                            <br/>
                        </div>
                       
                        <div className="InputBox">
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
                        </div>
                        
                        <div className="InputBox">
                            <input
                                type="checkbox"
                                name="isVeggie"
                                checked={this.state.isVeggie}
                                onChange={this.handleChange}
                            />
                            <label>
                                Vegetarian Dishes
                            </label>
                            <br/>
                        </div>
                       
                        
                        <input type="submit" value="Submit"/>
                    </form>
                </div>
                {
                    this.state.pickTime && 
                    <HoursTable
                        handleHoursTable = {this.handleHoursTable}
                        closeHoursTable = {this.closeHoursTable}
                        hours = {this.state.hours}
                        setHours = {this.setHours}
                    />
                }
            </div>
        );
    }
}

export default MarkerWindow;