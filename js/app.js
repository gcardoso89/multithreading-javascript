let mtJs = {};

(function(){
	const formNumberOfCarsIpt = 'ipt-carstotal';
	const formStartTrafficBtn = 'btn-start-traffic';
	const formAddBridgeBtn = 'btn-add-bridge';

	/**
	 * Singleton that controls the entire application flow
	 */
	class MainApp {
		constructor(){
			this._activeThreadsTotal = 0;
			this._threads = [];
			this._btnStart = document.getElementById( formStartTrafficBtn );
			this._btnAddBridge = document.getElementById( formAddBridgeBtn );
			this._iptCarsTotal = document.getElementById( formNumberOfCarsIpt );

			this._btnStart.addEventListener( 'click', (e) => {
				e.preventDefault();
				this._start();
			} );
		}

		/**
		 * Initializes the first thread (the browser counter, basically)
		 * We are not initializing them in the constructor just because the class is not available at this moment (is only declared after)
		 */
		init(){
			this._createThread( false );
		}

		/**
		 * Created a thread
		 * @param useWorker{boolean}
		 * @private
		 */
		_createThread( useWorker ){
			this._threads.push( new mtJs.Thread( this._activeThreadsTotal + 1 , useWorker ) );
			this._activeThreadsTotal++;
		}

		/**
		 * Starts the Threads processing
		 * @private
		 */
		_start( ){
			for ( let i = 0; i < this._activeThreadsTotal; i++ ) {
				this._threads[ i ].start();
			}
		}
	}

	mtJs.mainApp = new MainApp;
})();