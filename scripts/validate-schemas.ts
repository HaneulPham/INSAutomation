import { readFile } from 'node:fs/promises';
import { taskSchema } from '../schemas/tasks/task.schema.js';

const taskFixtureUrl = new URL('../fixtures/tasks/general/valid-task.json', import.meta.url);
const fixture = JSON.parse(await readFile(taskFixtureUrl, 'utf8')) as unknown;
taskSchema.parse(fixture);
console.log('Schema validation passed: fixtures/tasks/general/valid-task.json');
