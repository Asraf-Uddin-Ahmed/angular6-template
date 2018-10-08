
export class PaginationField {
    pageNumber: string;
    startOffset: string;
    itemsPerPage: string;

    hasRequiredPaginationFields() {
        return (this.pageNumber || this.startOffset) && this.itemsPerPage;
    }
}
