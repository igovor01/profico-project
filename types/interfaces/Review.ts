import BookInfo from "./BookInfo";

export default interface Review {
  id: number;
  text: string;
  rating: number;
  book: BookInfo;
}
