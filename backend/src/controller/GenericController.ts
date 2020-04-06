import { Connection, createConnection ,Repository, getConnection, ObjectID, DeleteResult, ObjectType } from "typeorm";

export default class UserController<T> {
    private connection: Connection;
    private repository: Repository<T>;
    private classType: ObjectType<T>

    constructor(classType: ObjectType<T>) {
        this.classType = classType;
        createConnection().then(connection => {
            this.connection = connection;
            this.repository = this.connection.getRepository(this.classType);
        });
    }

    public async getAll(): Promise<T[]> {
        return this.repository.find();
    }

    public async getByPk(id?: number | string | ObjectID): Promise<T> {
        return this.repository.findOne(id);
    }

    public async create(body): Promise<T[]> {
        const user = this.repository.create(body);
        return this.repository.save(user);
    }

    public async edit(body): Promise<T> {
        const user = await this.repository.findOne(body.id);
        this.repository.merge(user, body);
        return this.repository.save(user);
    }

    public async delete(id): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

}