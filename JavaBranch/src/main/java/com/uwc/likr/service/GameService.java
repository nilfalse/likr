package com.uwc.likr.service;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uwc.likr.dao.DaoException;
import com.uwc.likr.dao.GameDao;
import com.uwc.likr.dao.QuestionDao;
import com.uwc.likr.model.Game;
import com.uwc.likr.model.GameState;
import com.uwc.likr.model.Question;
import com.uwc.likr.model.User;

@Service
public class GameService {

    private static final int QUESTION_COUNT = 5;

    @Autowired
    private GameDao gameDao;

    @Autowired
    private QuestionDao questionDao;

    public int save(Game game) throws ServiceException {
        try {
            return gameDao.save(game);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
    }

    public List<Game> getAll() throws ServiceException {
        List<Game> gameList = new ArrayList<Game>();
        try {
            gameList = gameDao.getGameList();
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return gameList;
    }

    public Game getById(int id) throws ServiceException {
        try {
            return gameDao.getById(id);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
    }

    public void start(int id) throws ServiceException {
        Connection connection = null;
        try {
            connection = gameDao.createNewConnection();
            connection.setAutoCommit(false);
            Game game = getById(id);
            if(game.getState().equals(GameState.STARTED)) {
                connection.commit();
                return;
            }
            gameDao.start(game, getRandomList(), connection);
            connection.commit();
        } catch (DaoException e) {
            try {
                if (connection != null) {
                    connection.rollback();
                }
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            throw new ServiceException(e);
        } catch (SQLException e) {
            try {
                if (connection != null) {
                    connection.rollback();
                }
            } catch (SQLException e1) {
                // TODO Auto-generated catch block
                e1.printStackTrace();
            }
            throw new ServiceException(e);
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }

    }

    public void finish(Game game) throws ServiceException {
        try {
            gameDao.finish(game);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
    }

    public List<User> getUsers(int id) throws ServiceException {
        List<User> userList = new ArrayList<User>();
        try {
            userList = gameDao.getUsers(id);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return userList;
    }

    private List<Question> getRandomList() throws ServiceException {
        Set<Question> uniqueQuestionSet = new HashSet<Question>();

        try {
            List<Question> questionList = questionDao.getAll();
            Random random = new Random();
            while (uniqueQuestionSet.size() < QUESTION_COUNT) {
                int randomIndex = random.nextInt(questionList.size());
                Question randomQuestion = questionList.get(randomIndex);
                if (!uniqueQuestionSet.contains(randomQuestion)) {
                    uniqueQuestionSet.add(randomQuestion);
                }
            }
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return new ArrayList<Question>(uniqueQuestionSet);
    }

    public int getRightAnswersCount(Game game) throws ServiceException {
        int count = 0;
        try {
            count = gameDao.getRightAnswersCount(game);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return count;
    }

}
