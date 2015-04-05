package com.uwc.likr.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.uwc.likr.model.Game;
import com.uwc.likr.model.GameState;
import com.uwc.likr.model.User;
import com.uwc.likr.service.GameService;
import com.uwc.likr.service.ServiceException;

@Controller
@RequestMapping ("/game")
public class GameController {

    @Autowired
    private GameService gameService;

    @RequestMapping (
        method = RequestMethod.POST,
        value = "/create")
    public @ResponseBody Game create(@RequestParam String name, HttpServletRequest request) {
        Game game = new Game();
        try {
            game.setName(name);
            int id = gameService.save(game);
            game.setId(id);
            game.setState(GameState.CREATED);

            request.getSession().setAttribute("gameId", id);
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return game;
    }

    @RequestMapping (
        method = RequestMethod.GET,
        value = "/getAll")
    public @ResponseBody List<Game> getAll() {
        List<Game> gameList = new ArrayList<Game>();
        try {
            gameList = gameService.getAll();
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return gameList;
    }

    @RequestMapping (
        method = RequestMethod.GET,
        value = "/getUsers")
    public @ResponseBody List<User> getUsers(HttpServletRequest request) {
        List<User> userList = new ArrayList<User>();
        try {
            Object gameIdObject = request.getSession().getAttribute("gameId");
            if (gameIdObject != null) {
                int gameId = (Integer) gameIdObject;
                userList = gameService.getUsers(gameId);
            }
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return userList;
    }

    @RequestMapping (
        method = RequestMethod.GET,
        value = "/get")
    public @ResponseBody Game getCurrent(HttpServletRequest request) {
        Game game = new Game();
        try {
            Object gameIdObject = request.getSession().getAttribute("gameId");
            if (gameIdObject != null) {
                int gameId = (Integer) gameIdObject;
                game = gameService.getById(gameId);
            }

        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return game;
    }

    @RequestMapping (
        method = RequestMethod.POST,
        value = "/start")
    public @ResponseBody boolean start(HttpServletRequest request) {
        try {
            Object gameIdObject = request.getSession().getAttribute("gameId");
            if (gameIdObject != null) {
                int gameId = (Integer) gameIdObject;
                gameService.start(gameId);
            }

            return true;
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }

    @RequestMapping (
        method = RequestMethod.POST,
        value = "/finish")
    public @ResponseBody boolean finish(@RequestParam int id) {
        try {
            Game game = gameService.getById(id);
            gameService.finish(game);
            return true;
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }

    @RequestMapping (
        method = RequestMethod.GET,
        value = "/rightAnswersCount")
    public @ResponseBody int rightAnswersCount(HttpServletRequest request) {
        try {
            Object gameIdObject = request.getSession().getAttribute("gameId");
            if (gameIdObject != null) {
                int gameId = (Integer) gameIdObject;
                Game game = gameService.getById(gameId);
                int count = gameService.getRightAnswersCount(game);
                return count;
            }
            return 0;
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return 0;
    }
}
