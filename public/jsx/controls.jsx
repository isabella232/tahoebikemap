const React = require('react');
const _ = require('underscore');
const classNames = require('classnames');

const config = require('../../frontendconfig.json');

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startAddress: '',
      endAddress: '',
      scenario: '1',
      errorFields: [],
    };

    this.processForm = (event) => {
      event.preventDefault();

      const errorFields = this.validateForm();

      if (errorFields.length) {
        this.setState({ errorFields });
        return false;
      }

      return this.props.updateRoute(this.state.startAddress, this.state.endAddress, this.state.scenario);
    };

    this.handleStartAddressChange = (event) => {
      this.setState({ startAddress: event.target.value });
    };

    this.handleEndAddressChange = (event) => {
      this.setState({ endAddress: event.target.value });
    };

    this.handleScenarioChange = (event) => {
      this.setState({ scenario: event.target.value });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startAddress !== this.state.startAddress) {
      this.setState({
        startAddress: nextProps.startAddress,
      });
    }

    if (nextProps.endAddress !== this.state.endAddress) {
      this.setState({
        endAddress: nextProps.endAddress,
      });
    }

    if (nextProps.scenario !== this.state.scenario) {
      this.setState({
        scenario: nextProps.scenario,
      });
    }
  }

  validateForm() {
    const errorFields = [];
    if (!this.state.startAddress) {
      errorFields.push('startAddress');
    }

    if (!this.state.endAddress) {
      errorFields.push('endAddress');
    }

    return errorFields;
  }

  render() {
    return (
      <div className={classNames('controls', { hide: this.props.mobileView !== 'controls' && this.props.isMobile })}>
        <form onSubmit={this.processForm}>
          <div className={classNames('form-group', 'form-inline', 'start-address', { 'has-error': _.contains(this.state.errorFields, 'startAddress') })}>
            <label className="control-label">Start Location</label>
            <img
              src="img/start_marker.png"
              srcSet="img/start_marker@2x.png 2x"
              className="control-icon"
              alt="Start Marker"
            />
            <input
              type="text"
              value={this.state.startAddress}
              onChange={this.handleStartAddressChange}
              className="form-control"
              placeholder={config.startAddressPlaceholder}
            />
          </div>
          <div
            className={classNames(
              'form-group',
              'form-inline',
              'end-address',
              { 'has-error': _.contains(this.state.errorFields, 'endAddress') }
            )}
          >
            <label className="control-label">End Location</label>
            <img
              src="img/end_marker.png"
              srcSet="img/end_marker@2x.png 2x"
              className="control-icon"
              alt="End Marker"
            />
            <input
              type="text"
              value={this.state.endAddress}
              onChange={this.handleEndAddressChange}
              className="form-control"
              placeholder={config.endAddressPlaceholder}
            />
          </div>
          <div className="form-group form-inline route-type">
            <label className="control-label">Route Type</label>
            <select
              className="form-control"
              onChange={this.handleScenarioChange}
              value={this.state.scenario}
            >
              <option value="1">Prefer bike paths & lanes</option>
              <option value="2">The most direct route</option>
            </select>
          </div>
          <a href="#" className="clear-link" onClick={this.props.clearRoute}>Clear</a>
          <button
            type="submit"
            className="btn btn-success btn-update-route"
          >
            <i
              className={classNames(
                'fa',
                'fa-circle-o-notch',
                'fa-spin',
                { hidden: !this.props.loading }
              )}
              aria-hidden="true"
            ></i> Get Directions
          </button>
        </form>
        <div className={classNames('disclaimer', { hide: !this.props.showDisclaimer })}>
          This website should be used for reference purposes only.  LTBC does not guarantee the accuracy, or reliability of the information. This site and all materials contained on it are distributed without any warranties of any kind. By using this website, the user expressly agrees that use of the information contained on this website is at the user's sole risk.
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  updateRoute: React.PropTypes.func.isRequired,
  clearRoute: React.PropTypes.func.isRequired,
  startAddress: React.PropTypes.string,
  endAddress: React.PropTypes.string,
  loading: React.PropTypes.bool,
  isMobile: React.PropTypes.bool.isRequired,
  mobileView: React.PropTypes.string.isRequired,
  showDisclaimer: React.PropTypes.bool.isRequired,
};

module.exports = Controls;
