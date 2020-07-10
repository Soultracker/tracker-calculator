import React, { Component } from 'react';
import Results from './Results';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loopLength: 1200,
      numberOfBeat: 4,
      notePerBeat: 4,
      isSubmitted: false,
      bpmResults: 0,
      noteDurationResults: 0,
      startPositionResults: [],
      windowStartPositionResults: [],
      windowStart:0,
      windowEnd:0,
      windowMiddle:0
    }
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const bpmRes = this.msecToBpm(this.state.loopLength, this.state.numberOfBeat);
    const noteDurationRes = this.noteDuration(this.state.loopLength, this.state.numberOfBeat, this.state.notePerBeat);
    console.log(bpmRes, noteDurationRes);
    this.setState({
      isSubmitted: true,
      bpmResults: bpmRes,
      noteDurationResults: noteDurationRes,
      startPositionResults: this.getStartPositionInPercent(this.state.numberOfBeat, this.state.notePerBeat),
      windowStartPositionResults: this.getWindowsStartPosition(this.state.numberOfBeat, this.state.notePerBeat)
    });
  }

  render() {
    return (
      <section className="section">
      <div className="container is-fluid">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="field">
            <label htmlFor="loopLength">Sample length:</label>
            <div className="control">
              <input type="number" id="loopLength" name="loopLength" value={this.state.loopLength} onChange={this.handleChange.bind(this)} />
            </div>
            <p className="help">Enter the sample length in milliseconds</p>
          </div>
          <div className="field">
            <label htmlFor="numberOfBeat">Beat in loop:</label>
            <div className="control">
              <input type="number" id="numberOfBeat" name="numberOfBeat" value={this.state.numberOfBeat} onChange={this.handleChange.bind(this)} />
            </div>
            <p className="help">Number of beat in the sample</p>
          </div>
          <div className="field">
            <label htmlFor="notePerBeat">Note per beat:</label>
            <div className="control">
              <input type="number" id="notePerBeat" name="notePerBeat" value={this.state.notePerBeat} onChange={this.handleChange.bind(this)} />
            </div>
            <p className="help">the number of note in each beat</p>
          </div>
          <div className="control">
            <button type="submit" className="button is-primary" >Calculate</button>
          </div>
        </form>
      </div>
      
      <div class="section">
        <Results bpm={this.state.bpmResults} noteDuration={this.state.noteDurationResults} startPosition={this.state.startPositionResults}
          windowStartPosition={this.state.windowStartPositionResults} />
      </div>
      </section>
    );
  }

  msecToBpm(loopLength, numberOfBeat) {
    return 60000 / loopLength * numberOfBeat;
  }

  noteDuration(loopLength, numberOfBeat, notePerBeat) {
    return loopLength / (numberOfBeat * notePerBeat);
  }

  getStartPositionInPercent(numberOfBeat, notePerBeat) {
    const a = [];
    const numberOfPosition = numberOfBeat * notePerBeat;
    const positionStep = 100 / (numberOfPosition);
    for (let index = 0; index < numberOfPosition; index++) {
      a[index] =Math.round( index * positionStep);
    }
    return a;
  }

  getWindowsStartPosition(numberOfBeat, notePerBeat) {
    const a = [];
    const numberOfPosition = numberOfBeat * notePerBeat;
    const positionStep = 100 / (numberOfPosition);
    const offset = positionStep / 2
    for (let index = 0; index < numberOfPosition; index++) {
      a[index] = Math.round(index * positionStep + offset);
    }
    return a;
  }
}

export default Form;