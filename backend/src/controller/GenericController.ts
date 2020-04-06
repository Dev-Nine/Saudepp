import { Connection, createConnection ,Repository, getConnection, ObjectID, DeleteResult, ObjectType } from "typeorm";

export default class UserController<T> {
    private connection: Connection;
    private repositoy: Repository<T>;
    private classe: ObjectType<T>

    constructor(classe: ObjectType<T>) {
        this.classe = classe;
        createConnection().then(connection => {
            this.connection = connection;
            this.repositoy = this.connection.getRepository(this.classe);
        });
    }

    public async getAll(): Promise<T[]> {
        return this.repositoy.find();
    }

    public async getByPk(id?: number | string | ObjectID): Promise<T> {
        return this.repositoy.findOne(id);
    }

    public async create(body): Promise<T[]> {
        const user = this.repositoy.create(body);
        return this.repositoy.save(user);
    }

    public async edit(body): Promise<T> {
        const user = await this.repositoy.findOne(body.id);
        this.repositoy.merge(user, body);
        return this.repositoy.save(user);
    }

    public async delete(id): Promise<DeleteResult> {
        return this.repositoy.delete(id);
    }

}