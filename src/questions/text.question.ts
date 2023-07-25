import { Question, QuestionSet } from 'nest-commander';

@QuestionSet({ name: 'text-questions' })
export class TextQuestion {
  @Question({ message: 'What can I suggest to you', name: 'text' })
  parseTask(value: string) {
    return value;
  }
}
