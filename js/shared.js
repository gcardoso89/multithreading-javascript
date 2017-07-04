function processFixedData( total ) {
	let Pi = 0;
	let n = 1;
	let totalDataProcessed = 0;
	for ( let i = 0; i < total; i++ ) {
		Pi = Pi + (4 / n) - (4 / (n + 2));
		n = n + 4;
		totalDataProcessed++;
	}

	return totalDataProcessed;
}