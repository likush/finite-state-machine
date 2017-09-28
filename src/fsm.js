class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.states = [config.initial];
        this.stateIndex = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.states[this.stateIndex]
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.states.push(state);
            this.stateIndex++
        } else {
            throw new Error('Unknown state')
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        const currentState = this.states[this.stateIndex];
        const availableTransitions = this.config.states[currentState].transitions;
        const nextState = availableTransitions[event];

        if (nextState) {
            this.states.push(nextState);
            this.stateIndex++
        } else {
            throw new Error('Transition unavailable')
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.states = [this.config.initial];
        this.stateIndex = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event) {
            const availableStates = [];
            Object.entries(this.config.states).forEach(entry => {
                const state = entry[0];
                const transitions = entry[1].transitions;
                if (transitions[event]) {
                    availableStates.push(state)
                }
            });
            return availableStates
        } else {
            return Object.keys(this.config.states)
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        const result = !!this.states[this.stateIndex - 1];
        if (result) {
            this.stateIndex--;
        }
        return result;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        const result = !!this.states[this.stateIndex + 1];
        if (result) {
            this.stateIndex++;
        }
        return result;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.states = [this.states[this.stateIndex]];
        this.stateIndex = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
