import { Mutex } from 'async-mutex';

export const lock = new Mutex();
