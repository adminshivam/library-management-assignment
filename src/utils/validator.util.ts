import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

async function validateDTO<T>(dtoClass: new () => T, payload: object): Promise<T> {
  const instance = plainToInstance(dtoClass, payload);
  const errors = await validate(instance as object);

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.map(err => Object.values(err.constraints || {})).join(', ')}`);
  }

  return instance;
}

export { validateDTO };