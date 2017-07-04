(function () {
	class Thread {
		/**
		 * When the thread is created, the view is created and the worker is initialized.
		 * @param threadNumber{number}
		 * @param useWorker{boolean} - Default value is true
		 */
		constructor( threadNumber, useWorker = true ) {
			this._view = new mtJs.ThreadView( threadNumber );
			this._view.show();
			this._worker = null;
			this._currentPromiseResolve = null;

			if ( useWorker ) {
				this._worker = new Worker( `js/threadWorker.js` );
				this._worker.onmessage = ( event ) => this._onWorkerMessage( event.data );
			}

			this._startTimer = null;
			this._timeSpentTimer = null;
		}

		/**
		 * Starts the thread processing
		 * @param dataTotal
		 */
		start( dataTotal = 10000000 ) {
			return new Promise( ( resolve ) => {
				this._startTimer = performance.now();
				this._view.cleanInfo();
				this._view.updateStart( new Date() );
				resolve();
			} )
				.then( () => {
					if ( this._worker ) {
						return this._startProcessingDataUsingWorker( dataTotal );
					} else {
						return this._startProcessingData( dataTotal );
					}
				} );
		}

		/**
		 * On Message Handler for the Web Worker
		 * Checks the type of the message and acts accordingly
		 * @param data
		 * @private
		 */
		_onWorkerMessage( message ) {
			switch ( message.type ) {
				case "end":
					this._timeSpentTimer = message.data.timeSpentTimer;
					this._dataTotal = message.data.dataTotal;
					this._processingFinished();
					break;
			}
		}

		/**
		 *
		 * @param total
		 * @private
		 */
		_startProcessingDataUsingWorker( total ) {
			return new Promise( ( resolve ) => {
				this._currentPromiseResolve = resolve;
				this._worker.postMessage( { type: 'start', data: total } );
			} )
		}

		/**
		 * Executes the process data on the browser thread
		 * @param total
		 * @private
		 */
		_startProcessingData( total ) {
			return new Promise( ( resolve ) => {
				// move this execution into the queue, to avoid blocking the background thread execution
				setTimeout( () => {
					this._currentPromiseResolve = resolve;
					this._dataTotal = processFixedData( total );
					this._timeSpentTimer = performance.now() - this._startTimer;
					this._processingFinished();
				}, 1 );
			} );
		}

		/**
		 * Basically shows the values in view
		 * @private
		 */
		_processingFinished() {
			this._view.updateTimeSpent( this._timeSpentTimer );
			this._view.updateCarsTotal( this._dataTotal );

			this._currentPromiseResolve( this._dataTotal );
			this._currentPromiseResolve = null;
		}
	}

	mtJs.Thread = Thread;
})();