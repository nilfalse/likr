package com.uwc.likr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uwc.likr.dao.DaoException;
import com.uwc.likr.dao.QuestionDao;
import com.uwc.likr.model.Answer;
import com.uwc.likr.model.Game;
import com.uwc.likr.model.Question;
import com.uwc.likr.model.User;

@Service
public class QuestionService {

    @Autowired
    private QuestionDao questionDao;

    public Question getQuestion(Game game) throws ServiceException {
        Question question = null;
        try {
            question = questionDao.getQuestion(game);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return question;
    }

    public void save(Game game, User user, Question question, Answer answer) throws ServiceException {
        try {
            questionDao.save(game, user, question, answer);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
    }

}
