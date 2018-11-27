
export class PaginationField {
    pageNumber: string;
    startOffset: string;
    itemsPerPage: string;
    pageStartFrom = 1;

    hasRequiredPaginationFields() {
        return (this.pageNumber || this.startOffset) && this.itemsPerPage;
    }
}
