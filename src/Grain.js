import React, { Component } from 'react';

class Grain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberId: this.props.numberId,
      grainLengthInMsec: 0,
      grainPositionInPercent: 0,
      grainPositionInMsec: 0,
      grainStartPositionInPercent: 0,
      grainStartPositionInMsec: 0,
      grainEndPositionInPercent: 0,
      grainEndPositionInMsec: 0
    };
    this.handleChange.bind(this);
  }

  render() {
    return (
      <table class="table">
        <thead>
          <th>#</th>
          <th>Start pos</th>
          <th>Mid pos</th>
          <th>End pos</th>
          <th>length</th>
        </thead>
        <tbody>
          <tr>
            <td>{props.numberId}</td>
            <td>{this.state.grainStartPositionInMsec}</td>
            <td>
              <input type="number"
                id="grainPositionInMsec"
                name="grainPositionInMsec"
                value={this.state.grainPositionInMsec}
                onChange={this.handleChange.bind(this)} />
            </td>
            <td>{this.state.grainEndPositionInMsec}</td>
            <td>
              <input type="number"
                id="grainLengthInMsec"
                name="grainLengthInMsec"
                value={this.state.grainLengthInMsec}
                onChange={this.handleChange.bind(this)} />
            </td>
          </tr>
          <tr>
            <td>-</td>
            <td>{this.state.grainStartPositionInPercent}</td>
            <td>{this.state.grainPositionInPercent}</td>
            <td>{this.state.grainEndPositionInPercent}</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    );
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    if (isComputable()) {
      updateGrain();
    }
  }

  getGrainStartPositionInMs(grainPositionInMsec, grainLengthInMsec) {
    return grainPositionInMsec - grainLengthInMsec / 2;
  }

  getGrainEndPositionInMs(grainPositionInMsec, grainLengthInMsec) {
    return grainPositionInMsec + grainLengthInMsec / 2;
  }

  getPositionInPercent(sampleLength, grainPositionInMsec) {
    return grainPositionInMsec / sampleLength * 100;
  }

  getGrainStartPositionInPercent(grainPositionInMsec, grainLengthInMsec) {
    const grainStartPosition = this.getGrainStartPositionInMs(grainPositionInMsec, grainLengthInMsec);
    return this.getPositionInPercent(this.state.sampleLength, grainStartPosition);
  }

  getGrainEndPositionInPercent(grainPositionInMsec, grainLengthInMsec) {
    const grainEndPosition = this.getGrainEndPositionInMs(grainPositionInMsec, grainLengthInMsec);
    return this.getPositionInPercent(this.state.sampleLength, grainEndPosition);
  }

  isComputable() {
    const s = this.state;
    return (s.grainPositionInMsec > 0
      && s.grainLengthInMsec > 0
      && this.props.sampleLength > 0);
  }

  updateGrain() {
    this.setState({
      grainStartPositionInMsec: this.getGrainStartPositionInMs(this.state.grainPositionInMsec, this.state.grainLengthInMsec),
      grainEndPositionInMsec: this.getGrainEndPositionInMs(this.state.grainPositionInMsec, this.state.grainLengthInMsec)
    });
    this.setState({
      grainPositionInPercent: this.getPositionInPercent(this.props.sampleLength, this.state.grainPositionInMsec),
      grainStartPositionInPercent: this.getGrainStartPositionInPercent(this.state.grainPositionInMsec, this.grainLengthInMsec),
      grainEndPositionInPercent: this.getGrainEndPositionInPercent(this.state.grainPositionInMsec, this.state.grainLengthInMsec)
    });
  }
}