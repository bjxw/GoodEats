import React, {Component} from 'react';

// See https://fontawesome.com/how-to-use/on-the-web/using-with/react for icon usage
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';

import './css/help.css'


class Help extends Component{
    constructor(props){
        super(props);

        this.closeHelp = this.closeHelp.bind(this);
        this.helpClick = this.helpClick.bind(this);

        this.state = {
            showHelp: false
        }
    }

    closeHelp(){
        this.setState({showHelp: false});
    }

    helpClick(){
        this.setState({showHelp: true});
    }

    render(){
        var helpPage = <div className="HelpContainer">
            <div className="HelpWindow">
                <div className="CloseHelpWindow" onClick={this.closeHelp}> 
                    X
                </div>
                <div className="QuickStartTitle">
                    Quickstart Guide
                    <hr className="QuickStartBreak"/>
                </div>
                <div className="QuickStartContent">
                    <dl className="QuickStartTips">
                        Welcome to GoodEats! To get started, you can perform the following actions below:
                        <dt>
                            - Drag the map to explore existing markers 
                        </dt>
                        <dt>
                            - Click on a on the map or a place in the list on the right to see more information about a restaurant
                        </dt>
                        <dd>
                            - Clicking "edit" in the information window will allow you to update that current place's information
                        </dd>
                        <dt>
                            - "Find A Place" in the top right search bar to fetch business information 
                        </dt>
                        <dt>
                            - Delete a place permanently by clicking the trash icon to the right in the list
                        </dt>
                        <dt>
                            - Clicking "Add Marker" will set the application to an editor mode. This editor mode is indicated by the map turning grayscale.
                        </dt>
                        <dd>
                            - Clicking on the map will add a new marker at the selected location and bring up a window to add basic information.
                        </dd>
                        <dd>
                            - "Find A Place" has been modified to "Add A Place" that will automatically fill in a location's information and place its respective marker on the map
                        </dd>
                    </dl>
                   
                    <br/>
                   

                </div>
            </div>
        </div>
        return(
            <div>
                <div className="HelpBox" onClick={this.helpClick}>
                    <div className="HelpIcon">
                        <FontAwesomeIcon icon={faQuestion} size="lg" color="dimgray"/>
                    </div>
                </div>

                {this.state.showHelp && helpPage}
            </div>
        )
    }
}

export default Help;