import { HttpException, HttpStatus } from "@nestjs/common";

export class MongoObjectIdException extends HttpException {
    constructor() {
        super('Id is not valid Mongo ObjectId', HttpStatus.BAD_REQUEST);
    }
}