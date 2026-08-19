import { taskFactory } from './task.factory.js';

export function welfareCheckFactory() {
  return taskFactory().asWelfareCheck();
}
