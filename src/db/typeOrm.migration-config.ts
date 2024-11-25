import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import { UserEntity } from './entities/user.entity';

config(); //executando para carregar as variáveis de ambiente do arquivo .env

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [BookEntity, UserEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false
};

export default new DataSource(dataSourceOptions);