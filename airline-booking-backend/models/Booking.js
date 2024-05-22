module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false
      },
      seatNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  
    return Booking;
  };
  