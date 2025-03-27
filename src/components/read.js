import { useParams } from "react-router";
import { useOrigins } from "../OriginsContext";
import { Link } from "react-router";

function Read(){
    const { name } = useParams();
    const {origins, setOrigins} = useOrigins();

    const origin = origins.find(item => item.name == name)

    function OptionAndSkills({increase_options}){
        return (
          <ul>{
            increase_options.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }</ul>
        );
      }
    
    function BonusSkills({bonus_skills}){
        return (
            <ul>
                <li>Strength: <OptionAndSkills increase_options={bonus_skills.strength} /></li>
                <li>Smarts: <OptionAndSkills increase_options={bonus_skills.smarts} /></li>
                <li>Speed: <OptionAndSkills increase_options={bonus_skills.speed} /></li>
                <li>Social: <OptionAndSkills increase_options={bonus_skills.social} /></li>
            </ul>
        );
    }

    return(
        <div>
            <h3>Name: {origin.name}</h3>
            <p><em>Starting Health:</em> {origin.health_start}</p>
            <p><em>Increase Option:</em></p>
            <OptionAndSkills increase_options={origin.increase_option}/>
            <p><em>Bonus Skills:</em></p>
            <BonusSkills bonus_skills={origin.bonus_skills} />
            <p><em>Languages:</em> {origin.languages}</p>
            <p><em>Origin Benefit:</em></p>
            <p>{origin.origin_benefit}</p>
            <br />
            <Link to={`/edit/${origin.name}`}><button>Edit</button></Link><br />
            <Link to={`/`}><button>Back</button></Link>
        </div>
    );
}

export default Read;