import { Either, Left, Right } from "../types";

export const left = <L, R>(value: L): Either<L, R> => ({ type: 'Left', value });
export const right = <L, R>(value: R): Either<L, R> => ({ type: 'Right', value });

export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> => either.type === 'Left';
export const isRight = <L, R>(either: Either<L, R>): either is Right<R> => either.type === 'Right';

export const fold = <L, R, T>(
	either: Either<L, R>,
	onLeft: (value: L) => T,
	onRight: (value: R) => T
): T => (isLeft(either) ? onLeft(either.value) : onRight(either.value));

export const mapRight = <L, R, U>(
	either: Either<L, R>,
	fn: (value: R) => U
): Either<L, U> => (isRight(either) ? right(fn(either.value)) : either);

export const flatMapRight = <L, R, U>(
	either: Either<L, R>,
	fn: (value: R) => Either<L, U>
): Either<L, U> => (isRight(either) ? fn(either.value) : either)
