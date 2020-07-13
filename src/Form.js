import React, { Component } from 'react';
import Results from './Results';
import Image from 'react-bulma-components/lib/components/image';

import img1 from '../assets/Snapshot_001.jpg';
import img2 from '../assets/Snapshot_002.jpg';
import img3 from '../assets/Snapshot_003.jpg';
import img5 from '../assets/Snapshot_005.jpg';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loopLength: 1416,
      numberOfBeat: 4,
      notePerBeat: 2,
      isSubmitted: false,
      bpmResults: 0,
      noteDurationResults: 0,
      startPositionResults: [],
      windowStartPositionResults: [],
      windowStart: 0,
      windowEnd: 0,
      windowMiddle: 0,
      results:false
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
      results:true,
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
        <div className="box">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="field">
              <label htmlFor="loopLength">Sample length:</label>
              <div className="control">
                <input className="input" type="number" id="loopLength" name="loopLength" value={this.state.loopLength} onChange={this.handleChange.bind(this)} />
              </div>
              <p className="help">Enter the sample length in milliseconds</p>
            </div>
            <div className="field">
              <label htmlFor="numberOfBeat">Beat in loop:</label>
              <div className="control">
                <input className="input" type="number" id="numberOfBeat" name="numberOfBeat" value={this.state.numberOfBeat} onChange={this.handleChange.bind(this)} />
              </div>
              <p className="help">Number of beat in the sample</p>
            </div>
            <div className="field">
              <label htmlFor="notePerBeat">Note per beat:</label>
              <div className="control">
                <input className="input" type="number" id="notePerBeat" name="notePerBeat" value={this.state.notePerBeat} onChange={this.handleChange.bind(this)} />
              </div>
              <p className="help">the number of note in each beat</p>
            </div>
            <div className="control">
              <button type="submit" className="button is-primary" >Calculate</button>
            </div>
          </form>
        </div>

        
          {this.state.results &&
          <Results bpm={this.state.bpmResults} noteDuration={this.state.noteDurationResults} startPosition={this.state.startPositionResults}
          windowStartPosition={this.state.windowStartPositionResults} />
          }
       
        <Description />
      </section>
    );
  }

  msecToBpm(loopLength, numberOfBeat) {
    return Math.round(60000 / loopLength * numberOfBeat);
  }

  noteDuration(loopLength, numberOfBeat, notePerBeat) {
    return loopLength / (numberOfBeat * notePerBeat);
  }

  getStartPositionInPercent(numberOfBeat, notePerBeat) {
    const a = [];
    const numberOfPosition = numberOfBeat * notePerBeat;
    const positionStep = 100 / (numberOfPosition);
    for (let index = 0; index < numberOfPosition; index++) {
      a[index] = Math.round(index * positionStep);
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

function Description() {
  return (
    <div className="section content">
      <h3>What for?</h3>
      <p>The initial idea was to use granular playback to play a rhythmic sample and then sequence it using the position effect.</p>
      <Image src={img5} size="16by9"/>
      <p>In the playback screen in granular mode, it is possible to specify the length of the window, its position, shape and the direction of loop playback.
        The length of the window is given in milliseconds.
        The position is given in seconds.</p>
      <p>On the other hand, in the pattern screen, the position effect is given in percent.</p>
      <Image src={img1} size="16by9"/>  
      <p>Based on the sample duration(the sample duration is visible in the one - shot playback screen), the number of beats and the number of notes in a beat, the script gives the duration of a note.This note duration can then be used to determine the length of the window.</p>
      <Image src={img2} size="16by9"/>
      <p>The position, in the playback screen in granular mode, represents the center of the granular window.If you want to play the granular at a specific location in the sample, you need to add an offset equivalent to half the length of the window.</p>
      <p>This little script allows you to map the position of the grains to the position in percentage to be given as a parameter of the position effect taking into account the offset.</p>
      <Image src={img3} size="16by9"/>
    </div>
  );
}
export default Form;