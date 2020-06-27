import React, { Component } from "react";
import "./App.css";
import Jumbotron from "./components/Jumbotron/";
import Cards from "./components/Cards/";
import { Container, Row, Col } from "./components/Grid/index";
import images from "./images.json";
export default class App extends Component {
  state = {
    userScore: 0,
    images,
    clickImages: [],
    message: "",
  };

  handleSelectedItem = (id) => {
    const clickedImages = this.state.clickImages;
    if (clickedImages.includes(id)) {
      return this.setState({
        clickImages: [],
        userScore: 0,
        message: "Game Over! You lost. Click to play again!",
      });
    } else {
      clickedImages.push(id);
    }
    if (clickedImages.length === 12) {
      return this.setState({
        userScore: 12,
        message: "You Won! Click to play again!",
        clickImages: [],
      });
    }

    this.setState({
      images,
      clickImages: this.state.clickImages,
      userScore: this.state.clickImages.length,
      message: "You guessed Correctly!",
    });

    for (let i = images.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }
  };
  render() {
    return (
      <Container>
        <Jumbotron
          title="NFL Clicky Game"
          userScore={this.state.userScore}
          message={this.state.message}
        />
        <Row>
          {this.state.images.map((images) => {
            return (
              <Col size="md-3 sm-6">
                <Cards
                  key={images.id}
                  handleSelectedItem={this.handleSelectedItem}
                  id={images.id}
                  image={images.img}
                  clicked={images.clicked}
                ></Cards>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}
