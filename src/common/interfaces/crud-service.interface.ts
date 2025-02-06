import { ID, Nullable } from '@common/types';

export interface ICrudService<T, CreateDto, UpdateDto> {
  findAll(): Promise<T[]>;
  findOne(id: ID): Promise<Nullable<T>>;
  create(createDto: CreateDto): Promise<T>;
  update(id: ID, updateDto: UpdateDto): Promise<Nullable<T>>;
  remove(id: ID): Promise<void>;
}
