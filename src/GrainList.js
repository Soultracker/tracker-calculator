import React, { Component } from 'react';
import Grain from './Grain';
import { Field, Control, Label, Input, Help } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
//import { nanoid } from "nanoid";

class GrainList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sampleLength: 1000,
      grains: [],
      index: 1,
      sampleLengthInputClassName: "input"
    };
    this.addGrain.bind(this);
  }

  addGrain() {
    if (this.state.sampleLength > 0) {
      const i = this.state.index + 1;
      const grainId = "grain-" + i;
      this.setState({
        grains: [...this.state.grains,
        <Grain key={grainId}
          index={this.state.index}
          sampleLength={this.state.sampleLength} />
        ],
        index: i
      });
    } else {
      this.setState({
        sampleLengthInputClassName: "input is-danger"
      })
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      sampleLengthInputClassName: "input"
    });
  }

  render() {
    return (
      <section className="section">
        <div className="box">
          <Field>
            <Label htmlFor="sampleLength">Sample length:</Label>
            <Input
              className={this.state.sampleLengthInputClassName}
              type="number"
              id="sampleLength"
              name="sampleLength"
              value={this.state.sampleLength}
              onChange={this.handleChange.bind(this)} />
            <Help>Enter the sample length in milliseconds</Help>
          </Field>
          <Control>
            <Button onClick={this.addGrain.bind(this)} className="button is-primary" >Add Grain</Button>
          </Control>
        </div>
        <div className="section content">
          <h3>Grain List</h3>
          <table className="table  is-fullwidth">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Start pos</th>
                <th>Mid pos</th>
                <th>End pos</th>
                <th>Grain length</th>
              </tr>
            </thead>
            <tbody>
              {this.state.grains}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}


function Description() {
  return (
    <div className="section">
      <h3>What for?</h3>
      <p>
        The initial idea was to use granular playback to play a rhythmic sample and then sequence it using the position effect.
    </p>
      <p>
        In the playback screen in granular mode, it is possible to specify the length of the window, its position, shape and the direction of loop playback.
        The length of the window is given in milliseconds.
        The position is given in seconds.
</p>
      <p>
        On the other hand, in the pattern screen, the position effect is given in percent.
</p>
      <p>
        Based on the sample duration(the sample duration is visible in the one - shot playback screen), the number of beats and the number of notes in a beat, the script gives the duration of a note.This note duration can then be used to determine the length of the window.
</p>
      <p>
        The position, in the playback screen in granular mode, represents the center of the granular window.If you want to play the granular at a specific location in the sample, you need to add an offset equivalent to half the length of the window.
  </p>
      <p>
        This little script allows you to map the position of the grains to the percentage for the position effect (taking into account the offset).
</p>

    </div>

  );
}

export default GrainList;