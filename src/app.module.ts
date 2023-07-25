import { Module } from '@nestjs/common';
import { GPTCommand } from './commands/gpt.command';
import { TextQuestion } from './questions/text.question';
import { OpenaiModule } from './openai/openai.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OpenaiModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [GPTCommand, TextQuestion],
})
export class AppModule {}
