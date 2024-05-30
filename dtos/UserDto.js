module.exports = class UserDto {
    id;
    username;
    password;
    email;
    emailConfirmed;
    profileImage;

    constructor(model, sessionId) {
        this.id = model.id;
        this.username = model.username;
        this.password = model.password;
        this.email = model.email;
        this.emailConfirmed = model.email_confirmed;
        this.profileImage = model.profile_image;
        this.sessionId = sessionId;
    }
}