import { EntitySchema } from "typeorm";

export const Usuario = new EntitySchema({
    name: 'Usuario',
    tableName: 'usuarios',
    columns:{
        id:{
            primary: true,
            type: 'int',
            generated: true,
        },
        email:{
            type: 'text',
            unique: true,
        },
        username:{
            type: 'text',
        },
        password:{
            type: 'text',
        },
        avatar:{
            type: 'text',
        },
        created_at:{
            type: 'date',
        },
    }
})