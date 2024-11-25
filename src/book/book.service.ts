import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/db/entities/book.entity';
import { Repository } from 'typeorm';
import { BookDto } from './book.dto';

@Injectable()
export class BookService {

    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>
    ) { }

    private async findBook(id: string): Promise<BookEntity> {
        const foundBook = await this.bookRepository.findOne({ where: { id } });

        if (!foundBook) {
            throw new HttpException(`oops... book of id ${id} not found`, HttpStatus.NOT_FOUND)
        }

        return foundBook;
    }

    async create(book: BookDto): Promise<BookEntity> {
        const newBook = new BookEntity();

        newBook.title = book.title;
        newBook.author = book.author;
        newBook.description = book.description;
        newBook.photoUrl = book.photoUrl;
        newBook.available = book.available;

        return await this.bookRepository.save(newBook);
    }

    async getBooks(): Promise<BookEntity[]> {
        return this.bookRepository.find();
    }

    async getBookById(id: string): Promise<BookEntity> {
        return await this.findBook(id);
    }

    async update(id: string, book: BookDto): Promise<void> {
        const bookFound = await this.findBook(id);

        bookFound.title = book.title;
        bookFound.author = book.author;
        bookFound.description = book.description;
        bookFound.photoUrl = book.photoUrl;
        bookFound.available = book.available;

        this.bookRepository.update(id, bookFound);
    }

    async delete(id: string): Promise<void> {
        const bookFound = await this.findBook(id);
        await this.bookRepository.remove(bookFound);
    }
}
