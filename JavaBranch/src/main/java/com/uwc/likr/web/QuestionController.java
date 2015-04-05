package com.uwc.likr.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.uwc.likr.model.Answer;
import com.uwc.likr.model.Game;
import com.uwc.likr.model.Question;
import com.uwc.likr.model.User;
import com.uwc.likr.service.AnswerService;
import com.uwc.likr.service.GameService;
import com.uwc.likr.service.QuestionService;
import com.uwc.likr.service.ServiceException;
import com.uwc.likr.service.UserService;

@Controller
@RequestMapping ("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private GameService gameService;
    @Autowired
    private UserService userService;
    @Autowired
    private AnswerService answerService;

    @RequestMapping (
        method = RequestMethod.GET,
        value = "/get")
    public @ResponseBody Question getQuestion(@RequestParam int gameId) {
        Question question = null;
        try {
            Game game = gameService.getById(gameId);
            question = questionService.getQuestion(game);
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return question;
    }

    @RequestMapping (
        method = RequestMethod.POST,
        value = "/answer")
    public @ResponseBody boolean saveAnswer(@RequestParam int answerId, @RequestParam int gameId, HttpServletRequest request) {

        try {
            Game game = gameService.getById(gameId);
            Question question = questionService.getQuestion(game);
            Object userIdObject = request.getSession().getAttribute("userId");
            if (userIdObject != null) {
                int userId = (Integer) userIdObject;
                User user = userService.getById(userId);
                Answer answer = answerService.getById(answerId);
                questionService.save(game, user, question, answer);
                return true;
            }
        } catch (ServiceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return false;
    }
}
