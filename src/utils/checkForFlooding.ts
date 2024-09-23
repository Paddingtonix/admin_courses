export const checkForFlooding = (testString: string, maxLength: number) => {
	return testString.length > maxLength
		? testString.slice(0, maxLength).concat("...")
		: testString;
};
