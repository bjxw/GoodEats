import React, {Component} from 'react';

import TimePicker from './timePicker';
import "./css/hoursTable.css"

class HoursTable extends Component{
    constructor(props){
        super(props);

        this.closeHoursTable = this.closeHoursTable.bind(this);
        this.setTime = this.setTime.bind(this);
        this.handleHoursSubmit = this.handleHoursSubmit.bind(this);

        this.state = {
            sunday: {open: "", close: ""},
            monday: {open: "", close: ""},
            tuesday: {open: "", close: ""},
            wednesday: {open: "", close: ""},
            thursday: {open: "", close: ""},
            friday: {open: "", close: ""},
            saturday: {open: "", close: ""}
        }
    }

    closeHoursTable(){
        this.props.closeHoursTable();
    }

    setTime(day, oc, hour){
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

    handleHoursSubmit(e){
        e.preventDefault();

        var hours = {};
        hours.sunday = this.state.sunday.open + " - " + this.state.sunday.close;
        hours.monday = this.state.monday.open + " - " + this.state.monday.close;
        hours.tuesday = this.state.tuesday.open + " - " + this.state.tuesday.close;
        hours.wednesday = this.state.wednesday.open + " - " + this.state.wednesday.close;
        hours.thursday = this.state.thursday.open + " - " + this.state.thursday.close;
        hours.friday = this.state.friday.open + " - " + this.state.friday.close;
        hours.saturday = this.state.saturday.open + " - " + this.state.saturday.close;

        console.log(hours);
        this.props.handleHoursTable();
        this.props.setHours(hours);
    }

    render(){
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
                                    hours={this.state.close}
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
                                    hours={this.state.open} 
                                    day={"monday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.state.close}
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
                                    hours={this.state.open} 
                                    day={"tuesday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.state.close}
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
                                    hours={this.state.open} 
                                    day={"wednesday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.state.close}
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
                                    hours={this.state.open} 
                                    day={"thursday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.state.close}
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
                                    hours={this.state.open} 
                                    day={"friday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.state.close}
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
                                    hours={this.state.open} 
                                    day={"saturday"}
                                    oc={"open"}
                                    setTime={this.setTime}
                                />
                                <div className="To">to</div>
                                <TimePicker 
                                    hours={this.state.close}
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