export class RecordValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RecordValidationError";
    }
}

export class TableExportError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TableExportError";
    }
}