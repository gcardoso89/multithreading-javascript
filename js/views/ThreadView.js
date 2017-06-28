(function () {
	// thread selectors prefix and sufixes
	const threadPrefixSelector = 'thread-';
	const threadStartSelector = '-start';
	const threadTimeSpentSelector = '-finished';
	const threadCarsTotalSelector = '-carstotal';

	/**
	 * The thread view is responsible to control the Thread visualization using the DOM.
	 */
	class ThreadView {
		constructor( threadNumber ) {
			this._container = document.getElementById( `${threadPrefixSelector}${threadNumber}` );
			this._start = document.getElementById( `${threadPrefixSelector}${threadNumber}${threadStartSelector}` );
			this._timeSpent = document.getElementById( `${threadPrefixSelector}${threadNumber}${threadTimeSpentSelector}` );
			this._carsTotal = document.getElementById( `${threadPrefixSelector}${threadNumber}${threadCarsTotalSelector}` );
		}

		/**
		 * Converts the number into date string and writes in the thread container
		 * @param startValue
		 */
		updateStart( startValue ) {
			if ( this._container ){
				this._start.innerText = startValue;
			}
		}

		/**
		 * Converts the number into miliseconds string and writes in the thread container
		 * @param timeSpent
		 */
		updateTimeSpent( timeSpent ) {
			if ( this._container ){
				this._timeSpent.innerText = `${timeSpent} ms`;
			}
		}

		/**
		 *  Converts the number into 'total cars' string and Writes the number of cars processed in the thread container
		 * @param carsTotal
		 */
		updateCarsTotal( carsTotal ) {
			if ( this._container ){
				this._carsTotal.innerText = `${carsTotal} cars`;
			}
		}

		/**
		 * Cleans all the information present within the thread container
		 */
		cleanInfo() {
			if ( this._container ){
				this._start.innerText = '';
				this._timeSpent.innerText = '';
				this._carsTotal.innerText = '';
			}
		}

		/**
		 * Hides the thread container
		 */
		hide() {
			if ( this._container ) {
				this._container.style = 'display:none';
			}
		}

		/**
		 * Shows the thread container
		 */
		show() {
			if ( this._container ) {
				this._container.style = 'display:block';
			}
		}
	}

	mtJs.ThreadView = ThreadView;
})();