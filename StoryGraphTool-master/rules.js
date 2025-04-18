class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("let's go");
    }

    handleChoice() {
        console.log(this.engine.storyData.InitialLocation);
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show("<br/><hr><br/>")
        this.engine.show(locationData.Body + "<br/><br/>"); // TODO: replace this text by the Body of the location data

        if(locationData.Unlock != undefined) {
            this.engine.clearCondition(locationData.Unlock);
        }

        if (locationData.Image != undefined) {
            
            this.engine.updateImage("./assets/" + locationData.Image)
        } else {
            this.engine.deleteImage();
        }
        
        if(locationData.Choices != undefined) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                
                let condition = choice.Condition;

                if (condition == undefined || this.engine.getCondition(condition)) { // if there's no condition to view this choice or the condition has been met
                    this.engine.addChoice(choice.Text, choice);
                }
            }
        } else {
            this.engine.addChoice("the end")
        }
    }

    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>inspired by true events<br/><br/>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');