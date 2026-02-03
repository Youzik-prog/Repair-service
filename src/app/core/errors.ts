export class RecordValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RecordValidationError";
    }
}