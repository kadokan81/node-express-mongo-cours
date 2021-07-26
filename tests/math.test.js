const { tipsCalc } = require('../src/math');

test('Hello test', () => {
	expect(tipsCalc(10, 0.3)).toBe(13);
});

// test('Test dafault value for tips', (done) => {
// 	expect(tipsCalc(10)).toBe(11);
// });

test('Async code', () => {
	setTimeout(() => {
		expect(1).toBe(2);
		done();
	}, 2000);
});
