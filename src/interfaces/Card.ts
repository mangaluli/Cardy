export default interface Card {
  id?: number;
  info: {
    name: string;
    comment: string;
    date: number;
    lovedByUserIds: number[];
    ownerId: number;
  };
  data: {
    themeId: number;
    title: string;
    description?: string;
    email: string;
    phone: string;
    address: string;
  };
}