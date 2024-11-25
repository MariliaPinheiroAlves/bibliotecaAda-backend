import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'book' })
export class BookEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    title: string;


    @Column({ type: 'varchar' })
    author: string;


    @Column({ type: 'varchar' })
    description: string;


    @Column({ type: 'varchar', name: 'photo_url', nullable: true })
    photoUrl: string;

    @Column({ type: 'boolean', default: true })
    available: boolean
}