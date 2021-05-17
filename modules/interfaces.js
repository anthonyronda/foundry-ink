export class DebugInterface {

    constructor(inkStory) {
        this.inkStory = inkStory;
    }

    static async loadStory(jsonFilename) {
        var f = await fetch(jsonFilename);
        var json = await f.text();
        return new DebugInterface(new inkjs.Story(json));
    }

    run() {
        while (this.inkStory.canContinue) {
            this.step(this.inkStory);
        }
    }

    step() {
        console.log(this.inkStory.ContinueMaximally());
        for (var choice of this.inkStory.currentChoices) {
            console.log(choice.text);
        };
        if (this.inkStory.currentChoices.length > 0) {
            this.inkStory.ChooseChoiceIndex(0);
        } else {
            console.log("THE END");
        }
    }

    toString() {
        return `FoundryInk.DebugInterface.${this.jsonFilename}`;
    }
}

export class ChatInterface {

    constructor(inkStory) {
        this.inkStory = inkStory;
    }

    static async loadStory(jsonFilename) {
        var f = await fetch(jsonFilename);
        var json = await f.text();
        return new ChatInterface(new inkjs.Story(json));
    }

    run() {
        while (this.inkStory.canContinue) {
            this.step(this.inkStory);
        }
    }

    step() {
        ChatMessage.create({ content: this.inkStory.ContinueMaximally() });
        for (var choice of this.inkStory.currentChoices) {
            ChatMessage.create({ content: choice.text });
        };
        if (this.inkStory.currentChoices.length > 0) {
            this.inkStory.ChooseChoiceIndex(0);
        } else {
            ChatMessage.create({ content: "THE END" });
        }
    }

    toString() {
        return `FoundryInk.ChatInterface.${this.jsonFilename}`;
    }
}