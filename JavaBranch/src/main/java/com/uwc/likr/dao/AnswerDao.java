package com.uwc.likr.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.uwc.likr.model.Answer;
import com.uwc.likr.model.AnswerType;

@Component
public class AnswerDao {

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

    public Answer getById(int id) throws DaoException {
        Answer answer = null;
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
            rs = st.executeQuery(" SELECT id, questionId, type, description FROM answers WHERE id = " + id);

            while (rs.next()) {
                answer = new Answer();
                answer.setId(rs.getInt("id"));
                answer.setQuestionId(rs.getInt("questionId"));
                answer.setDescription(rs.getString("description"));
                answer.setType(AnswerType.valueOf(rs.getString("type")));
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
        return answer;
    }
}
