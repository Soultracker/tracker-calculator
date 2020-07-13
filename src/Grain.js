import React, { Component } from 'react';
import Loader from 'react-bulma-components/lib/components/loader';
import { Field, Input} from 'react-bulma-components/lib/components/form';

class Grain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      key: '',
      grainLengthInMsec: 0,
      grainPositionInPercent: 0,
      grainPositionInMsec: 0,
      grainStartPositionInPercent: 0,
      grainStartPositionInMsec: 0,
      grainEndPositionInPercent: 0,
      grainEndPositionInMsec: 0,
      debounceTimeout: 0,
      calculating: false
    };
  }

  render() {
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.index}</td>
          <td><i>msec</i></td>
          <td>{this.state.grainStartPositionInMsec}</td>
          <td>
            <Field>
              <Input
                className="input"
                type="number"
                id="grainPositionInMsec"
                name="grainPositionInMsec"
                value={this.state.grainPositionInMsec}
                onChange={this.handleChange.bind(this)}
                max={this.props.sampleLength}
              />
            </Field>
          </td>
          <td>{this.state.grainEndPositionInMsec}</td>
          <td>
            <Field>
              <Input
                className="input"
                type="number"
                id="grainLengthInMsec"
                name="grainLengthInMsec"
                value={this.state.grainLengthInMsec}
                onChange={this.handleChange.bind(this)}
                max={this.props.sampleLength > 1000 ? 1000 : this.props.sampleLength}
              />
            </Field>
          </td>
        </tr>

        <tr>
          <td>{this.state.calculating && <Loader />}</td>
          <td><i>%</i></td>
          <td>{this.state.grainStartPositionInPercent}</td>
          <td>{this.state.grainPositionInPercent}</td>
          <td>{this.state.grainEndPositionInPercent}</td>
          <td>-</td>
        </tr>
      </React.Fragment>
    );
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = this.validate(name,target.value);
    if (this.state.debounceTimeout) {
      clearTimeout(this.state.debounceTimeout);
    }
    const self = this;
    this.setState({
      [name]: value,
      calculating: true,
      debounceTimeout: setTimeout(function () {
        if (self.isComputable()) {
          self.updateGrain();
        }
      }, 500)
    });
  }

  getGrainStartPositionInMs(grainPositionInMsec, grainLengthInMsec) {
    return Number(grainPositionInMsec) - (Number(grainLengthInMsec) / 2);
  }

  getGrainEndPositionInMs(grainPositionInMsec, grainLengthInMsec) {
    return Number(grainPositionInMsec) + (Number(grainLengthInMsec) / 2);
  }

  getPositionInPercent(sampleLength, grainPositionInMsec) {
    console.log(sampleLength, grainPositionInMsec, grainPositionInMsec / sampleLength);
    return Math.round(grainPositionInMsec / sampleLength * 100);
  }

  getGrainStartPositionInPercent(grainPositionInMsec, grainLengthInMsec) {
    const grainStartPosition = this.getGrainStartPositionInMs(grainPositionInMsec, grainLengthInMsec);
    return Math.round(this.getPositionInPercent(this.props.sampleLength, grainStartPosition));
  }

  getGrainEndPositionInPercent(grainPositionInMsec, grainLengthInMsec) {
    const grainEndPosition = this.getGrainEndPositionInMs(grainPositionInMsec, grainLengthInMsec);
    return Math.round(this.getPositionInPercent(this.props.sampleLength, grainEndPosition));
  }

  isComputable() {
    const s = this.state;
    const cdt = s.grainPositionInMsec > 0
      && s.grainLengthInMsec > 0
      && this.props.sampleLength > 0
    return (cdt);
  }

  validate(name, value){
    let v = value;
    if(name === "grainLengthInMsec" && value>1000){
      v=1000;
    }
    return v;
  }

  updateGrain() {
    this.setState({
      grainStartPositionInMsec: this.getGrainStartPositionInMs(this.state.grainPositionInMsec, this.state.grainLengthInMsec),
      grainEndPositionInMsec: this.getGrainEndPositionInMs(this.state.grainPositionInMsec, this.state.grainLengthInMsec)
    });
    this.setState({
      grainPositionInPercent: this.getPositionInPercent(this.props.sampleLength, this.state.grainPositionInMsec),
      grainStartPositionInPercent: this.getGrainStartPositionInPercent(this.state.grainPositionInMsec, this.state.grainLengthInMsec),
      grainEndPositionInPercent: this.getGrainEndPositionInPercent(this.state.grainPositionInMsec, this.state.grainLengthInMsec),
      calculating: false
    });
  }
}

export default Grain;