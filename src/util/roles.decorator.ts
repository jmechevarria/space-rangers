// import { ReflectMetadata } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

// export const Roles = (...args: string[]) => ReflectMetadata('roles', args);
export const Roles = (...args: string[]) => SetMetadata('roles', args);
