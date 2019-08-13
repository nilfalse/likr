import { getRandomInt } from '~/universal/util';

import { questions } from './_questions';

import { BaseSpec } from '../_Base/BaseSpec';

export class QuestionsSpec extends BaseSpec {
  constructor ({ id }) {
    this._id = id;
  }

  specified = (question) => {
    return this._id === question.id;
  }

  static byId (id) {
    return new QuestionsSpec({ id });
  }

  static random () {
    return new QuestionsSpec({ id: getRandomInt(questions.length) })
  }
}
