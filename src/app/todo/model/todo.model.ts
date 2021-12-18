export class Todo
{
    public id = '';
    public title: string;
    public done: boolean = false;
    public date = Date.now();

    constructor(title: string) {
        this.title = title;
    }
}