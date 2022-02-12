interface Item {
    id: number;
}
export const maxId = (list: Item[]) => list.reduce((maxId, item: Item) => Math.max(maxId, item.id), -1)
