import { HttpException, HttpStatus } from "@nestjs/common";

export class PostNotFoundException extends HttpException {
    constructor() {
        super('Post not found', HttpStatus.BAD_REQUEST);
    }
}