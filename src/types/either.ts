export type Either<L, R> = Left<L> | Right<R>;

export interface Left<L> {
  type: 'Left';
  value: L;
}

export interface Right<R> {
  type: 'Right';
  value: R;
}

