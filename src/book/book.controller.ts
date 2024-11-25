import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { BookEntity } from 'src/db/entities/book.entity';
import { BookDto } from './book.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    async getBooks(): Promise<BookEntity[]> {
        return this.bookService.getBooks();
    }

    @Get('/:id')
    async getBookById(@Param('id') id: string): Promise<BookEntity> {
        return this.bookService.getBookById(id);
    }

    @UseGuards(AuthGuard)
    @Post('/novo-livro')
    async create(@Body() book: BookDto): Promise<void> {
        this.bookService.create(book);
    }

    @UseGuards(AuthGuard)
    @Put('/:id')
    async update(@Param('id') id: string, @Body() book: BookDto): Promise<void> {
        this.bookService.update(id, book);
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.bookService.delete(id);
    }
}
