import { EntitySchema } from "typeorm";

export const Tipo = new EntitySchema({
    name: 'Tipo',
    tableName: 'tipos',
    columns:{
        id:{
            primary: true,
            type: 'int',
            generated: true,
        },
        name:{
            type:'text',
            unique:true,
            nullable: false,
        },
    }
})