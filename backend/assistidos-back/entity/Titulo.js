import { EntitySchema } from "typeorm";

export const Titulo = new EntitySchema({
    name: 'Titulo',
    tableName: 'titulos',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        titleName: {
            type: 'text',
            nullable: false,
        },
        startDate: {
            type: 'date',
            nullable: false,
        },
        endDate: {
            type: 'date',
            nullable: true,
        },
        genre: {
            type: 'text',
            nullable: false
        },
        note: {
            type: 'int',
            nullable: false
        },
        comment: {
            type: 'text',
            nullable: false
        },
        image: {
            type: 'text',
            nullable: false
        },
    },
    relations:{
        type:{
            target: 'Tipo',
            type: 'many-to-one',
            joinColumn: {name: 'tipo_id'},
            onDelete: 'CASCADE',
            nullable: false
        },
        user:{
            target: 'Usuario',
            type: 'many-to-one',
            joinColumn: {name: 'user_id'},
            onDelete: 'CASCADE',
            nullable: false
        }
    }
})