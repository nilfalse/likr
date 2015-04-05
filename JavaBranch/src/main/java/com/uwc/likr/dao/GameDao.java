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

import com.uwc.likr.model.Game;
import com.uwc.likr.model.GameState;
import com.uwc.likr.model.Question;
import com.uwc.likr.model.User;

@Component
public class GameDao {

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

    public int save(Game game) throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        PreparedStatement ps = null;
        int generatedId = 0;

        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" INSERT INTO games ");
            sb.append(" ( name ) ");
            sb.append(" VALUES ( ? ) ");

            ps = connection.prepareStatement(sb.toString(), Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, game.getName());

            ps.executeUpdate();

            generatedId = getGeneratedId(game, ps);
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
        return generatedId;
    }

    public List<Game> getGameList() throws DaoException {
        List<Game> gameList = new ArrayList<Game>();
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
            rs = st.executeQuery(" SELECT id, name, state FROM games ");

            while (rs.next()) {
                Game game = new Game();
                game.setId(rs.getInt("id"));
                game.setName(rs.getString("name"));
                game.setState(GameState.valueOf(rs.getString("state")));
                gameList.add(game);
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
        return gameList;
    }

    private int getGeneratedId(Game game, Statement st) throws SQLException {
        ResultSet generatedKeys = st.getGeneratedKeys();
        generatedKeys.next();
        int generatedKey = generatedKeys.getInt(1);
        game.setId(generatedKey);
        return generatedKey;
    }

    public Game getById(int id) throws DaoException {
        Game game = null;
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
            rs = st.executeQuery(" SELECT id, name, state FROM games WHERE id = " + id);

            while (rs.next()) {
                game = new Game();
                game.setId(rs.getInt("id"));
                game.setName(rs.getString("name"));
                game.setState(GameState.valueOf(rs.getString("state")));
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
        return game;
    }

    public void start(Game game, List<Question> questions, Connection connection) throws DaoException {
        start(game, connection);
        List<User> users = getUsers(game.getId());
        generateQuestions(game, users, questions, connection);
    }

    private void start(Game game, Connection connection) throws DaoException {

        PreparedStatement ps = null;

        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" UPDATE games SET state = ? WHERE id = ? ");

            ps = connection.prepareStatement(sb.toString());
            ps.setString(1, GameState.STARTED.name());
            ps.setInt(2, game.getId());
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

    private void generateQuestions(Game game, List<User> userList, List<Question> questionList, Connection connection) throws DaoException {
        PreparedStatement ps = null;
        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" INSERT INTO game_user_answers ");
            sb.append(" ( gameId, userId, questionId ) ");
            sb.append(" VALUES ( ?, ?, ? ) ");

            ps = connection.prepareStatement(sb.toString());
            for (User user : userList) {
                for (Question question : questionList) {
                    ps.setInt(1, game.getId());
                    ps.setInt(2, user.getId());
                    ps.setInt(3, question.getId());
                    ps.addBatch();
                }
            }

            ps.executeBatch();

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

    public void finish(Game game) throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        PreparedStatement ps = null;

        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" UPDATE games SET state = ? WHERE id = ? ");

            ps = connection.prepareStatement(sb.toString());
            ps.setString(1, GameState.FINISHED.name());
            ps.setInt(2, game.getId());
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

    public List<User> getUsers(int id) throws DaoException {
        List<User> userList = new ArrayList<User>();
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
            builder.append(" SELECT u.id, u.name FROM users u ");
            builder.append(" JOIN game_users gu on gu.userId = u.id ");
            builder.append(" WHERE gu.gameId = ");
            builder.append(id);
            rs = st.executeQuery(builder.toString());

            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setName(rs.getString("name"));
                userList.add(user);
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
        return userList;
    }

    public Connection createNewConnection() throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        return connection;
    }

    public int getRightAnswersCount(Game game) throws DaoException {
        int count = 0;
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
            builder.append(" SELECT count(id) FROM game_user_answers ");
            builder.append(" WHERE gameId = ");
            builder.append(game.getId());
            builder.append(" AND answerId IS NOT NULL ");
            builder.append(" GROUP BY questionId ");
            builder.append(" HAVING count(id) > 1 AND count(DISTINCT answerId) like 1");
            rs = st.executeQuery(builder.toString());

            while (rs.next()) {
                count++;
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
        return count;
    }

}
