module.exports = class CanvasDto {
    id;
    owner_id;
    content;
    name;
    updatedAt;
    height;
    weight;

    constructor(model, sessionId) {
        this.id = model.id;
        this.owner_id = model.owner_id;
        this.name = model.name;
        this.content = model.content;
        this.updatedAt = model.updatedAt;
        this.height = model.height;
        this.weight = weight;
        this.sessionId = sessionId;
    }
}