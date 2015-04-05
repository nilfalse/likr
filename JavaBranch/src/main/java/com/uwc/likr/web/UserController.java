package com.uwc.likr.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.uwc.likr.model.Game;
import com.uwc.likr.model.User;
import com.uwc.likr.service.GameService;
import com.uwc.likr.service.ServiceException;
import com.uwc.likr.service.UserService;

@Controller
@RequestMapping ("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private GameService gameService;

    @RequestMapping (
        method = RequestMethod.POST,
        value = "/create")
    public @ResponseBody User create(@RequestParam String name, HttpServletRequest request) {
        User user = new User();
        user.setName(name);
        try {
            int id = userService.save(user);
            user.setId(id);
            request.getSession().setAttribute("userId", id);
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return user;
    }

    // Is not used
    @Deprecated
    @RequestMapping (
        method = RequestMethod.GET,
        value = "/getAll")
    public @ResponseBody List<User> getAll() {
        List<User> userList = new ArrayList<User>();
        try {
            userList = userService.getAll();
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return userList;
    }

    // Is not used
    @Deprecated
    @RequestMapping (
        method = RequestMethod.GET,
        value = "/get/{id}")
    public @ResponseBody User getById(@PathVariable int id) {
        User user = null;
        try {
            user = userService.getById(id);

        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return user;
    }

    @RequestMapping (
        method = RequestMethod.GET,
        value = "/get")
    public @ResponseBody User getCurrentUser(HttpServletRequest request) {
        User user = new User();
        try {
            Object userIdObject = request.getSession().getAttribute("userId");
            if (userIdObject != null) {
                int userId = (Integer) userIdObject;
                user = userService.getById(userId);
            }
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return user;
    }

    @RequestMapping (
        method = RequestMethod.POST,
        value = "/connect")
    public @ResponseBody boolean connect(@RequestParam int gameId, HttpServletRequest request) {
        try {
            Object userIdObject = request.getSession().getAttribute("userId");

            if (userIdObject != null) {
                int userId = (Integer) userIdObject;
                User user = userService.getById(userId);
                Game game = gameService.getById(gameId);

                boolean connect = userService.connect(user, game);
                request.getSession().setAttribute("gameId", gameId);
                return connect;

            }
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }

}
