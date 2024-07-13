import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .number()
      .describe(
        'how likely the person who wrote the journal entry is to engage in criminal activitie? value 0-5 with 5 being the most likely '
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the mood of the person writing the journal entry negative?'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness'
      ),
  })
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log('input', input);
  return input;
};

export const analyze = async (content) => {
  const input = await getPrompt(content);
  const model = new OpenAI({
    temperature: 0.5,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPEN_AI_KEY,
  });

  const result = await model.invoke(input);

  try {
    return parser.parse(result);
  } catch (e) {
    console.error(e);
  }
};
