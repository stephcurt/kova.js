import {DECIMALS, add, subtract, multiply, divide, pow, e2, e3, inv, neg, delta} from '../src/kova.js';
import {expect} from 'chai';

describe('Precision', () => {
    it('operations should result in a number', () => {
        expect(add(1, 2)).to.be.a('number');
        expect(subtract(2, 1)).to.be.a('number');
        expect(multiply(2, 2)).to.be.a('number');
        expect(divide(3, 2)).to.be.a('number');
    });
    it('operations should be precise to the significant digit', () => {
        const a = 1.1234567890123457;
        const b = 1.0123456789012344;
        const countPrecision = n => String(n).split('.')[1].length;

        expect(countPrecision(add(a, b))).to.equal(DECIMALS);
        expect(countPrecision(subtract(a, b))).to.equal(DECIMALS);
        expect(countPrecision(multiply(a, b))).to.equal(DECIMALS);
        expect(countPrecision(divide(a, b))).to.equal(DECIMALS);
    });
});

describe('Addition', () => {
    it('binary operations should calculate 1 + 1, -1 + 1, -1 + -1 correctly', () => {
        const simpleAdditionResult = 2;
        expect(add(1, 1)).to.equal(simpleAdditionResult);
        const negativeAdditionResult = 0;
        expect(add(-1, 1)).to.equal(negativeAdditionResult);
        const doubleNegativeAdditionResult = -2;
        expect(add(-1, -1)).to.equal(doubleNegativeAdditionResult);
    });
    it('ternary operations should calculate 1 + 1 + 1, -1 + 1 + -1, -1 + -1 + -1 correctly', () => {
        const simpleAdditionResult = 3;
        expect(add(1, 1, 1)).to.equal(simpleAdditionResult);
        const negativeAdditionResult = -1;
        expect(add(-1, 1, -1)).to.equal(negativeAdditionResult);
        const doubleNegativeAdditionResult = -3;
        expect(add(-1, -1, -1)).to.equal(doubleNegativeAdditionResult);
    });
    it('floating point error correction operations should calculate .1 + .3, -.1 + .3, -.1 + .3 + -.2 correctly', () => {
        const simpleAdditionResult = .4;
        expect(add(.1, .3)).to.equal(simpleAdditionResult);
        const negativeAdditionResult = .2;
        expect(add(-.1, .3)).to.equal(negativeAdditionResult);
        const chainAdditionResult = 0;
        expect(add(-.1, .3, -.2)).to.equal(chainAdditionResult);
    });
});

describe('Subtraction', () => {
    it('binary operations should calculate 1 - 1, -1 - 1, -1 - -1 correctly', () => {
        const simpleSubtractionResult = 0;
        expect(subtract(1, 1)).to.equal(simpleSubtractionResult);
        const negativeSubtractionResult = -2;
        expect(subtract(-1, 1)).to.equal(negativeSubtractionResult);
        const doubleNegativeSubtractionResult = 0;
        expect(subtract(-1, -1)).to.equal(doubleNegativeSubtractionResult);
    });
    it('ternary operations should calculate 1 - 1 - 1, -1 - 1 - -1, -1 - -1 - -1 correctly', () => {
        const simpleSubtractionResult = -1;
        expect(subtract(1, 1, 1)).to.equal(simpleSubtractionResult);
        const negativeSubtractionResult = -1;
        expect(subtract(-1, 1, -1)).to.equal(negativeSubtractionResult);
        const doubleNegativeSubtractionResult = 1;
        expect(subtract(-1, -1, -1)).to.equal(doubleNegativeSubtractionResult);
    });
    it('floating point error correction operations should calculate .1 - .3, -.1 - .3, -.1 - .2 - -.3 correctly', () => {
        const simpleSubtractionResult = -.2;
        expect(subtract(.1, .3)).to.equal(simpleSubtractionResult);
        const negativeSubtractionResult = -.4;
        expect(subtract(-.1, .3)).to.equal(negativeSubtractionResult);
        const chainSubtractionResult = 0;
        expect(subtract(-.1, .2, -.3)).to.equal(chainSubtractionResult);
    });
});

