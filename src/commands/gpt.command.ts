import { Command, CommandRunner, InquirerService } from 'nest-commander';
import { OpenaiService } from '../openai/openai.service';

@Command({
  name: 'gpt',
  description: 'request to OPENAI',
  options: {
    isDefault: true,
  },
})
export class GPTCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    private readonly openaiService: OpenaiService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const result = await this.inquirer.ask<{ text: string }>(
      'text-questions',
      undefined,
    );

    const aiResult = await this.openaiService.generateResponse([
      { role: 'system', content: 'Answer as an IT expert' },
      { role: 'user', content: result.text },
    ]);

    console.log(aiResult);
  }
}
