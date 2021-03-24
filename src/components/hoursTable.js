import React, {Component} from 'react';

import TimePicker from './timePicker';
import "./css/hoursTable.css"

class HoursTable extends Component{
    constructor(props){
        super(props);

        this.closeHoursTable = this.closeHoursTable.bind(this);
    }

    closeHoursTable(){
        this.props.closeHoursTable();
    }

    render(){
        return(
            <div className="HoursContainer">
                <div className="HoursWindowStyle">
                    <div className="CloseHoursWindowStyle" onClick={this.closeHoursTable}>
                        X
                    </div>
                    <form className="HoursForm" onSubmit={this.handleHoursSubmit}>
                            <div className="TimeRange">
                                <div className="Day">Sunday:</div>
                                <TimePicker/>
                                <div className="To">to</div>
                                <TimePicker/>
                            </div>
                            <br/>
                            

                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default HoursTable;