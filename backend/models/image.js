const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  original_image_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deblurred_image_path: {
    type: DataTypes.STRING,
    allowNull: true, // Initially null until processed
  },
  upload_timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deblur_timestamp: {
    type: DataTypes.DATE,
    allowNull: true, // Initially null until deblurring is complete
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
  metadata: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
