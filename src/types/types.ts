
export type GuitarType = {
    id: number
    name: string
    description: string
    image: string
    price: number


}



export type cartItemType = GuitarType & {
    quantity: number
}
export type GuitarIdType = GuitarType['id'];