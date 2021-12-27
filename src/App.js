import React from "react";
import './App.css';
import Logo from './698956.png';
import Speaker from './speaker.jpg';
class App extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			SearchData: '',
			DataisLoaded: false,
			a: [],
			audio: "",
			isPlaying: false,
		};
	}

	speech = (meaning) => {
		return (
			<ul>
				<li >	 Part Of Speech
					<ul>
						<li>
							{meaning.partOfSpeech}
							<ul>
								<li>  Example
									{meaning.definitions.map((definition) => {
										return (
											<ul>
												<li>
													{definition.definition}

													{definition.example}

													{definition.synonyms}
												</li>
											</ul>
										)
									})}</li></ul>
						</li>
					</ul>
				</li>
			</ul>

		)
	}


	search = async (event) => {
		console.log(event.target.value);
		await this.setState({
			SearchData: event.target.value
		})
		console.log(this.state.SearchData)
	}



	add = (a) => {
		new Audio(a).play();
	}

	setData = (e) => {
		e.preventDefault();


		fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.state.SearchData}`)
			.then((res) => res.json())
			.then((json) => {

				console.log(json)
				this.setState({
					items: json,
					DataisLoaded: true
				});

			})

	}


	render() {

		console.log(this.state)

		const { items } = this.state;


		return (
			<div className="App">
				<h2> Dictionary  </h2>
				<form onSubmit={this.setData}>
					<span><input type="search" placehulder="search for word" onChange={this.search}></input></span>
					<span className="search" onClick={this.setData}><img src={Logo}></img></span>
				</form>
				{
					items.map((item, i) => (

						<ul key={i} >
							{/* <li> error  {Object.values(item[1])}</li> */}

							<button onClick={
								() => this.add(item.phonetics[0].audio)}>
								<img className="speaker" src={Speaker}></img></button> <h1>{item.word} </h1>
							{/* <li>audio :{item.phonetics[0].audio} <br/></li> */}


							<li>Phonetic:</li>
							<ul>	<li> {item.phonetic} </li></ul>


							<li>Text :</li>
							<ul><li> {item.phonetics[0].text}</li></ul>

							<li> Meaning
								{

									item.meanings.map((meaning) => {
										return (

											this.speech(meaning)

										)
									})
								}
							</li>
							{/* <ul  className="synonms">synonyms :<br /><li>
							{item.meanings[0].definitions[0].synonyms.map((i) => {
								return <div className="syno">{i},</div>;
							})}</li>
							</ul> */}

							<li className="synonms">Synonyms :
								<ul>
									<li>
										{item.meanings[0].definitions[0].synonyms.map((i) => {
											return <li className="syno">{i}</li>;
										})}
									</li>
								</ul>
							</li>
						</ul>
					))
				}
			</div>
		);
	}
}

export default App;
