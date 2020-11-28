const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id=";
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name=";

const Paleo = props => {
  const [dino, setDino] = useState("none yet");
  const [name, setName] = useState("none yet");
  const [entry, setEntry] = useState("");
  const [nameRep, setNameRep] = useState("none yet");
  var wins = 0;

  const handleClick = () => {
    setDino("dinosaur");
  };

  const getDino = () => {
    var randomDino = Math.floor(100 + Math.random() * (600 - 100));
    axios.get(DINO_API_URL + randomDino + "&show=attr").then(newDino => {
      console.log(newDino.data.records[0].nam);
      setDino("you discovered the " + newDino.data.records[0].nam);
    });
  };

  const handleSubmit = event => {
    var dino = "";
    var eating_habits = "";
    var playerStatus = 404;
    var pro = "";
    axios.get(name).then(newName => {
      console.log(newName.data);
      console.log(newName.data.data.stats.all.overall.wins);
      wins = newName.data.data.stats.all.overall.wins;
      pro = newName.data.data.account.name;
      playerStatus = newName.status;
    });
    setTimeout(function() {
      console.log(playerStatus);
      if (playerStatus === 200) {
        axios
          .get(DINO_API_URL + wins + "&show=class,ecospace,ttaph,etbasis,attr")
          .then(newerDino => {
            console.log(wins);
            dino = newerDino.data.records[0].nam;
            eating_habits = newerDino.data.records[0].jdt;
            if (eating_habits === undefined) {
              setNameRep(
                pro +
                  " has won " +
                  wins +
                  " games! They win so much, you could call them a " +
                  dino +
                  "! We don't know that dinosaur's eating habits!"
              );
            } else {
              setNameRep(
                pro +
                  " has won " +
                  wins +
                  " games! They win so much, you could call them a " +
                  dino +
                  "! A real " +
                  eating_habits +
                  "!"
              );
            }
          });
      } else {
        setNameRep(
          "That player isn't in our records! They could be an invisible dinosaur!"
        );
      }
    }, 2000);
    event.preventDefault();
  };

  const handleChange = e => {
    var newName = e.target.value;
    console.log(newName);
    setName(FORTNITE_API_URL + e.target.value);
    setEntry(e.target.value);
  };

  useEffect(() => {
    console.log("mounted paleo");
  });
};
