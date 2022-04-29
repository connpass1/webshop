export class PageAble {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  size: number;

  constructor(data: PageAble) {
    this.pageNumber = data.pageNumber;
    this.pageSize = data.pageSize;
    this.totalPages = data.totalPages;
    this.totalElements = data.totalElements;
    this.size = data.size;
  }
}

export interface PageAbleData {
  content: any;
  pageable: PageAble;
}

