module.exports = function(sequelize, DataTypes) {
    var Playlist = sequelize.define("Playlist", {
        name:{
        type: DataTypes.STRING,
        unique: true,
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

        Playlist.associate = function(models) {
            Playlist.belongsToMany(models.Song, {through: 'SongPlaylist'})
        };
        Playlist.associate = function(models) {
            Playlist.belongsToMany(models.Artist, {through: 'SongPlaylist'})
        };
        return Playlist;

    }