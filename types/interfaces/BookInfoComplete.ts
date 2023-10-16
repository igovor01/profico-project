export default interface BookInfoComplete {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  textSnippet: string;
  thumbnail: string;
  categories: string[];
  pageCount: number;
  description: string;
  googleBooksLink: string;
}
