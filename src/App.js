import React from "react";
import './App.css';
class App extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			SearchData: '',
			myurl: '',
			DataisLoaded: false,
			a: [],
		};
	}


	search = async (event) => {
		console.log(event.target.value);
		await this.setState({
			SearchData: event.target.value
		})
		console.log(this.state.SearchData)
		



	}
	setData = (e) => {
		e.preventDefault();
		this.setState({
			myurl: `https://api.dictionaryapi.dev/api/v2/entries/en/${this.state.SearchData}`,
		})
	}
	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		//if(this.ud!==""){
		//console.log(ud);

		console.log(this.state.myurl, "hello")
		fetch(this.state.myurl)
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
				this.setState({
					items: json,
					DataisLoaded: true
				});
			})
		//	}
	}

	componentDidUpdate() {
		fetch(this.state.myurl)
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

		const { DataisLoaded, items } = this.state;
		// if (!DataisLoaded) return <div>
		// 	<h1> Please wait some time data is loading.... </h1> </div>;

		return (
			<div className="App">
				<form onSubmit={this.setData}>
					<input type="search" onChange={this.search}></input>
				</form>
				<h2> Enter Data to search  </h2> {
					items./*filter((el) => {
					

						if (this.state.SearchData === "") {
							console.log("hi123")
							return null;
						} else if (el.word.startsWith(this.state.SearchData)) {
							console.log("hi")
							return el;
						}
						
					}).*/map((item, i) => (
						
						<ul key={i} >
							word: {item.word} ,
							phonetic: {item.phonetic} ,
							text : {item.phonetics[0].text},
							audio : {item.phonetics[0].audio},
							partOfSpeech : {item.meanings[0].partOfSpeech} ,
							definition :{item.meanings[0].definitions[0].definition},
							example :{item.meanings[0].definitions[0].example},
							synonyms :{item.meanings[0].definitions[0].synonyms.map((i) => { return <span className="syno">{i},</span>; })}

						</ul>
					))
				}


			</div>
		);
	}
}

export default App;
