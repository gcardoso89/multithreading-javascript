(function() {
	class Thread {
		/**
		 * When the thread is created, the view is created and the worker is initialized.
		 * @param threadNumber{number}
		 * @param useWorker{boolean} - Default value is true
		 */
		constructor( threadNumber, useWorker = true ) {
			this._view = new mtJs.ThreadView( threadNumber );

			this._startTimer = null;
			this._timeSpentTimer = null;
		}

		/**
		 * Starts the thread processing
		 * @param dataTotal
		 */
		start( dataTotal = 10000000 ){
			this._startTimer = performance.now();
			this._view.updateStart( new Date( this._startTimer ) );

			this._processData( dataTotal );
		}

		/**
		 * Just a dummy method to simulate data being processed
		 * @param total
		 * @private
		 */
		_processData( total ){
			let totalDataProcessed = 0;
			let random;

			for ( let i = 0; i < total; i++ ) {
				random = Math.random() * 1000000;
				random = Math.random() * 1000000;
				random = Math.random() * 1000000;
				random = Math.random() * 1000000;
				totalDataProcessed++;
			}

			this._timeSpentTimer = performance.now();
			this._view.updateTimeSpent( this._timeSpentTimer - this._startTimer );
			this._view.updateCarsTotal( totalDataProcessed );
		}
	}

	mtJs.Thread = Thread;
})();