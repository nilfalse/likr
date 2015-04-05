package com.uwc.likr.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.uwc.likr.model.Answer;
import com.uwc.likr.model.AnswerType;
import com.uwc.likr.model.Game;
import com.uwc.likr.model.Question;
import com.uwc.likr.model.User;

@Component
public class QuestionDao {

    @Value ("${db.url}")
    private String dbUrl;
    @Value ("${db.username}")
    private String dbUsername;
    @Value ("${db.password}")
    private String dbPassword;
    @Value ("${db.driverClassName}")
    private String driverClassName;

    @PostConstruct
    public void init() throws DaoException {
        try {
            Class.forName(driverClassName);
        } catch (ClassNotFoundException e) {
            throw new DaoException(e);
        }

    }

    public List<Question> getAll() throws DaoException {
        List<Question> questionList = new ArrayList<Question>();
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        Statement st = null;
        ResultSet rs = null;
        try {

            st = connection.createStatement();

            StringBuilder builder = new StringBuilder();
            builder.append(" SELECT q.id as questionId, q.title, a.id as answerId, a.description, a.type FROM questions q ");
            builder.append(" JOIN answers a ON a.questionId = q.id ");
            rs = st.executeQuery(builder.toString());

            while (rs.next()) {

                Question question = new Question();
                question.setId(rs.getInt("questionId"));
                question.setTitle(rs.getString("title"));

                Answer answer = new Answer();
                answer.setId(rs.getInt("answerId"));
                answer.setDescription(rs.getString("description"));
                answer.setType(AnswerType.valueOf(rs.getString("type")));

                int questionIndex = questionList.indexOf(question);
                if (questionIndex == -1) {
                    question.addAnswer(answer);
                    questionList.add(question);
                } else {
                    questionList.get(questionIndex).addAnswer(answer);
                }
            }
        } catch (SQLException ex) {
            throw new DaoException(ex);
        } finally {
            try {
                if (st != null) {
                    st.close();
                }
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return questionList;
    }

    public Question getQuestion(Game game) throws DaoException {
        Question question = null;
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        Statement st = null;
        ResultSet rs = null;
        try {

            st = connection.createStatement();
            StringBuilder builder = new StringBuilder();
            builder.append(" SELECT q.id as questionId, q.title, a.id as answerId, a.description, a.type FROM questions q ");
            builder.append(" JOIN answers a ON a.questionId = q.id ");
            builder.append(" JOIN game_user_answers gua ON gua.questionId = q.id ");
            builder.append(" WHERE gua.gameId = ");
            builder.append(game.getId());
            builder.append(" AND gua.answerId IS NULL GROUP BY a.id ");
            rs = st.executeQuery(builder.toString());
            int lastQuestionId = 0;
            while (rs.next()) {
                int questionId = rs.getInt("questionId");
                if (questionId != lastQuestionId) {
                    lastQuestionId = questionId;
                    question = new Question();
                    question.setId(rs.getInt("questionId"));
                    question.setTitle(rs.getString("title"));
                }

                Answer answer = new Answer();
                answer.setId(rs.getInt("answerId"));
                answer.setDescription(rs.getString("description"));
                answer.setType(AnswerType.valueOf(rs.getString("type")));

                question.addAnswer(answer);

            }
        } catch (SQLException ex) {
            throw new DaoException(ex);
        } finally {
            try {
                if (st != null) {
                    st.close();
                }
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return question;
    }

    public void save(Game game, User user, Question question, Answer answer) throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        PreparedStatement ps = null;
        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" UPDATE game_user_answers ");
            sb.append(" SET answerId = ? ");
            sb.append(" WHERE gameId = ? AND userId = ? AND questionId = ? ");

            ps = connection.prepareStatement(sb.toString());

            ps.setInt(1, answer.getId());
            ps.setInt(2, game.getId());
            ps.setInt(3, user.getId());
            ps.setInt(4, question.getId());
            ps.executeUpdate();

        } catch (SQLException ex) {
            throw new DaoException(ex);
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

}
