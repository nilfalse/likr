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
import com.uwc.likr.model.User;

@Component
public class UserDao {

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

    public int save(User user) throws DaoException {
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
            sb.append(" INSERT INTO users ");
            sb.append(" ( name ) ");
            sb.append(" VALUES ( ? ) ");

            ps = connection.prepareStatement(sb.toString(), Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, user.getName());

            ps.executeUpdate();

            generatedId = getGeneratedId(user, ps);
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

    public List<User> getUserList() throws DaoException {
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
            rs = st.executeQuery(" SELECT id, name FROM users ");

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

    private int getGeneratedId(User user, Statement st) throws SQLException {
        ResultSet generatedKeys = st.getGeneratedKeys();
        generatedKeys.next();
        int generatedKey = generatedKeys.getInt(1);
        user.setId(generatedKey);
        return generatedKey;
    }

    public User getById(int id) throws DaoException {
        User user = null;
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
            rs = st.executeQuery(" SELECT id, name FROM users WHERE id = " + id);

            while (rs.next()) {
                user = new User();
                user.setId(rs.getInt("id"));
                user.setName(rs.getString("name"));
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
        return user;
    }

    public boolean isConnected(User user, Game game) throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        PreparedStatement ps = null;

        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" SELECT g.id FROM games g");
            sb.append(" LEFT JOIN game_users gu on gu.gameid = g.id ");
            sb.append(" WHERE g.id = ? ");
            sb.append("  AND g.state = ? ");
            sb.append("  AND gu.userId = ?");

            ps = connection.prepareStatement(sb.toString());

            ps.setInt(1, game.getId());
            ps.setString(2, GameState.CREATED.name());
            ps.setInt(3, user.getId());

            ResultSet rs = ps.executeQuery();
            return rs.next();
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

    public boolean isGameFull(Game game, int maxSlots) throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        PreparedStatement ps = null;

        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" SELECT g.id FROM games g");
            sb.append(" LEFT JOIN game_users gu on gu.gameid = g.id ");
            sb.append(" WHERE g.id = ? ");
            sb.append("  AND g.state = ? ");
            sb.append("  HAVING count(gu.id) >= ? ");

            ps = connection.prepareStatement(sb.toString());

            ps.setInt(1, game.getId());
            ps.setString(2, GameState.CREATED.name());
            ps.setInt(3, maxSlots);

            ResultSet rs = ps.executeQuery();
            return rs.next();
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

    public void connect(User user, Game game) throws DaoException {
        Connection connection;
        try {
            connection = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
        } catch (SQLException e) {
            throw new DaoException(e);
        }
        PreparedStatement ps = null;

        try {

            StringBuilder sb = new StringBuilder();
            sb.append(" INSERT INTO game_users ");
            sb.append(" ( gameId, userId ) ");
            sb.append(" VALUES ( ?, ? ) ");

            ps = connection.prepareStatement(sb.toString());

            ps.setInt(1, game.getId());
            ps.setInt(2, user.getId());

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
