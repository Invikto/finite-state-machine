class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (config) {
      this.state = config.initial;
      this.config = config;
      this.prevStates = [];
      this.nextStates = [];
    } else {
      throw new Error();
    }
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.state;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (this.config.states[state]) {
      this.prevStates.push(this.state);
      this.nextStates = [];
      this.state = state;
    } else {
      throw new Error();
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    const newState = this.config.states[this.state].transitions[event];
    if (newState) {
      this.prevStates.push(this.state);
      this.nextStates = [];
      this.state = newState;
    } else {
      throw new Error();
    }
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.prevStates.push(this.state);
    this.state = this.config.initial;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    const result = [];

    if (!event) {
      for (const key in this.config.states) {
        result.push(key);
      }

      return result;
    }

    for (const key in this.config.states) {
      if (this.config.states[key].transitions.hasOwnProperty(event)) {
        result.push(key);
      }
    }

    return result;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (!this.prevStates.length) {
      return false;
    }
    this.nextStates.push(this.state);
    this.state = this.prevStates.pop();
    return true;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (!this.nextStates.length) {
      return false;
    }
    this.prevStates.push(this.state);
    this.state = this.nextStates.pop();
    return true;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.prevStates = [];
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
