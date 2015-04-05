package com.uwc.likr.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uwc.likr.dao.AnswerDao;
import com.uwc.likr.dao.DaoException;
import com.uwc.likr.model.Answer;

@Service
public class AnswerService {

    @Autowired
    private AnswerDao answerDao;

    public Answer getById(int id) throws ServiceException {
        Answer answer = null;
        try {
            answer = answerDao.getById(id);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return answer;
    }

}
