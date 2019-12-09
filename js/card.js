class Card {
    constructor(iconName) {
        this.iconName = iconName;
        this.selected = false;
    }

    frontface() {
        return Texture.fromImage("./images/frontface.png");
    }

    backface() {
        return Texture.fromImage("./images/backface.png");
    }

    iconTexture() {
        return PIXI.Texture.fromImage(`./images/${this.iconName}`);
    }

    iconSprite() {
        let texture = PIXI.Texture.fromImage(`./images/${this.iconName}`);
        return new Sprite(texture);
    }

    value() {
        return this.iconName;
    }

    isSelected() {
        return this.selected;
    }
}
