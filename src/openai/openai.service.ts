import { Injectable } from '@nestjs/common';
import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi,
} from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private openAi: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const apiKey = configService.getOrThrow('OPENAI_API_TOKEN');
    const config = new Configuration({ apiKey });

    this.openAi = new OpenAIApi(config);
  }

  async generateResponse(messages: ChatCompletionRequestMessage[]) {
    const params: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages,
    };

    try {
      const response = await this.openAi.createChatCompletion(params);

      return response.data.choices[0].message.content;
    } catch (err) {
      console.log(err.message);

      return err;
    }
  }
}
