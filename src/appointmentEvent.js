import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  start: PropTypes.object.isRequired,
  end: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};


class AppointmentEvent extends React.PureComponent {
  render() {
    const {
      start,
      end,
      value,
    } = this.props;
    return (
      <div className="appointmentevent">
        {value}
      </div>
    );
  }
}

AppointmentEvent.propTypes = propTypes;
export default AppointmentEvent;