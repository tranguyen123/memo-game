//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import animal from "./animal.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    animal,
    clickedAnimal: [],
    score: 0
  };

//when you click on a card ... the aniamal is taken out of the array
  imageClick = event => {
    const currentAnimal = event.target.alt;
    const AnimalAlreadyClicked =
      this.state.clickedAnimal.indexOf(currentAnimal) > -1;

//if you click on a fish that has already been selected, the game is reset and cards reordered
    if (AnimalAlreadyClicked) {
      this.setState({
        animal: this.state.animal.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedAnimal: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available fish, your score is increased and cards reordered
    } else {
      this.setState(
        {
          animal: this.state.animal.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedAnimal: this.state.clickedAnimal.concat(
            currentAnimal
          ),
          score: this.state.score + 1
        },
//if you get all 12 animals correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              animal: this.state.animal.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedAnimal: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div> HERE!
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.animal.map(animal => (
            <FriendCard
              imageClick={this.imageClick}
              id={animal.id}
              key={animal.id}
              image={animal.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;