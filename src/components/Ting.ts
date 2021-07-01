import moment from "moment";

type ITag = {
  [name: string]: string;
};

export class Ting {
  name: string;
  parentId: number;
  amount: number;
  tags: Array<ITag>;
  description: string;
  id: number;
  timeStamp: string;
  constructor(
    name: string,
    parentId: number,
    amount: number,
    tags: Array<ITag>,
    description: string
  ) {
    this.name = name;
    this.parentId = parentId;
    this.amount = amount;
    this.tags = tags;
    this.description = description;
    this.id = Date.now();
    this.timeStamp = moment().format("LLL").toString();
  }

  addTag(tag) {
    this.tags = [...this.tags, ...tag];
  }

  removeTag(tag) {
    this.tags = [...this.tags.filter((node) => node !== tag)];
  }
}
