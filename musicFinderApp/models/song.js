module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define("Song", {
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
  
    Song.associate = function(models) {
        Song.belongsTo(models.Artist, {through: "ArtistSong"})
    };
    Song.associate = function(models) {
        Song.belongsToMany(models.Playlist, { through: "SongPlaylist"});
    }
    Song.associate = function(models) {
          Song.belongsTo(models.Album, {through: "AlbumSong"})
      };
    
    
  
    return Song;
};


  