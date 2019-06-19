export class User {
    id: number;
    username: string;
    password: string;
    token: string;

    public static Parse(json: any): User {
        return new User({
            username: json.username,
            token: json.token
        });
    }

    public constructor(init?) {
        Object.assign(this, init);
    }
}
