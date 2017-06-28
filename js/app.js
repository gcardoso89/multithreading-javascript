let mtJs = {};

(function () {
	const formNumberOfCarsIpt = 'ipt-carstotal';
	const formStartTrafficBtn = 'btn-start-traffic';
	const formAddBridgeBtn = 'btn-add-bridge';

	/**
	 * Singleton that controls the entire application flow
	 */
	class MainApp {
		constructor() {
			this._activeThreadsTotal = 0;
			this._runningThreads = 0;
			this._threads = [];
			this._btnStart = document.getElementById( formStartTrafficBtn );
			this._iptCarsTotal = document.getElementById( formNumberOfCarsIpt );
			this._iptTotalTime = document.getElementById( formNumberOfCarsIpt );

			this._btnStart.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				this._start();
			} );
		}

		/**
		 * Initializes the first thread (the browser counter, basically)
		 * We are not initializing them in the constructor just because the class is not available at this moment (is only declared after)
		 */
		init() {
			this._createThread( true );
			this._createThread( true );
		}

		/**
		 * Created a thread
		 * @param useWorker{boolean}
		 * @private
		 */
		_createThread( useWorker ) {
			this._threads.push( new mtJs.Thread( this._activeThreadsTotal + 1, useWorker ) );
			this._activeThreadsTotal++;
		}

		/**
		 * Starts the Threads processing
		 * @private
		 */
		_start() {
			console.info( `Number of Threads running: ${this._activeThreadsTotal }` );

			let iptValue = parseInt( this._iptCarsTotal.value, 10 );
			let totalCount = 0;
			for ( let i = 0; i < this._activeThreadsTotal; i++ ) {
				let total;
				if ( i !== this._activeThreadsTotal - 1 ) {
					total = Math.floor( iptValue / this._activeThreadsTotal );
				} else {
					total = iptValue - totalCount;
				}
				setTimeout( () => {
						this._threads[ i ].start( total )
							.then( ( dataTotal ) => {
								this._runningThreads++;
							} );
					}
					, 1 );
				totalCount += total;
			}
		}
	}

	mtJs.mainApp = new MainApp;
})();