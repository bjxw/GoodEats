import React, {Component} from 'react'

const infoWindowStyle = {
    position: 'relative',
    bottom: 170,
    left: '-40px',

    width: 220,
    height: 105,

    backgroundColor: 'white',
    boxShadow: '2px 2px 7px 1px rgba(0, 0, 0, 0.3)',

    padding: 10,
    fontSize: 14,
    
    zIndex: 199,
};

const infoWindowTail = {
    position: 'relative',

    left: '-4px',
    bottom: 35,

    width: 20,
    height: 20,

    backgroundColor: 'white',
    boxShadow: '1px 1px rgba(0, 0, 0, 0.3)',
    transform: 'rotate(45deg)',

    zIndex: 200
}

class MarkerWindow extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.markerWindowClick = this.markerWindowClick.bind(this);
    }
    

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    markerWindowClick(e){
        e.stopPropagation();
    }    

    render(){
        const markerWindow =  
        <div onClick={this.markerWindowClick}>
            <div style={infoWindowTail}/>
            <div style={infoWindowStyle}>
                <form>
                    <label>
                        Name:
                    </label>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Location Name"
                        value={this.state.name} 
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        </div>
        return(
            <div>
                {markerWindow}
            </div>
        );
    }
}

export default MarkerWindow;