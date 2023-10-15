export default interface BookInfo {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  textSnippet: string;
  thumbnail: string;
  categories: string[];
  pageCount: number;
}