describe('Multiplication', () => {
    it('binary operations should calculate 2 * 2, -2 * 1, -2 * -2 correctly', () => {
        const simpleMultiplicationResult = 4;
        expect(multiply(2, 2)).to.equal(simpleMultiplicationResult);
        const negativeMultiplicationResult = -4;
        expect(multiply(-2, 2)).to.equal(negativeMultiplicationResult);
        const doubleNegativeMultiplicationResult = 4;
        expect(multiply(-2, -2)).to.equal(doubleNegativeMultiplicationResult);
    });
    it('ternary operations should calculate 2 * 2 * 2, -2 * 2 * -2, -2 * -2 * -2 correctly', () => {
        const simpleMultiplicationResult = 8;
        expect(multiply(2, 2, 2)).to.equal(simpleMultiplicationResult);
        const negativeMultiplicationResult = 8;
        expect(multiply(-2, 2, -2)).to.equal(negativeMultiplicationResult);
        const doubleNegativeMultiplicationResult = -8;
        expect(multiply(-2, -2, -2)).to.equal(doubleNegativeMultiplicationResult);
    });
    it('floating point error correction operations should calculate .1 * .3, -.1 * .3, -.1 * .2 * -.3 correctly', () => {
        const simpleMultiplicationResult = .03;
        expect(multiply(.1, .3)).to.equal(simpleMultiplicationResult);
        const negativeMultiplicationResult = -.03;
        expect(multiply(-.1, .3)).to.equal(negativeMultiplicationResult);
        const chainMultiplicationResult = .006;
        expect(multiply(-.1, .2, -.3)).to.equal(chainMultiplicationResult);
    });
});

describe('Division', () => {
    it('binary operations should calculate 2 / 3, -2 / 3, -2 / -3 correctly', () => {
        const simpleDivisionResult = .66666;
        expect(divide(2, 3)).to.equal(simpleDivisionResult);
        const negativeDivisionResult = -.66666;
        expect(divide(-2, 3)).to.equal(negativeDivisionResult);
        const doubleNegativeDivisionResult = .66666;
        expect(divide(-2, -3)).to.equal(doubleNegativeDivisionResult);
    });
    it('ternary operations should calculate 2 / 3 / 2, -2 / 3 / -2, -2 / -3 / -2 correctly', () => {
        const simpleDivisionResult = .33333;
        expect(divide(2, 3, 2)).to.equal(simpleDivisionResult);
        const negativeDivisionResult = .33333;
        expect(divide(-2, 3, -2)).to.equal(negativeDivisionResult);
        const doubleNegativeDivisionResult = -.33333;
        expect(divide(-2, -3, -2)).to.equal(doubleNegativeDivisionResult);
    });
    it('floating point error correction operations should calculate .1 / .3, -.1 / .3, -.1 / .2 / -.3 correctly', () => {
        const simpleDivisionResult = .33333;
        expect(divide(.1, .3)).to.equal(simpleDivisionResult);
        const negativeDivisionResult = -.33333;
        expect(divide(-.1, .3)).to.equal(negativeDivisionResult);
        const chainDivisionResult = 1.66666;
        expect(divide(-.1, .2, -.3)).to.equal(chainDivisionResult);
    });
});

describe('Powers', () => {
    it('binary operations should calculate 2^2, 2^-2, 2^.2 correctly', () => {
        const simpleExponentResult = 4;
        expect(pow(2, 2)).to.equal(simpleExponentResult);
        const negativeExponentResult = .25;
        expect(pow(2, -2)).to.equal(negativeExponentResult);
        const decimalExponentResult = 1.14869;
        expect(pow(2, .2)).to.equal(decimalExponentResult);
    });
    it('ternary operations should calculate 2^2^2, 2^-2^2, 2^.2^.2 correctly', () => {
        const simpleExponentResult = 16;
        expect(pow(2, 2, 2)).to.equal(simpleExponentResult);
        const negativeExponentResult = 16;
        expect(pow(2, -2, 2)).to.equal(negativeExponentResult);
        const decimalExponentResult = 1.65263;
        expect(pow(2, .2, .2)).to.equal(decimalExponentResult);
    });
    it('helpers should calculate 2^2 and 2^3 correctly', () => {
        const squaredResult = 4;
        expect(e2(2)).to.equal(squaredResult);
        const cubedResult = 8;
        expect(e3(2)).to.equal(cubedResult);
    });
});

describe('Helper', () => {
    it('should get 3 given range of 10 and value of 7', () => {
        const inverseResult = 7;
        expect(inv(3, 10)).to.equal(inverseResult);
    });
    it('should get -2 given 2', () => {
        const negativeResult = -2;
        expect(neg(2)).to.equal(negativeResult);
    });
    it('should get delta of 10 and 3', () => {
        const deltaResult = 7;
        expect(delta(3, 10)).to.equal(deltaResult);
    });
});