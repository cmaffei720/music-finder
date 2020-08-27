module.exports = function(sequelize, DataTypes) {
    var Artist = sequelize.define("Artist", {

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

        Artist.associate = function(models) {
            Artist.belongsToMany(models.Song, {through: "ArtistSong"})
        };
        Artist.associate = function(models) {
            Artist.belongsToMany(models.Album, {through: "ArtistAlbum"} )
        }
        Artist.associate = function(models) {
            Artist.belongsToMany(models.Playlist, {through: "SongPlaylist"})
        }
        

        return Artist;

    }
