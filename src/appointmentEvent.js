import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

class AppointmentEvent extends React.PureComponent {
	
	constructor(props) {
    super(props)
    this.state = { hover: false }
  }
	handleMouseIn() {
	  this.setState({ hover: true })
	}

	handleMouseOut() {
	  this.setState({ hover: false })
	}
	render() {
		const {
		  start,
		  end,
		  value,
		  comment
		} = this.props;
		
		const tooltipStyle = {
		  display: this.state.hover ? 'block' : 'none',
		  color: 'blue'
		}
		return (
		  <div>
			<div onMouseOver={this.handleMouseIn.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>{value}</div>
			<div>
			  <div style={tooltipStyle}>{comment}</div>
			</div>
		  </div>
		);
	}
}

AppointmentEvent.propTypes = propTypes;
export default AppointmentEvent;