function processFixedData( total ) {
	let Pi = 0;
	let n = 1;
	let totalDataProcessed = 0;
	for ( let i = 0; i <= total; i++ ) {
		Pi = Pi + (4 / n) - (4 / (n + 2));
		n = n + 4;
		totalDataProcessed++;
	}

	return totalDataProcessed;
}

class ThreadWorker {
	constructor() {
		this._startTimer = null;
		this._timeSpentTimer = null;
		this._dataTotal = null;
		onmessage = ( event ) => this._onMessage( event.data );
	}

	_onMessage( messageObject ) {
		switch ( messageObject.type ) {
			case "start":
				this._processData( messageObject.data );
				break;
		}
	}

	_processData( total ) {
		this._startTimer = performance.now();

		this._dataTotal = processFixedData( total );

		this._timeSpentTimer = performance.now() - this._startTimer;
		this._finishProcessing();
	}

	_finishProcessing() {
		postMessage( {
			type: "end",
			data: {
				timeSpentTimer: this._timeSpentTimer,
				dataTotal: this._dataTotal
			}
		} );

		this._startTimer = null;
		this._timeSpentTimer = null;
		this._dataTotal = null;
	}
}

new ThreadWorker();