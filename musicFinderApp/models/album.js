module.exports = function(sequelize, DataTypes) {
    var Album = sequelize.define("Album", {
      // Giving the Author model a name of type STRING
      name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[1,100]
        }
        },
        added:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
  
    Album.associate = function(models) {
      Album.belongsTo(models.Artist, {through: "ArtistAlbum" })
    };
    Album.associate = function(models) {
        Album.belongsToMany(models.Song, {through: "AlbumSong" })
    }
    
    
  
    return Album;
};