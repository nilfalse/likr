import * as assert from 'assert';

import { BaseRepo } from '../_Base/BaseRepo';

import { questions } from './_questions';

export class QuestionsRepo extends BaseRepo {
  async query (spec) {
    const question = questions.find(spec.specified);
    return Promise.resolve(
      question === undefined ? [] : [ question ]
    );
  }

  static min = 3;
  static max = questions.length;
}
