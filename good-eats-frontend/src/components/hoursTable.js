// Imported components
import React, {Component} from 'react';

// Created components
import TimePicker from './timePicker';

// Imported stylesheets
import "./css/hoursTable.css"

// This class is a component that displays the weekly operating hours for a place and passes the information to its Marker
class HoursTable extends Component{
    constructor(props){
        super(props);

        this.closeHoursTable = this.closeHoursTable.bind(this);
        this.setTime = this.setTime.bind(this);
        this.handleHoursSubmit = this.handleHoursSubmit.bind(this);

        // state is initialized to the known operating hours if applicable
        this.state = {
            sunday: {open: this.props.hours.sunday ? this.props.hours.sunday.substr(0, this.props.hours.sunday.indexOf('–') - 1) : "",  close: this.props.hours.sunday ? this.props.hours.sunday.substr(this.props.hours.sunday.indexOf('–') + 2) : ""},
            monday: {open: this.props.hours.monday ? this.props.hours.monday.substr(0, this.props.hours.monday.indexOf('–') - 1) : "", close: this.props.hours.monday ? this.props.hours.monday.substr(this.props.hours.monday.indexOf('–') + 2) : ""},
            tuesday: {open: this.props.hours.tuesday ? this.props.hours.tuesday.substr(0, this.props.hours.tuesday.indexOf('–') - 1) : "", close: this.props.hours.tuesday ? this.props.hours.tuesday.substr(this.props.hours.tuesday.indexOf('–') + 2) : ""},
            wednesday: {open: this.props.hours.wednesday ? this.props.hours.wednesday.substr(0, this.props.hours.wednesday.indexOf('–') - 1) : "", close: this.props.hours.wednesday ? this.props.hours.wednesday.substr(this.props.hours.wednesday.indexOf('–') + 2) : ""},
            thursday: {open: this.props.hours.thursday ? this.props.hours.thursday.substr(0, this.props.hours.thursday.indexOf('–') - 1) : "", close: this.props.hours.thursday ? this.props.hours.thursday.substr(this.props.hours.thursday.indexOf('–') + 2) : ""},
            friday: {open: this.props.hours.friday ? this.props.hours.friday.substr(0, this.props.hours.friday.indexOf('–') - 1) : "", close: this.props.hours.friday ? this.props.hours.friday.substr(this.props.hours.friday.indexOf('–') + 2) : ""},
            saturday: {open: this.props.hours.saturday ? this.props.hours.saturday.substr(0, this.props.hours.saturday.indexOf('–') - 1) : "", close: this.props.hours.saturday ? this.props.hours.saturday.substr(this.props.hours.saturday.indexOf('–') + 2) : ""}
        }
    }

    // This method closes the entire hoursTable component. See markerWindow.js for integration
    closeHoursTable(){
        console.log("closeHourstable() fired");
        this.props.closeHoursTable();
    }

    // This method sets the hours for the opening or closing time for a day of the week
    setTime(day, oc, hour){ // day = day of the week, oc = opening or closing, hour = time to set
        console.log("setTime() fired");
        //console.log(hour);
        var hours = {open: "", close: ""};
        switch(day){
            case "sunday":
                hours = this.state.sunday
                break;
            case "monday":
                hours = this.state.monday
                break;
            case "tuesday":
                hours = this.state.tuesday
                break;
            case "wednesday":
                hours = this.state.wednesday
                break;
            case "thursday":
                hours = this.state.thursday
                break;
            case "friday":
                hours = this.state.friday
                break;
            case "saturday":
                hours = this.state.saturday
                break;
            default:
                hours = "--";
        }

        if(oc === "open"){
            hours.open = hour;
        } else {
            hours.close = hour;
        }
        this.setState({day: hours});
    }

