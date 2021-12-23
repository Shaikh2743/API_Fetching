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
			audio : "",
			isPlaying : false,
		};
	}


	search = async (event) => {
		console.log(event.target.value);
		await this.setState({
			SearchData: event.target.value
		})
		console.log(this.state.SearchData)
	}

	//  audio = () =>{
	// 	 if(this.state.isPlaying) {
	// 		 this.state.audio.pause()
	// 	 }
	// 	 else {
	// 		 this.state.audio.play()
	// 	 }
	// 	this.setState({
	// 		isPlaying: !isPlaying 
	// 	});
	// };
			//  console.log(a)
		//  new Audio(a).play();
		//  new Audio(a).pause();
		// console.log("audio");

	
	



	// setData = (e) => {
	// 	e.preventDefault();
	// 	this.setState({
	// 		myurl:"https://api.dictionaryapi.dev/api/v2/entries/en/"+this.state.SearchData,
	// 	})
	// 	console.log(this.state.myurl)
	// 	this.set();
	// }
	// ComponentDidMount is used to
	// execute the code
	
		//if(this.ud!==""){
		//console.log(ud);

	add = (a) =>{
		new Audio(a).play();
	}

		setData=(e)=> {
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

		const { /* DataisLoaded, */ items } = this.state;
		// if (!DataisLoaded) return <div>
		// 	<h1> Please wait some time data is loading.... </h1> </div>;

		return (
			<div className="App">
				<h2> Dictionary  </h2>
				<form onSubmit={this.setData}>
					<span><input type="search" placeholder="search for word" onChange={this.search}></input></span>
					<span className="search" onClick={this.setData}><img src={Logo}></img></span>
				</form>
				 {
					items.map((item, i) => (
						
						<ol key={i} >
								{/* <li>{ item.DataisLoaded ? "data" :"no-data to show"} ,</li> */}
								
							
								<li><br/><button onClick={/* this.audio(item.phonetics[0].audio) */
							() => this.add(item.phonetics[0].audio)
							/* () => { new Audio(item.phonetics[0].audio).play()	 } */}>
								<img className="speaker" src={Speaker}></img></button> <h1>{item.word} </h1></li>
							{/* <li>audio :{item.phonetics[0].audio} <br/></li> */}
							<li>phonetic:<br/> {item.phonetic} </li>
							<li>text :<br/> {item.phonetics[0].text}</li>
							<li>partOfSpeech :<br/> {item.meanings[0].partOfSpeech} </li>
							<li>definition :<br/>{item.meanings[0].definitions[0].definition}</li>
							<li>example :<br/>{item.meanings[0].definitions[0].example}</li>
							<li>similar :<br/>{item.meanings[0].definitions[0].synonyms.map((i) => {
								 return <span className="syno">{i},</span>; })}</li>																																																	
						</ol>
					))
				}


			</div>
		);
	}
}

export default App;
