// imported components
import React, {Component} from 'react';

// imported stylesheets
import "./css/timePicker.css";

// This component is a single box that allows a user to set a 12 hour time
class TimePicker extends Component{
    constructor(props){
        super(props);

        this.pickHour = this.pickHour.bind(this);
        this.pickMinute = this.pickMinute.bind(this);
        this.pickAMPM = this.pickAMPM.bind(this);

        this.setHour = this.setHour.bind(this);
        this.setMinute = this.setMinute.bind(this);
        this.setAMPM = this.setAMPM.bind(this);

        this.state = {
            pickHour: false,
            pickMinute: false,
            pickAMPM: false,

            // hour, minutes, and AM/PM are pre-set if hours are passed in from hoursTable.js
            hour: this.props.hours.substr(0, this.props.hours.indexOf(':')) || "--",
            minute: this.props.hours.substr(this.props.hours.indexOf(':') + 1, this.props.hours.indexOf(':') + 1) || "--",
            AMPM: this.props.hours.substr(this.props.hours.indexOf(':') + 4) || "--"
        }
    }

    // This method opens the hour UI
    pickHour(){
        this.setState({pickHour: !this.state.pickHour});
        this.setState({pickMinute: false});
        this.setState({pickAMPM: false});
    }

    // This method opens the minute UI
    pickMinute(){
        this.setState({pickMinute: !this.state.pickMinute});
        this.setState({pickHour: false});
        this.setState({pickAMPM: false});
    }

    // This method opens the AMPM UI
    pickAMPM(){
        this.setState({pickAMPM: !this.state.pickAMPM});
        this.setState({pickHour: false});
        this.setState({pickMinute: false});
    }

    // This method sets the hour and passes a string to hoursTable.js if all fields are filled
    setHour(h){
        this.setState({hour: h});
        this.setState({pickHour: false}, () => {
            if(this.state.minute !== "--" && this.state.AMPM !== "--"){
                var time = this.state.hour + ":" + this.state.minute + " " + this.state.AMPM;
                this.props.setTime(this.props.day, this.props.oc, time);
            }
        });
    }

    // This method sets the minute and passes a string to hoursTable.js if all fields are filled
    setMinute(m){
        this.setState({minute: m});
        this.setState({pickMinute: false}, () => {
            if(this.state.hour !== "--" && this.state.AMPM !== "--"){
                var time = this.state.hour + ":" + this.state.minute + " " + this.state.AMPM;
                this.props.setTime(this.props.day, this.props.oc, time);
            }
        });
    }

    // This method sets the AMPM and passes a string to hoursTable.js if all fields are filled
    setAMPM(a){
        this.setState({AMPM: a});
        this.setState({pickAMPM: false}, () => {
            if(this.state.hour !== "--" && this.state.minute !== "--"){
                var time = this.state.hour + ":" + this.state.minute + " " + this.state.AMPM;
                this.props.setTime(this.props.day, this.props.oc, time);
            }
        });
    }

    render(){
        var hour = this.state.hour;
        var minute = this.state.minute;
        var AMPM = this.state.AMPM;
        // console.log(minute);
        // console.log(AMPM);
        return(
            <div className="TimePickerContainer">
                <div className="TimeContainer">
                    <div className="TimeBox" onClick={this.pickHour}>{hour}</div>
                    <div className="Colon">:</div>
                    <div className="TimeBox" onClick={this.pickMinute}>{minute}</div>
                    
                    <div className="TimeBox" onClick={this.pickAMPM}>{AMPM}</div>
                </div>
            

                 <div className={`HourPickerWindow ${this.state.pickHour ? "": "Hide"}`}>
                    <div className="Time" onClick={()=>this.setHour(12)}>
                        12
                    </div>
                    <div className="Time" onClick={()=>this.setHour(1)}>
                        1
                    </div>
                    <div className="Time" onClick={()=>this.setHour(2)}>
                        2
                    </div>
                    <div className="Time" onClick={()=>this.setHour(3)}>
                        3
                    </div>
                    <div className="Time" onClick={()=>this.setHour(4)}>
                        4
                    </div>
                    <div className="Time" onClick={()=>this.setHour(5)}>
                        5
                    </div>
                    <div className="Time" onClick={()=>this.setHour(6)}>
                        6
                    </div>
                    <div className="Time" onClick={()=>this.setHour(7)}>
                        7
                    </div>
                    <div className="Time" onClick={()=>this.setHour(8)}>
                        8
                    </div>
                    <div className="Time" onClick={()=>this.setHour(9)}>
                        9
                    </div>
                    <div className="Time" onClick={()=>this.setHour(10)}>
                        10
                    </div>
                    <div className="Time" onClick={()=>this.setHour(11)}>
                        11
                    </div>
                </div>

                <div className={`MinutePickerWindow ${this.state.pickMinute ? "": "Hide"}`}>
                    <div className="Time" onClick={()=>this.setMinute("00")}>
                        00
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("05")}>
                        05
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("10")}>
                        10
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("15")}>
                        15
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("20")}>
                        20
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("25")}>
                        25
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("30")}>
                        30
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("35")}>
                        35
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("40")}>
                        40
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("45")}>
                        45
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("50")}>
                        50
                    </div>
                    <div className="Time" onClick={()=>this.setMinute("55")}>
                        55
                    </div>
                </div>

                <div className={`AMPMPickerWindow ${this.state.pickAMPM ? "": "Hide"}`}>
                    <div className="Time" onClick={()=>this.setAMPM("AM")}>
                        AM
                    </div>
                    <div className="Time" onClick={()=>this.setAMPM("PM")}>
                        PM
                    </div>
                </div>
            </div>
            
        )
    }
}

export default TimePicker;