export default interface IMessage {
    Id?: number;
    Author:string,
    Subject:string,
    Body:string,
    CreatedAt?:Date,
}