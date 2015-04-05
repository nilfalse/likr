package com.uwc.likr.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uwc.likr.dao.DaoException;
import com.uwc.likr.dao.UserDao;
import com.uwc.likr.model.Game;
import com.uwc.likr.model.User;

@Service
public class UserService {

    private static final int MAX_SLOTS = 2;
    @Autowired
    private UserDao userDao;

    public int save(User user) throws ServiceException {
        try {
            return userDao.save(user);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
    }

    public List<User> getAll() throws ServiceException {
        List<User> userList = new ArrayList<User>();
        try {
            userList = userDao.getUserList();
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return userList;
    }

    public User getById(int id) throws ServiceException {
        try {
            return userDao.getById(id);
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
    }

    public boolean connect(User user, Game game) throws ServiceException {
        boolean connect = false;
        if (user == null || game == null) {
            return false;
        }
        try {
            if (!userDao.isConnected(user, game) && !userDao.isGameFull(game, MAX_SLOTS)) {
                userDao.connect(user, game);
                connect = true;
            }
        } catch (DaoException e) {
            throw new ServiceException(e);
        }
        return connect;
    }
}