    // This method consolidates the input hours into a single string for a Marker's operating hours
    handleHoursSubmit(e){
        console.log("handleHoursSubmit() fired");
        e.preventDefault();

        var hours = {};
        if(this.state.sunday.open && this.state.sunday.close){
            hours.sunday = this.state.sunday.open + " – " + this.state.sunday.close;
        }

        if(this.state.monday.open && this.state.monday.close){
            hours.monday = this.state.monday.open + " – " + this.state.monday.close;
        }

        if(this.state.tuesday.open && this.state.tuesday.close){
            hours.tuesday = this.state.tuesday.open + " – " + this.state.tuesday.close;
        }

        if(this.state.wednesday.open && this.state.wednesday.close){
            hours.wednesday = this.state.wednesday.open + " – " + this.state.wednesday.close;
        }

        if(this.state.thursday.open && this.state.thursday.close){
            hours.thursday = this.state.thursday.open + " – " + this.state.thursday.close;
        }

        if(this.state.friday.open && this.state.friday.close){
            hours.friday = this.state.friday.open + " – " + this.state.friday.close;
        }

        if(this.state.saturday.open && this.state.saturday.close){
            hours.saturday = this.state.saturday.open + " – " + this.state.saturday.close;
        }

        //console.log(hours);
        // see markerWindow.js for prop methods
        this.props.handleHoursTable();
        this.props.setHours(hours);
    }

    render(){
        // console.log(this.props.hours);
        // console.log(this.state);
        return(
            <div className="HoursContainer">
                <div className="HoursWindowStyle">
                    <div className="CloseHoursWindowStyle" onClick={this.closeHoursTable}>
                        X
                    </div>
                    <form onSubmit={this.handleHoursSubmit}>

                        <div className="DayContainer">
                            <div className="Day">Sunday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.sunday ? this.props.hours.sunday.substr(0, this.props.hours.sunday.indexOf('–')) : ""}
                                    day={"sunday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.sunday ? this.props.hours.sunday.substr(this.props.hours.sunday.indexOf('–') + 2) : ""}
                                    day={"sunday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>

                        <div className="DayContainer">
                            <div className="Day">Monday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.monday ? this.props.hours.monday.substr(0, this.props.hours.monday.indexOf('–')) : ""}
                                    day={"monday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.monday ? this.props.hours.monday.substr(this.props.hours.monday.indexOf('–') + 2) : ""}
                                    day={"monday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>
                       
                        <div className="DayContainer">
                            <div className="Day">Tuesday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.tuesday ? this.props.hours.tuesday.substr(0, this.props.hours.tuesday.indexOf('–')) : ""}
                                    day={"tuesday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.tuesday ? this.props.hours.tuesday.substr(this.props.hours.tuesday.indexOf('–') + 2) : ""}
                                    day={"tuesday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>

                        <div className="DayContainer">
                            <div className="Day">Wednesday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.wednesday ? this.props.hours.wednesday.substr(0, this.props.hours.wednesday.indexOf('–')) : ""}
                                    day={"wednesday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.wednesday ? this.props.hours.wednesday.substr(this.props.hours.wednesday.indexOf('–') + 2) : ""}
                                    day={"wednesday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>

                        <div className="DayContainer">
                            <div className="Day">Thursday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.thursday ? this.props.hours.thursday.substr(0, this.props.hours.thursday.indexOf('–')) : ""}
                                    day={"thursday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.thursday ? this.props.hours.thursday.substr(this.props.hours.thursday.indexOf('–') + 2) : ""}
                                    day={"thursday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>

                        <div className="DayContainer">
                            <div className="Day">Friday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.friday ? this.props.hours.friday.substr(0, this.props.hours.friday.indexOf('–')) : ""}
                                    day={"friday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.friday ? this.props.hours.friday.substr(this.props.hours.friday.indexOf('–') + 2) : ""}
                                    day={"friday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>

                        <div className="DayContainer">
                            <div className="Day">Saturday:</div>
                            <div className="HourRange">
                                <TimePicker 
                                    hours={this.props.hours.saturday ? this.props.hours.saturday.substr(0, this.props.hours.saturday.indexOf('–')) : ""}
                                    day={"saturday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.props.hours.saturday ? this.props.hours.saturday.substr(this.props.hours.saturday.indexOf('–') + 2) : ""}
                                    day={"saturday"}
                                    oc={"close"}
                                    setTime={this.setTime}
                                />
                            </div>
                        </div>
                        
                        <input className="HoursSubmit" type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default HoursTable;